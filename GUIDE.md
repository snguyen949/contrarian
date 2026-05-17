# Contrarian Toolkit — Complete Beginner's Guide

## What Is This Dashboard?

This dashboard is a **contrarian market timing tool**. The core idea is simple: the best time to buy stocks is when everyone else is terrified and selling. When panic peaks, prices are cheapest and the risk of permanent loss is lowest. The dashboard collects every major fear and stress signal in one place, scores them, and tells you how close the market is to a genuine bottom.

It does NOT predict the future. It measures how much fear and structural stress exist right now, and compares that to historical bottoms. The more signals firing simultaneously, the higher the confidence that a durable low is forming.

---

## The Core Concept: Why Contrarian?

Most people buy when things feel safe and sell when things feel scary. Contrarian investing does the opposite — deliberately buying into panic. Why does this work?

- **Panic = Forced Selling**: When fear peaks, even investors who don't want to sell are forced to (margin calls, redemptions, risk limits). This creates artificial overshoots below fair value.
- **Fear = Low Prices**: The more people hate an asset, the cheaper it is. Buying cheap is the only edge in investing.
- **Recovery is Asymmetric**: Markets that fall 20% need only a 25% gain to fully recover. Buying the dip captures that entire move.

The hard part is that bottoms feel terrible. You must act when the news is worst, not best.

---

## Preferred Order: How to Read the Dashboard

Work top to bottom in this order. Each layer adds context to the one before it.

```
1. Score + Verdict (top of page)
2. Cluster Status (4 badges below the score)
3. Bottom State Machine
4. Signal Breakdown (the 15 individual signals)
5. M2 Liquidity Section (is there fuel for a recovery?)
6. Triple Confluence Detector (which markets confirming?)
7. FRED Economic Panel (macro backdrop)
8. VIX / Fear Panel (panic temperature)
9. Historical Pullback Table (what does this look like vs. history?)
10. Position Sizer (how much to buy, and when)
```

---

## Section 1 — The Contrarian Score (0–10)

**Location**: Top of page, large number in the center.

This is the single most important number on the dashboard. It summarizes every signal into one score.

| Score | Verdict | What It Means |
|-------|---------|---------------|
| 0 – 3.9 | **WAIT** | No signal. Market is complacent or recovering. Do nothing. |
| 4.0 – 6.4 | **WATCH** | Fear building. Start monitoring closely. Not yet actionable. |
| 6.5 – 8.4 | **BUY** | Multiple clusters firing. Historical setup forming. Consider entry. |
| 8.5 – 10 | **STRONG BUY** | Extreme across all clusters. Rare. Historically best risk/reward. |

### How the Score Is Calculated

The score is not a simple average. It uses a **weighted cluster system** plus adjustments:

```
Final Score = (weighted cluster signals × M2 multiplier) + AI boost + triple confluence bonus + velocity boost
```

You don't need to understand the math — just know that:
- **Higher score = more signals firing simultaneously**
- The score rewards signals that rarely fire together (that's when the edge is greatest)
- The M2 multiplier can amplify or reduce the score based on whether liquidity supports a recovery

### The 30-Day Sparkline

Below the score is a small chart showing the score over the past 30 days. This shows whether:
- The score is **rising** (fear building, approaching opportunity)
- The score is **falling** (fear fading, opportunity passing)
- The score **spiked then rolled over** (historically the best entry point is right at the rollover)

---

## Section 2 — The 4 Clusters

**Location**: Just below the main score, four colored letter badges (A, B, C, D).

Think of these as four separate judges, each watching a different part of the market. For a high-confidence buy signal, you need most of them to agree.

### Cluster A — Fear Level (Red badge) — Weight: 20%

**What it watches**: How scared are retail investors right now?

| Signal | What It Measures | High Reading Means |
|--------|-----------------|-------------------|
| CNN Fear & Greed (0–100) | Broad market sentiment index | ≤14 = Extreme panic, historically best buying zone |
| Crypto Fear & Greed (0–100) | Crypto sentiment (leads stock sentiment) | ≤10 = Capitulation across risk assets |
| AAII Bear % | % of individual investors who expect market to fall | ≥55% = Extreme pessimism |
| StockTwits Bear % | Social media bear sentiment | ≥65% = Retail panicking |

**Why it matters**: When retail investors are maximally bearish, they have already sold. There are no more sellers — only future buyers.

**Cluster fires when**: Any single signal in this group is above its threshold.

---

### Cluster B — Vol Structure (Purple badge) — Weight: 35% ⭐ Most Important

**What it watches**: Is the options market showing signs of panic peak?

| Signal | What It Measures | High Reading Means |
|--------|-----------------|-------------------|
| VIX / VIX3M Ratio ⚡ | Short-term vs medium-term fear ratio | >1.05 = BACKWARDATION — rare, extreme panic |
| VIX Level | Market's 30-day fear gauge | ≥45 = Full capitulation panic |
| SKEW Index | How much investors are paying for crash protection | <115 = Crash insurance cheap = fear exhausting |

**The most important signal on the entire dashboard**: VIX/VIX3M Backwardation (⚡).

**What is backwardation?** Normally, investors fear the future more than today (they pay more for options expiring months from now). When VIX > VIX3M, this relationship inverts — people are so scared of TODAY that they're paying more for near-term protection than long-term. This has only happened at true market bottoms: 2008 GFC, 2011 EU crisis, 2018 Volmageddon, March 2020 COVID.

**Cluster fires when**: Any signal above threshold. This cluster has the highest weight because vol structure is the most objective measure of panic peak.

---

### Cluster C — Flow & Positioning (Cyan badge) — Weight: 25%

**What it watches**: What are the smart money and institutions actually doing?

| Signal | What It Measures | High Reading Means |
|--------|-----------------|-------------------|
| SPY Volume vs 20-day Average | Abnormal volume = forced or panic selling | ≥2.0× average = Capitulation selling |
| Put/Call Ratio (manual) | Options bets on down vs up | ≥1.3 = Institutions heavily hedging |
| NAAIM Exposure Index | % of active fund managers invested in stocks | ≤25 = Funds almost fully de-risked |
| Money Market Assets ($T) | Cash sitting on sidelines | ≥$6.5T = Enormous dry powder waiting to re-enter |

**Why it matters**: If professional fund managers have already sold and cash is sitting on the sidelines, there is a massive wall of money ready to flow back into markets the moment confidence returns. That inflow drives the recovery.

---

### Cluster D — Credit & Macro (Amber badge) — Weight: 20%

**What it watches**: Is there systemic stress in the financial system?

| Signal | What It Measures | High Reading Means |
|--------|-----------------|-------------------|
| NFCI (Chicago Fed) | Overall financial conditions tightness | ≥0.5 = Credit stress, Fed will be forced to act |
| HY Credit Spreads (bps) | Risk premium on junk bonds | ≥500 bps = Genuine credit fear |
| IG Credit Spreads (bps) | Risk premium on investment-grade bonds | ≥150 bps = Stress spreading to quality credit |
| Yield Curve (10Y–2Y) | Long vs short rates | ≤−0.5% = Inversion = recession priced in |

**Why it matters**: Credit markets are smarter than stock markets. When credit spreads widen sharply, it means bond investors (who have more information than retail) are pricing in stress. When they widen AND reverse, the equity bottom is usually confirmed.

---

### The Buy Gate

For a **STRONG BUY** verdict, all three of the following must be true simultaneously:
- **Cluster A** (Fear) must be firing (fear is real and widespread)
- **Cluster B** (Vol Structure) must be firing (panic has peaked)
- **Cluster C** (Flow) OR **Cluster D** (Credit) must be firing (structural confirmation)

This gate prevents false positives — you can have fear without panic peak, or panic peak without structural stress. All three together is historically reliable.

---

## Section 3 — The Bottom State Machine

**Location**: Below the cluster badges, shows one of four states.

This tracker follows the progression from "maybe a bottom" to "confirmed bottom."

```
SCANNING → POTENTIAL → CONFIRMING → ✅ CONFIRMED
```

| State | What It Means | What to Do |
|-------|---------------|------------|
| **SCANNING** | Normal monitoring, no elevated signals | Nothing yet |
| **POTENTIAL** | 1–2 clusters firing, fear elevated | Start watching, no action |
| **CONFIRMING** | 3+ clusters firing, buy gate partially met | Small initial position possible |
| **✅ CONFIRMED** | All conditions met, buy gate satisfied | Full position deployment |

**Key insight**: Many investors wait for "CONFIRMED" before buying. By then, the price has often already recovered 5–10%. The Position Sizer (see below) accounts for this by scaling in — putting on partial positions at CONFIRMING and adding at CONFIRMED.

---

## Section 4 — Signal Breakdown (The 15 Signals)

**Location**: Table below the cluster badges showing all signals with color bars.

This is the detailed view of exactly what's firing and what isn't. Each signal shows:
- Current reading (live fetched data)
- Score contribution (0 = not firing, 0.25/0.5/0.75/1.0)
- Color bar (red = strong signal, gray = quiet)

**How to read it**:
- Signals in **red** are fully firing (extreme readings)
- Signals in **amber/yellow** are partially firing (approaching thresholds)
- Signals in **gray** are quiet (no signal)

You want to see multiple red signals across different clusters, especially in Clusters A and B together.

**Note on manual inputs**: Two signals require you to enter data manually:
- **CNN Fear & Greed**: Check CNN's Fear & Greed index and type the current number into the input field
- **Put/Call Ratio**: Check the daily P/C ratio and enter it

All other signals are fetched automatically when you click **Fetch**.

---

## Section 5 — M2 Liquidity Section

**Location**: In the FRED panel, three cards showing M2 data.

Think of M2 as the economy's fuel tank. The contrarian signal tells you when fear is extreme. M2 tells you whether the fuel exists to power a recovery.

### Why M2 Matters

Every major market bottom has been accompanied by or followed by a change in M2:
- **2020 COVID**: M2 surged +25% (QE infinity) → Fastest bear market recovery ever
- **2009 GFC**: M2 accelerating → V-shape recovery once QE started
- **2022 Rate Hike Bear**: M2 contracted −3.3% → Multiple false bottoms, trapped buyers

When fear is extreme AND M2 is growing, the setup is historically exceptional. When fear is extreme BUT M2 is contracting, be very cautious — the economy lacks the fuel to recover quickly.

### The Three Cards

**Card 1: M2 Money Supply (YoY %)**

| Reading | Color | What It Means |
|---------|-------|---------------|
| > +8% | Green | STRONG TAILWIND — amplifies buy signal |
| +4% to +8% | Light green | Neutral — normal liquidity |
| 0% to +4% | Amber | HEADWIND — reduce buy confidence |
| Negative | Red | CONTRACTION — fear dips may be traps |

**Card 2: Real M2 (M2 minus CPI)**

This strips out inflation to show real purchasing power growth.
- **Positive**: Money supply growing faster than inflation = genuinely supportive
- **Negative**: Even though M2 is growing, inflation is eating it = tighter than it looks

**Card 3: M2 Multiplier (×)**

This is directly applied to your contrarian score:
- **×1.25**: M2 > +8% → Score amplified (best setup)
- **×1.00**: M2 +4–8% → Score unchanged (neutral)
- **×0.80**: M2 0–4% → Score reduced (limited fuel)
- **×0.55**: M2 negative → Score heavily discounted (false bottom risk)

**Example**: A raw score of 7.0 with M2 contracting becomes 7.0 × 0.55 = 3.85 (WAIT). Same fear conditions but no liquidity = don't buy.

### Historical M2 Context Table

Below the three cards is a table showing M2 at every major pullback since 2009. Use this to calibrate current readings against what actually happened.

---

## Section 6 — Triple Confluence Detector

**Location**: Panel showing SPY, QQQ, IWM, ES, NQ with traffic lights.

This detector asks: are multiple markets simultaneously hitting the same technical conditions that have historically marked bottoms?

### Three Conditions Checked Per Market

| Condition | What It Checks | Why It Matters |
|-----------|---------------|----------------|
| 🟢 Structural Support | Price within 3% of a known support level | Price at a level where institutional buyers historically step in |
| 🟢 RSI Oversold | Daily RSI < 35 or Weekly RSI < 40 | Momentum so stretched to downside that mean reversion is likely |
| 🟢 Volume Spike | Volume ≥ 1.5× the 20-day average | Forced or panic selling = sellers exhausting themselves |

### Reading the Traffic Lights

Each market shows three circles: Support / RSI / Volume
- 🟢🟢🟢 = **Triple** — all three conditions met simultaneously
- 🟢🟢⚪ = **Double** — two of three met
- 🟢⚪⚪ = Starting to develop, not yet actionable

### What It Means for Your Score

| Pattern | Score Bonus | Historical Implication |
|---------|-------------|----------------------|
| 1 Triple | +1.5 points | Single market capitulation |
| 2+ Triples | +2.0 points | Broad-based panic = extremely rare, extremely reliable |
| 3+ Doubles across markets | +1.25 points | Cross-market stress even without full triple |

**The key insight**: When SPY, QQQ, and IWM are ALL simultaneously oversold with volume spikes at support, it's not a single-stock problem. It's broad market panic. These setups have historically resolved with strong bounces within 5–20 trading days.

---

## Section 7 — FRED Economic Panel

**Location**: Panel labeled "Economic Conditions" or "FRED Data."

This section provides the macro backdrop — it answers: *is this a buying opportunity or the beginning of something worse?*

### Financial Conditions (NFCI)

The Chicago Fed Financial Conditions Index measures how tight or loose credit, equity, and money markets are. Think of it as a thermometer for the financial system.

- **Below 0**: Loose conditions — easy money, economic tailwind
- **0 to +0.5**: Slightly tight — watch for deterioration
- **Above +0.5**: Tight — credit stress, Fed will be forced to respond eventually
- **Above +1.0**: Very tight — systemic risk (rare, seen in 2008-level events)

**Why it matters for contrarians**: When NFCI is high and starting to turn lower, the Fed has historically been forced to ease. That pivot is often the catalyst that transforms a fear bottom into a sustained rally.

### Credit Spreads (HY and IG)

These measure how much extra interest rate ("spread") investors demand to hold corporate debt instead of risk-free Treasuries. Wide spreads = fear. Narrowing spreads = recovery.

- **HY (High Yield / Junk Bonds)**: Most sensitive to fear. ≥500 bps = genuine stress.
- **IG (Investment Grade)**: Moves less but when it widens, stress is systemic. ≥150 bps = watch closely.

### Yield Curve (10Y minus 2Y)

When long-term rates fall below short-term rates (inverted curve), the bond market is pricing in future rate cuts — which means it expects economic weakness.

- **Positive (normal)**: No recession signal
- **Inverted (negative)**: Recession risk on the horizon (typically 6–18 months lead time)
- **Re-steepening from inversion**: Often coincides with the actual recession beginning — but also when stocks bottom

---

## Section 8 — VIX / Fear Panel

**Location**: Panel showing VIX and related fear gauges.

### VIX — The Fear Gauge

VIX measures how much investors are paying for options protection over the next 30 days. Higher = more fear.

| VIX Level | Market Condition | Contrarian Interpretation |
|-----------|-----------------|--------------------------|
| < 15 | Complacency | Do NOT buy dips here — no fear premium |
| 15–25 | Normal range | Monitor, not actionable |
| 25–35 | Elevated fear | Signals starting to develop |
| 35–45 | High fear | Multiple signals likely firing |
| > 45 | Panic / Capitulation | Historical buy zone |

### VIX/VIX3M Ratio — The Most Important Signal

This compares 30-day fear (VIX) to 3-month fear (VIX3M):
- **Normal (VIX3M > VIX)**: Future feared more than today = contango = normal market
- **Backwardation (VIX > VIX3M)**: Today feared more than future = panic peaked

Backwardation above 1.05 has appeared only at the most significant bottoms in modern market history. When you see this, the dashboard gives it a full 1.0 score and the ⚡ symbol.

### SKEW Index — Crash Insurance Pricing

When investors fear a crash, they buy far out-of-the-money put options (crash insurance). High SKEW = expensive crash insurance = market nervous.

**The contrarian read**: When SKEW drops below 115, crash insurance is being surrendered. People have stopped buying protection. This often means the worst fear has already been expressed.

---

## Section 9 — Historical Pullback Table

**Location**: Near the bottom of the dashboard, a table of 14 historical events.

This table shows every major market pullback since 1987 with the exact conditions that existed at the bottom. Use it to answer the question: *"Does what I'm seeing right now look like a real bottom?"*

### Column Guide

| Column | What to Look For |
|--------|-----------------|
| **Type** | Capitulation, Mechanical, Stealth, Geopolitical, Fundamental Bear, Credit Contagion |
| **Drawdown %** | How far the market fell before bottoming |
| **VIX Peak** | How high VIX got (higher = more fear) |
| **AAII Bear %** | How bearish retail investors were |
| **Volume** | Whether capitulation selling occurred |
| **5-day return** | Immediate bounce after bottom |
| **12-month return** | Long-term reward |
| **Key Lesson** | One-line summary of what drove the bottom and recovery |

### Bottom Types — What They Mean for Timing

| Type | How Fast It Resolves | Position Sizing Approach |
|------|---------------------|------------------------|
| **Capitulation** | Days to weeks — very fast | Buy immediately at full size |
| **Mechanical** | Weeks — rule-based forced selling | Buy immediately |
| **Stealth** | Weeks to months | Scale in gradually |
| **Geopolitical** | Unpredictable — can reverse on news | Small initial, add on catalyst |
| **Fundamental Bear** | Months to years — needs narrative shift | Very small initial, patient |
| **Credit Contagion** | Months — needs systemic intervention | WAIT for Fed/government action first |

**Key insight**: The 2022 rate hike bear market produced multiple false bottoms because it was a Fundamental Bear — the Fed was still raising rates, M2 was contracting. Each time fear spiked and the contrarian score briefly rose, there was no structural resolution. Knowing the bottom type saves you from averaging down into an extended decline.

---

## Section 10 — Conviction Meter & Entry Parameters

**Location**: A panel showing entry, stop, targets, and risk/reward ratio.

Once the score is high enough to act, this section tells you exactly where to buy, where to put your stop-loss, and what your targets are.

| Parameter | What It Is |
|-----------|-----------|
| **Entry** | Current SPY price (or suggested entry level) |
| **Stop** | Where you exit if wrong (at nearest structural support × 0.97) |
| **Target 1** | Prior ATH — first profit target |
| **Target 2** | Prior ATH + 3% — full target |
| **R:R Ratio** | (Target − Entry) ÷ (Entry − Stop) |

**The R:R rule**: Only take trades with R:R ≥ 2:1. This means for every $1 you risk, you stand to make $2 or more. Even if you're only right half the time, a 2:1 R:R makes the strategy profitable.

- **Green R:R** (≥ 2:1): Favorable — take the trade
- **Yellow R:R** (1–2:1): Marginal — only if other conviction is very high
- **Red R:R** (< 1:1): Unfavorable — skip this trade regardless of score

---

## Section 11 — Position Sizer

**Location**: Panel below the Conviction Meter with inputs for account size and risk %.

This section removes emotion from position sizing by calculating exactly how many shares or contracts to buy based on your risk tolerance.

### How to Use It

1. **Enter your account size** (e.g., $25,000)
2. **Select risk %** — what percentage of your account you're willing to lose if stopped out
   - Conservative: 1% (lose max $250 on a $25k account)
   - Standard: 2% (lose max $500)
   - Aggressive: 3% (lose max $750)
3. **The dashboard calculates**:
   - How many SPY shares to buy
   - How many MES (Micro E-mini S&P) futures contracts
   - How many QQQ shares to buy

### The Scale-In Plan

Rather than buying all at once, the sizer shows a scale-in schedule based on bottom type:

| Bottom Type | Now | On Catalyst | Day 3 Hold | Confirmed |
|------------|-----|-------------|------------|-----------|
| Capitulation | 100% | — | — | — |
| Stealth | 40% | 60% | 80% | 100% |
| Geopolitical | 30% | 50% | 70% | 100% |
| Fundamental Bear | 20% | 30% | 50–80% | 100% |
| Credit Contagion | 0% | 50% | 80% | 100% |

**Why scale in?** You rarely catch the exact bottom. Scaling in means even if you buy slightly early, you're not fully exposed at the wrong price. Each tranche adds only after the previous one proves correct.

---

## Section 12 — AI Sentiment Analysis (Groq)

**Location**: Panel labeled "AI Sentiment" or similar.

This section uses an AI language model (Llama 3.1 via Groq) to analyze current market headlines and classify them as Bearish, Neutral, or Bullish with a confidence score.

**How to read it**:
- **Bearish with high confidence**: Headlines are doom-and-gloom. This is contrarian positive — maximum negative sentiment often precedes recoveries.
- **Sentiment Shift badge**: When sentiment crosses from Bearish to Neutral or Neutral to Bullish, it flags this as a potential inflection. This can be an additional confirmation of a turning point.

This is one input among many — it shouldn't override the score but can add weight to a decision.

---

## Putting It All Together: A Step-by-Step Decision Framework

### Step 1: Check the Score and Verdict

Open the dashboard, click **Fetch**, and wait for data to load (20–40 seconds).

- **Score < 4.0 (WAIT)**: Close the tab and come back in a week. There's nothing to act on.
- **Score 4.0–6.4 (WATCH)**: Set an alert. Check daily. Don't act yet.
- **Score ≥ 6.5 (BUY/STRONG BUY)**: Proceed to Step 2.

### Step 2: Check the Cluster Badges

Count how many clusters are lit (colored badge vs. gray):
- **2 clusters**: Developing signal. Small watch position only.
- **3 clusters**: Strong signal. Position sizing warrants action.
- **4 clusters**: Exceptional signal. Historical rarity. Act with confidence.

Confirm the Buy Gate: A + B + (C or D) all firing = maximum confidence.

### Step 3: Check M2 Multiplier

Look at the M2 Multiplier card:
- **×1.0 or higher**: Proceed normally.
- **×0.80**: Reduce your intended position size by 25%.
- **×0.55**: Extreme caution. Even if score is high, M2 contraction means false bottom risk. Consider waiting or using very small size.

### Step 4: Check Triple Confluence

Look at the traffic light grid:
- **Any triple (🟢🟢🟢)**: Adds +1.5 to score and confirms structural support
- **Multiple triples**: Rare, extremely high confidence
- **All gray**: Score may be driven by sentiment alone without technical confirmation. Reduce size.

### Step 5: Look Up the Bottom Type in the Historical Table

Find the current setup in the historical table. What type does it most closely resemble?
- **Capitulation or Mechanical**: Buy now, full scale.
- **Geopolitical**: Wait for a specific catalyst to de-escalate.
- **Fundamental Bear or Credit Contagion**: Wait for systemic intervention signal. Do not fight the trend.

### Step 6: Use the Position Sizer

Enter your account size and risk %, read the sizer output:
- Check R:R ratio is ≥ 2:1
- Use the scale-in schedule for your bottom type
- Never exceed the sizer's suggested shares/contracts

### Step 7: Set Your Stops Before Entering

The sizer shows your stop price. This is non-negotiable. Enter it as a stop-loss order the moment you buy. If the market closes below structural support, the thesis is broken and you exit — no exceptions.

---

## Common Mistakes to Avoid

**1. Acting on fear alone (Cluster A) without vol confirmation (Cluster B)**
People have felt fearful many times without a real bottom forming. You need both — fear AND the structural panic peak that vol backwardation represents.

**2. Ignoring M2 when it's negative**
The 2022 rate hike period had extreme fear multiple times. Every time, the contrarian score briefly rose. But M2 was contracting, and each "bottom" broke to new lows. The multiplier exists specifically to discount these situations.

**3. Going all-in at CONFIRMING state**
Wait for the scale-in schedule. The confirmed state often doesn't come for days after the initial signal. Patience pays.

**4. Skipping the stop-loss**
This is the most dangerous mistake. If you're wrong, you must exit. The entire position sizer assumes you take the stop. Without it, a "buy the dip" trade can become a devastating loss.

**5. Using this for individual stocks**
This dashboard is built for SPY (S&P 500 index) and QQQ (Nasdaq). Individual stocks can go to zero even in a broad market recovery. Stick to the indices for which this was calibrated.

---

## Quick Reference: Signal Thresholds

| Signal | Strong Buy Zone | Watch Zone | No Signal |
|--------|----------------|------------|-----------|
| CNN Fear & Greed | ≤ 14 | 15–40 | > 40 |
| Crypto Fear & Greed | ≤ 10 | 11–30 | > 30 |
| AAII Bear % | ≥ 55% | 40–54% | < 38% |
| VIX | ≥ 45 | 25–35 | < 20 |
| VIX/VIX3M Ratio ⚡ | > 1.05 | 0.95–1.0 | < 0.95 |
| SKEW Index | < 115 | 115–125 | > 130 |
| SPY Volume Spike | ≥ 3× avg | 1.5–2× | < 1.3× |
| NAAIM Exposure | ≤ 25% | 26–50% | > 60% |
| Money Market Assets | ≥ $6.5T | $5.5–6.0T | < $5.5T |
| HY Spreads | ≥ 500 bps | 350–499 | < 350 |
| NFCI | ≥ 0.5 | 0–0.5 | < 0 |
| M2 YoY | ≥ +8% | +4–8% | < 0% |
| **Overall Score** | **≥ 6.5** | **4.0–6.4** | **< 4.0** |

---

## Glossary

**Backwardation**: When near-term fear (VIX) exceeds long-term fear (VIX3M). Rare. Historically marks bottoms.

**Basis Points (bps)**: Unit of measure for interest rates and spreads. 100 bps = 1%.

**Capitulation**: The point when panic sellers exhaust themselves and volume spikes to extreme levels. Often the final low before recovery.

**Cluster**: A group of related signals. The dashboard uses 4 clusters — Fear, Vol Structure, Flow, and Credit/Macro.

**Contrarian**: An investor who acts against prevailing sentiment — buying when others are selling in panic.

**Credit Spread**: The extra interest rate premium on corporate bonds vs. risk-free government bonds. Widens when investors fear defaults.

**Dry Powder**: Cash sitting on the sidelines (e.g., in money market funds) waiting to be deployed. Large dry powder = potential fuel for recovery.

**FRED**: Federal Reserve Economic Data — the US Federal Reserve's public database of economic statistics.

**M2**: A measure of the money supply including cash, checking deposits, savings, and money market funds. Proxy for liquidity in the economy.

**NFCI**: National Financial Conditions Index. Measures the tightness of financial conditions across money markets, debt markets, and equity markets.

**Put/Call Ratio**: Ratio of put options (bets on decline) to call options (bets on rise). High ratio = investors heavily hedging = fear.

**R:R (Risk/Reward Ratio)**: How much you can make vs. how much you can lose. A 3:1 R:R means a potential $300 gain for every $100 risked.

**RSI**: Relative Strength Index. A momentum indicator. Below 30 = oversold (momentum stretched too far down). Above 70 = overbought.

**SKEW**: Measures the cost of far out-of-the-money put options. High SKEW = crash protection expensive = market nervous. Low SKEW = fear exhausted.

**Stop-Loss**: A pre-set exit price. If the market falls to this level, you sell automatically to limit losses.

**Triple Confluence**: When three independent technical conditions (support, RSI oversold, volume spike) all fire on the same instrument simultaneously.

**VIX**: The CBOE Volatility Index. Measures 30-day implied volatility. Known as the "fear gauge." Rises when investors fear near-term market drops.

**Yield Curve**: The relationship between short-term and long-term interest rates. Normal = long higher than short. Inverted (short > long) = recession signal.
