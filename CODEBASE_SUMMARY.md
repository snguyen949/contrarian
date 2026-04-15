# Contrarian Dashboard — Codebase Summary

**File:** `index.html`  
**Lines:** 5,195  
**Size:** 356,497 bytes (348 KB)  
**Syntax check:** PASS (no errors)

---

## 1. All Functions & Line Numbers

### Global Scope (55 total)

| Line | Function | Async |
|------|----------|-------|
| 1195 | `toggleTheme()` | no |
| 1281 | `fearColor(v)` | no |
| 1282 | `vixColor(v)` | no |
| 1283 | `ddColor(v)` | no |
| 1284 | `aaiiColor(v)` | no |
| 1286 | `renderManualInputs()` | no |
| 1298 | `renderPulseCards()` | no |
| 1356 | `recalcScore()` | no |
| 1503 | `captureSignalHistory()` | no |
| 1516 | `computeDirections()` | no |
| 1534 | `renderRollingOverBanner(dirs)` | no |
| 1547 | `updateActionCard()` | no |
| 1739 | `updateHeroBanner()` | no |
| 1827 | `classifyRegime()` | no |
| 1859 | `fetchWithTimeout(url, ms)` | no |
| 1866 | `fetchWithRetry(url, ms, retries)` | **yes** |
| 1889 | `yahooChart(ticker, range, interval)` | **yes** |
| 1932 | `fetchYahooHistory(ticker, range)` | **yes** |
| 1967 | `computeHistoricalScore(m)` | no |
| 1981 | `fetchAndRenderHistory(range)` | **yes** |
| 2043 | `renderHistoricalCharts(series, range)` | no |
| 2176 | `setAutoRefreshMode(mode)` | no |
| 2218 | `fetchLightData()` | **yes** |
| 2394 | `saveApiKeys()` | no |
| 2405 | `fetchAllData()` | **yes** |
| 3006 | `snapshotForDiff()` | no |
| 3030 | `renderWhatChanged(prev, curr)` | no |
| 3131 | `captureSnapshot()` | no |
| 3170 | `clearHistory()` | no |
| 3176 | `renderHistoryTab()` | no |
| 3182 | `_renderLocalSnapshotHistory()` | no |
| 3311 | `renderTechnicals()` | no |
| 3383 | `renderFredPanel()` | no |
| 3409 | `renderNewsPanel(articles)` | no |
| 3462 | `propagateData()` | no |
| 3557 | `updateShortTermSignals()` | no |
| 3806 | `renderSentimentSnapshots()` | no |
| 3830 | `renderBars(containerId, label, field, max, colorFn, unit)` | no |
| 3858 | `makeGauge(value, max, size, color)` | no |
| 3948 | `updateCoullingIran()` | no |
| 3986 | `renderCoullingMatrix()` | no |
| 4183 | `renderSvgChart()` | no |
| 4314 | `renderCrisisDetail()` | no |
| 4420 | `updateSqueezeTab()` | no |
| 4667 | `matchKeywords(text, keywordMap)` | no |
| 4678 | `detectConflictPhase()` | no |
| 4697 | `detectTariffPhase()` | no |
| 4717 | `classifyHeadlinesWithGroq(headlines, groqKey)` | **yes** |
| 4759 | `fetchHeadlines()` | **yes** |
| 4971 | `renderConflictSteps()` | no |
| 5036 | `renderTariffSteps()` | no |
| 5073 | `requestNotifPermission()` | no |
| 5080 | `checkAlerts()` | no |
| 5104 | `exportDashboard(format)` | no |
| 5146 | `renderBacktest()` | no |

### Nested Functions (defined inside other functions)

| Line | Function | Parent |
|------|----------|--------|
| 1302 | `spark(data, color, w, h)` | `renderPulseCards` |
| 2050 | `svgLine(vals, H, colorFn, minV, maxV)` | `renderHistoricalCharts` |
| 2091 | `miniChart(label, vals, colorHex, H, fmt)` | `renderHistoricalCharts` |
| 2199 | `tick()` | `setAutoRefreshMode` |
| 3062 | `fmtV(v, fmt)` | `renderWhatChanged` |
| 3073 | `fmtDelta(delta, fmt, pct)` | `renderWhatChanged` |
| 3222 | `sparkCard(label, key, fmt, color, invert)` | `_renderLocalSnapshotHistory` |
| 4517 | `renderTriggers(items, borderCol)` | `updateSqueezeTab` |

---

## 2. Data Sources

### Free (no API key required)

| Source | Domain | Data |
|--------|--------|------|
| Crypto Fear & Greed | `api.alternative.me` | F&G index 0–100, label |
| Bitcoin | `api.coingecko.com` | BTC/USD price, 24h change |
| Yahoo Finance | `query1/2.finance.yahoo.com` | SPY, VIX, QQQ, IWM, Oil (CL=F), TNX, Gold (GC=F), SPXA200R, VIX3M, SKEW, FVX, TYX — via CORS proxy |
| CNN Fear & Greed | `production.dataviz.cnn.io` | CNN proprietary F&G gauge 0–100 |
| StockTwits | `api.stocktwits.com` | SPY + QQQ bear/bull % from last 30 posts |
| AAII Sentiment | `www.aaii.com` | Weekly bull/bear % survey |
| NAAIM Exposure | `www.naaim.org` | Active manager equity exposure index |
| Polymarket | `gamma-api.polymarket.com` | Iran ceasefire odds %, US recession 2026 odds % |
| Reddit | `www.reddit.com` | r/worldnews, r/stocks headlines (conflict/tariff detection) |
| CORS Proxies | `corsproxy.io`, `api.allorigins.win`, `corsproxy.org`, `proxy.cors.sh` | Proxy layer for CORS-blocked APIs |

### Require API Key (5 keys)

| Key ID | Source | Domain | Data |
|--------|--------|--------|------|
| `avKey` | Alpha Vantage | `www.alphavantage.co` | SPY RSI-14, SMA-200, MACD |
| `fredKey` | FRED (St. Louis Fed) | `api.stlouisfed.org` | NFCI, HY spreads (BAMLH0A0HYM2), IG spreads (BAMLC0A0CM), unemployment (UNRATE), CPI, money market assets (WMMNS) |
| `fhKey` | Finnhub | `finnhub.io` | SPY real-time quote, news sentiment bear/bull % |
| `newsKey` | NewsAPI | `newsapi.org` | Market headlines (stock market, S&P 500, Iran, tariffs) |
| `groqKey` | Groq AI | `api.groq.com` | LLaMA-3.1-70b classification of headlines → contrarian %, per-headline sentiment |

### Light Refresh vs Full Refresh

The auto-refresh (5min/15min) uses `fetchLightData()` — a subset that skips rate-limited/daily sources:

| Source | Full Fetch | Light Refresh |
|--------|:----------:|:-------------:|
| Yahoo Finance (13 tickers) | ✓ | ✓ |
| Crypto F&G | ✓ | ✓ |
| BTC (CoinGecko) | ✓ | ✓ |
| CNN F&G | ✓ | ✓ |
| StockTwits | ✓ | ✓ (SPY only) |
| Polymarket | ✓ | ✓ |
| AAII Sentiment | ✓ | — |
| NAAIM Exposure | ✓ | — |
| Alpha Vantage | ✓ | — |
| FRED | ✓ | — |
| Finnhub | ✓ | — |
| NewsAPI | ✓ | — |
| TwelveData | ✓ | — |
| MarketAux | ✓ | — |
| Groq AI (headline classifier) | ✓ | — |
| Reddit | ✓ | — |

---

## 3. Scoring Formula

### Cluster Definitions & Weights

```
rawScore = maxA×0.20 + maxB×0.35 + maxC×0.25 + maxD×0.20
total    = min(10, rawScore×10 + contrarianBoost)
```

Each cluster's contribution = the **highest single signal score** within that cluster (0–1.0), multiplied by the cluster weight. Only one signal per cluster drives the score.

#### Cluster A — Fear Level (weight 0.20)

| Signal | Key | Max Score | Threshold |
|--------|-----|-----------|-----------|
| CNN F&G | `cnnFG` | 1.0 | ≤ 14 = 1.0 / ≤ 25 = 0.5 |
| Crypto F&G | `cryptoFG` | 1.0 | ≤ 10 = 1.0 / ≤ 20 = 0.75 / ≤ 30 = 0.25 |
| AAII Bear % | `aaiiBear` | 1.0 | ≥ 50% = 1.0 / ≥ 45% = 0.75 / ≥ 38% = 0.25 |
| StockTwits Bear % | `stwSpy.bear` | 1.0 | ≥ 65% = 1.0 / ≥ 55% = 0.75 |

#### Cluster B — Volatility Structure (weight 0.35)

| Signal | Key | Max Score | Threshold |
|--------|-----|-----------|-----------|
| VIX/VIX3M Ratio | `vixTermStructure` | 1.0 | > 1.05 = 1.0 / > 1.0 = 0.75 / > 0.95 = 0.5 |
| VIX Index | `vix` | 1.0 | ≥ 45 = 1.0 / ≥ 35 = 0.75 |
| SKEW Index | `skew` | 0.75 | < 115 = 0.75 / < 120 = 0.5 (fear exhaustion) |

#### Cluster C — Flow & Positioning (weight 0.25)

| Signal | Key | Max Score | Threshold |
|--------|-----|-----------|-----------|
| SPY Volume Spike | `spyVol / spy20dAvgVol` | 1.0 | ≥ 3.0x = 1.0 / ≥ 2.0x = 0.75 |
| Put/Call Ratio | `putCallRatio` | 1.0 | ≥ 1.2 = 1.0 / ≥ 1.1 = 0.75 |
| NAAIM Exposure | `naaimExposure` | 1.0 | ≤ 25 = 1.0 / ≤ 40 = 0.75 |
| Money Market Assets | `moneyMarket` | 1.0 | ≥ $6.5T = 1.0 / ≥ $6.0T = 0.75 |

#### Cluster D — Credit & Macro (weight 0.20)

| Signal | Key | Max Score | Threshold |
|--------|-----|-----------|-----------|
| NFCI | `nfci` | 1.0 | ≥ 0.5 = 1.0 / > 0.1 = 0.75 |
| HY Spreads | `hySpreads` | 1.0 | ≥ 600 bps = 1.0 / ≥ 500 bps = 0.75 |
| IG Spreads | `igSpreads` | 1.0 | ≥ 200 bps = 1.0 / ≥ 150 bps = 0.75 |
| SPY Drawdown | `spyPctFromATH` | 1.0 | ≥ 20% = 1.0 / ≥ 10% = 0.75 |
| Yield Curve | `yieldCurveInverted` | 0.75 | inverted = 0.75 |

### Contrarian Boost (Groq AI)

When Groq AI classifies headlines and finds pessimistic framing despite positive data:

| Contrarian % | Boost |
|---|---|
| ≥ 60% of headlines | +1.0 |
| ≥ 40% of headlines | +0.5 |
| < 40% | +0.0 |

Boost is added to raw score, capped at 10.

### Buy Gate

The score label only shows **BUY NOW / STRONG BUY** if all three gate conditions are met:

```
buyGate = (clusterMax.A > 0.5)      // Fear is real
       AND (clusterMax.B > 0.5)     // Vol structure confirms
       AND (clusterMax.C > 0.5      // Positioning OR
         OR clusterMax.D > 0.5)     // Credit/Macro confirms
```

A high score without gate = "APPROACHING" label (not a buy signal).

### Regime-Adjusted Thresholds

The buy threshold (`buyThr`) scales dynamically based on market regime:

| Regime | Buy Threshold | Approach (×0.70) | Early (×0.43) | Trigger Conditions |
|--------|:-------------:|:-----------------:|:--------------:|-------------------|
| CREDIT_CRISIS 🔴 | 8.0 | 5.6 | 3.4 | NFCI > 0.5 AND HY > 500 bps AND IG > 150 bps |
| FUNDAMENTAL_BEAR 🐻 | 7.0 | 4.9 | 3.0 | SPY down ≥ 15% AND unemployment ≥ 4.5% |
| UNKNOWN (default) | 7.0 | 4.9 | 3.0 | None of the above |
| GEOPOLITICAL ⚑ | 5.0 | 3.5 | 2.2 | Oil spike > 15% AND credit healthy AND NFCI < 0.3 |
| MECHANICAL_FLUSH ⚡ | 4.0 | 2.8 | 1.7 | VIX up > 50% AND vol ratio > 2.5x AND credit healthy |

Regimes are checked in priority order: CREDIT_CRISIS → MECHANICAL_FLUSH → GEOPOLITICAL → FUNDAMENTAL_BEAR → UNKNOWN.

---

## 4. File Stats

| Metric | Value |
|--------|-------|
| Total lines | 5,195 |
| File size | 356,497 bytes (348 KB) |
| JavaScript functions | 63 (55 global + 8 nested) |
| Async functions | 10 |
| Data sources | 17 (10 free + 5 keyed + 2 proxy/aux) |
| Scoring clusters | 4 (A/B/C/D) |
| Scored signals | 16 |
| Regime types | 5 |

*Generated 2026-04-14*
