# Test Coverage Analysis — Contrarian Dashboard

## Current State

**Test coverage: 0%** — The codebase has zero test files, no testing framework, no CI/CD pipeline, and no `package.json`. All logic lives inline in monolithic HTML files (`index.html` at 3,310 lines, `supertrend.html` at 521 lines).

---

## Testable Logic Inventory

### 1. Signal Scoring Engine (CRITICAL — `index.html:1045-1056`)

The heart of the application: 10 contrarian buy signals, each with `score()`, `reading()`, `color()`, and `interpret()` functions. These are **pure functions** that read from `pulseState` and return deterministic results.

| Signal | Thresholds | Score Range | Edge Cases to Test |
|--------|-----------|-------------|-------------------|
| CNN Fear & Greed | ≤14 → 1, ≤25 → 0.5 | 0–1 | null, boundary values 14/15, 25/26 |
| VIX | ≥45 → 1, ≥35 → 0.75, ≥28 → 0.25 | 0–1 | null, boundaries 28/35/45 |
| Crypto Fear & Greed | ≤10 → 1, ≤20 → 0.75, ≤30 → 0.25 | 0–1 | null, boundaries 10/20/30 |
| AAII Bear-Bull | ≥55 → 1, ≥45 → 0.75, ≥38 → 0.25 | 0–1 | null, boundaries 38/45/55 |
| Put/Call Ratio | ≥1.3 → 1, ≥1.1 → 0.5 | 0–1 | null, boundaries 1.1/1.3 |
| SPY Volume Spike | ≥3x → 1, ≥2x → 0.75, ≥1.5x → 0.25 | 0–1 | null vol, null avg, div-by-zero |
| SPY Drawdown | ≥20% → 1, ≥10% → 0.75, ≥7% → 0.25 | 0–1 | null, negative drawdown, 0 |
| Breadth (% above 200-DMA) | ≤30 → 1, ≤40 → 0.75, ≤50 → 0.25 | 0–1 | null, boundaries 30/40/50 |
| NAAIM Exposure | ≤25 → 1, ≤40 → 0.75, ≤60 → 0.25 | 0–1 | null, boundaries 25/40/60 |
| HY Credit Spreads | ≥600 → 1, ≥500 → 0.75, ≥400 → 0.25 | 0–1 | null, boundaries 400/500/600 |

**Why this is priority #1:** A scoring bug means the dashboard could show "STRONG BUY" when it shouldn't, or miss a real signal. Users make financial decisions based on this score.

### 2. Score Aggregation (`index.html:1133-1156`)

`recalcScore()` sums individual signal scores and maps totals to labels:
- `≥7` → "STRONG CONTRARIAN BUY"
- `≥5` → "APPROACHING BUY ZONE"
- `≥3` → "EARLY SIGNALS — WAIT"
- `<3` → "NO BUY SIGNAL"

**Tests needed:**
- Total of exactly 7.0, 5.0, 3.0 (boundary)
- All signals null → should be 0
- Mix of partial scores (0.25, 0.5, 0.75, 1.0) → correct sum
- Active signal count accuracy

### 3. Helper / Utility Functions

| Function | Location | Purpose | Testability |
|----------|----------|---------|-------------|
| `fearColor(v)` | line 2038 | Maps 0-100 fear index to hex color | Pure function |
| `vixColor(v)` | line 2039 | Maps VIX level to hex color | Pure function |
| `toneColor(t)` | line 2389 | Maps headline tone string to hex color | Pure function |
| `fmtChg(v)` | line 1082 | Formats price change as "+X.XX%" | Pure function |
| `chgCol(v)` | line 1083 | Returns green/red/gray for pos/neg/zero | Pure function |
| `spark(data, color, w, h)` | line 1085 | Generates SVG sparkline from data array | Pure (returns string) |

### 4. Yahoo Finance Response Parser (`index.html:1240-1276`)

`yahooChart()` parses complex nested JSON responses. Test cases:
- Valid response → extracts price, volume, date, sparkline data
- Missing `chart.result` → returns `{ok: false}`
- All `null` closes → handles gracefully
- `volumes` array absent → `avg20Vol` handles null
- Fewer than 20 data points → average calculation still works
- Trailing nulls in closes → finds last valid index correctly

### 5. Supertrend Backtest Statistics (`supertrend.html:388-406`)

`stats(trades)` computes win rate, profit factor, avg win/loss, long/short breakdown, and exit-type counts. Pure function operating on an array of trade objects.

**Tests needed:**
- Normal trade array → correct win rate, profit factor
- All wins / all losses → edge cases
- Empty array → no division by zero
- Single trade → correct stats
- Mixed long/short → correct per-direction win rates

### 6. Data Transformation Logic

**SPY % from ATH calculation** (`index.html:1308`):
```js
pulseState.spyPctFromATH = ((SPY_ATH - spyData.price) / SPY_ATH) * 100;
```
- Price exactly at ATH → 0%
- Price at 0 → 100%
- Hardcoded ATH (698) — should this be dynamic?

**HY Spreads conversion** (`index.html:1460`):
```js
pulseState.hySpreads = parseFloat(hyD.observations[0].value) * 100; // bps
```
- Verify bps conversion is correct

**Volume ratio** (`index.html:1265`):
```js
avg20Vol: validVols.length >= 20 ? validVols.slice(-20).reduce((a,b)=>a+b,0)/20 : ...
```
- Exactly 20 volumes, fewer than 20, empty array

---

## Proposed Test Priority

### Tier 1 — High Impact, Easy to Test (start here)
1. **Signal scoring functions** — Each signal's `score()` with boundary values and nulls
2. **Color mapping helpers** — `fearColor`, `vixColor`, `toneColor`
3. **Formatting helpers** — `fmtChg`, `chgCol`
4. **Supertrend `stats()`** — Pure computation on trade arrays

### Tier 2 — Medium Impact, Requires Extraction
5. **Score aggregation** — `recalcScore()` logic (extract DOM manipulation)
6. **Yahoo response parsing** — `yahooChart()` return value validation
7. **Sparkline SVG generation** — `spark()` produces valid SVG
8. **ATH/drawdown calculations** — Percentage math correctness

### Tier 3 — Lower Priority, Integration-Level
9. **API fallback/proxy logic** — Proxy rotation in `yahooChart()`
10. **Manual input binding** — `pulseState` updates from input fields
11. **CNN F&G proxy fallback chain** — Multiple proxy attempts
12. **StockTwits sentiment parsing** — Bull/bear percentage calculation

---

## Recommended Architecture Changes

### Step 1: Extract logic into modules

Create a `src/` directory with pure-logic modules:

```
src/
  signals.js        — Signal definitions and scoring functions
  helpers.js        — fearColor, vixColor, fmtChg, spark, etc.
  parsers.js        — API response parsers (Yahoo, FRED, CNN, etc.)
  score.js          — Score aggregation and label logic
  backtest-stats.js — Supertrend trade statistics
```

### Step 2: Set up testing

```
package.json        — with jest, test scripts
jest.config.js      — ES module support
tests/
  signals.test.js
  helpers.test.js
  parsers.test.js
  score.test.js
  backtest-stats.test.js
```

### Step 3: Keep HTML files working

The HTML files can import from `src/` modules via `<script type="module">`, or the extracted modules can be bundled back. For the initial phase, the test files can import the modules directly while the HTML continues to work as-is with inline code.

---

## Specific Bugs / Risks Found During Analysis

1. **Hardcoded SPY ATH = 698** (lines 1229, 1494) — If SPY exceeds 698, `spyPctFromATH` goes negative. This should be dynamically fetched or at minimum easily configurable.

2. **Division by zero risk** in volume ratio signal (`line 1051`) — If `spy20dAvgVol` is 0, `spyVol/spy20dAvgVol` = Infinity. The `score()` would return 1 (capitulation signal) incorrectly.

3. **CNN F&G null check inconsistency** (`line 1108`) — The ternary chain `pulseState.cnnFGRating||pulseState.cnnFG!==null?(...)` has operator precedence issues. The `||` binds before `?:`, so if `cnnFGRating` is truthy, the entire ternary is skipped.

4. **`fearColor` called with null** — If `pulseState.cryptoFG` is null, `fearColor(null)` evaluates `null<=10` → true, returning `#ef4444` (extreme fear red) even though there's no data. The card rendering guards with a ternary, but the guard could be bypassed if the conditional changes.

5. **Duplicate file** — `sentiment-crisis-dashboard (3).html` is an exact copy of `index.html` and should be removed.

---

## Quick Wins

| Action | Effort | Impact |
|--------|--------|--------|
| Add `package.json` + Jest | 10 min | Enables all testing |
| Extract + test `fearColor`/`vixColor` | 15 min | Catches color mapping bugs |
| Test all 10 signal `score()` functions | 1 hr | Protects core buy/sell logic |
| Test `stats()` in supertrend | 30 min | Validates backtest accuracy |
| Fix hardcoded ATH | 10 min | Prevents negative drawdown |
| Remove duplicate HTML file | 1 min | Reduces confusion |
