/**
 * Contrarian signal scoring engine extracted from index.html:1045-1056.
 * Each signal's score() is a pure function of the pulseState object.
 */

/**
 * Creates the array of 10 contrarian buy signals.
 * Each signal reads from the provided state object (not a global).
 * @param {object} state - The pulseState object
 * @returns {Array} Signal definitions with score/reading/color/interpret methods
 */
function createSignals(state) {
  return [
    {
      id: 'cnnFG',
      name: 'CNN Fear & Greed',
      threshold: '≤ 14',
      score: () => {
        if (state.cnnFG === null) return 0;
        return state.cnnFG <= 14 ? 1 : state.cnnFG <= 25 ? 0.5 : 0;
      },
      reading: () => state.cnnFG,
      color: () => state.cnnFG <= 14 ? '#ef4444'
        : state.cnnFG <= 25 ? '#f97316'
        : state.cnnFG <= 40 ? '#f59e0b' : '#22c55e',
      interpret: () => state.cnnFG <= 14 ? 'EXTREME FEAR — contrarian buy zone'
        : state.cnnFG <= 25 ? 'FEAR — approaching buy zone'
        : 'NOT fearful enough yet',
    },
    {
      id: 'vix',
      name: 'VIX',
      threshold: '≥ 35',
      score: () => {
        if (state.vix === null) return 0;
        return state.vix >= 45 ? 1
          : state.vix >= 35 ? 0.75
          : state.vix >= 28 ? 0.25 : 0;
      },
      reading: () => state.vix,
      color: () => state.vix >= 45 ? '#ef4444'
        : state.vix >= 35 ? '#f97316'
        : state.vix >= 25 ? '#f59e0b' : '#22c55e',
      interpret: () => state.vix >= 45 ? 'PANIC — capitulation level VIX'
        : state.vix >= 35 ? 'HIGH FEAR — approaching capitulation'
        : state.vix >= 25 ? 'Elevated but not extreme'
        : 'Low vol — complacent market',
    },
    {
      id: 'cryptoFG',
      name: 'Crypto Fear & Greed',
      threshold: '≤ 15',
      score: () => {
        if (state.cryptoFG === null) return 0;
        return state.cryptoFG <= 10 ? 1
          : state.cryptoFG <= 20 ? 0.75
          : state.cryptoFG <= 30 ? 0.25 : 0;
      },
      reading: () => state.cryptoFG,
      color: () => state.cryptoFG <= 15 ? '#ef4444'
        : state.cryptoFG <= 25 ? '#f97316'
        : state.cryptoFG <= 40 ? '#f59e0b' : '#22c55e',
      interpret: () => state.cryptoFG <= 15
        ? 'EXTREME FEAR — historically 80% positive 30d returns'
        : state.cryptoFG <= 25 ? 'FEAR — crypto sentiment very negative'
        : 'Not extreme enough',
    },
    {
      id: 'aaii',
      name: 'AAII Bear-Bull Spread',
      threshold: 'Bear ≥ 50%',
      score: () => {
        if (state.aaiiBear === null) return 0;
        return state.aaiiBear >= 55 ? 1
          : state.aaiiBear >= 45 ? 0.75
          : state.aaiiBear >= 38 ? 0.25 : 0;
      },
      reading: () => state.aaiiBear !== null ? state.aaiiBear + '%' : null,
      color: () => state.aaiiBear >= 50 ? '#ef4444'
        : state.aaiiBear >= 40 ? '#f97316'
        : state.aaiiBear >= 35 ? '#f59e0b' : '#22c55e',
      interpret: () => state.aaiiBear >= 50
        ? 'EXTREME bearish — historically strong contrarian buy'
        : state.aaiiBear >= 40 ? 'Very bearish — approaching signal'
        : 'Mildly bearish — not extreme',
    },
    {
      id: 'putcall',
      name: 'Put/Call Ratio',
      threshold: '≥ 1.2',
      score: () => {
        if (state.putCallRatio === null) return 0;
        return state.putCallRatio >= 1.3 ? 1
          : state.putCallRatio >= 1.1 ? 0.5 : 0;
      },
      reading: () => state.putCallRatio,
      color: () => state.putCallRatio >= 1.2 ? '#ef4444'
        : state.putCallRatio >= 1.0 ? '#f97316'
        : state.putCallRatio >= 0.8 ? '#f59e0b' : '#22c55e',
      interpret: () => state.putCallRatio >= 1.2
        ? 'Heavy put buying — maximum fear hedging'
        : state.putCallRatio >= 1.0 ? 'Elevated hedging activity'
        : 'Normal or low hedging',
    },
    {
      id: 'spyVolSpike',
      name: 'SPY Volume vs 20d Avg',
      threshold: '≥ 2.0x',
      score: () => {
        if (!state.spyVol || !state.spy20dAvgVol) return 0;
        const r = state.spyVol / state.spy20dAvgVol;
        return r >= 3 ? 1 : r >= 2 ? 0.75 : r >= 1.5 ? 0.25 : 0;
      },
      reading: () => state.spyVol && state.spy20dAvgVol
        ? (state.spyVol / state.spy20dAvgVol).toFixed(1) + 'x' : null,
      color: () => {
        const r = state.spyVol / state.spy20dAvgVol;
        return r >= 2.5 ? '#ef4444' : r >= 1.8 ? '#f97316' : r >= 1.3 ? '#f59e0b' : '#22c55e';
      },
      interpret: () => {
        const r = state.spyVol / state.spy20dAvgVol;
        return r >= 2.5 ? 'CAPITULATION VOLUME — Coulling accumulation signal'
          : r >= 1.8 ? 'High volume — watch for narrowing spread'
          : r >= 1.3 ? 'Above average — some institutional activity'
          : 'Normal volume — no panic selling';
      },
    },
    {
      id: 'spyDrawdown',
      name: 'SPY % from ATH',
      threshold: '≥ 10%',
      score: () => {
        const d = state.spyPctFromATH;
        return d >= 20 ? 1 : d >= 10 ? 0.75 : d >= 7 ? 0.25 : 0;
      },
      reading: () => state.spyPctFromATH !== null
        ? '-' + state.spyPctFromATH.toFixed(1) + '%' : null,
      color: () => {
        const d = state.spyPctFromATH;
        return d >= 20 ? '#ef4444' : d >= 10 ? '#f97316' : d >= 5 ? '#f59e0b' : '#22c55e';
      },
      interpret: () => {
        const d = state.spyPctFromATH;
        return d >= 20 ? 'BEAR TERRITORY — deep correction'
          : d >= 10 ? 'CORRECTION — historical buy zone'
          : d >= 5 ? 'Pullback — not deep enough yet'
          : 'Near ATH — no discount';
      },
    },
    {
      id: 'breadth',
      name: '% S&P above 200-DMA',
      threshold: '≤ 40%',
      score: () => {
        const v = state.pctAbove200dma;
        if (v === null) return 0;
        return v <= 30 ? 1 : v <= 40 ? 0.75 : v <= 50 ? 0.25 : 0;
      },
      reading: () => state.pctAbove200dma !== null ? state.pctAbove200dma + '%' : null,
      color: () => {
        const v = state.pctAbove200dma;
        return v <= 30 ? '#ef4444' : v <= 40 ? '#f97316' : v <= 50 ? '#f59e0b' : '#22c55e';
      },
      interpret: () => {
        const v = state.pctAbove200dma;
        return v <= 30 ? 'WASHED OUT breadth — most stocks in downtrend'
          : v <= 40 ? 'Weak breadth — approaching washout'
          : 'Breadth still OK — not a washout';
      },
    },
    {
      id: 'naaim',
      name: 'NAAIM Exposure Index',
      threshold: '≤ 40',
      score: () => {
        const v = state.naaimExposure;
        if (v === null) return 0;
        return v <= 25 ? 1 : v <= 40 ? 0.75 : v <= 60 ? 0.25 : 0;
      },
      reading: () => state.naaimExposure,
      color: () => {
        const v = state.naaimExposure;
        return v <= 30 ? '#ef4444' : v <= 50 ? '#f97316' : v <= 70 ? '#f59e0b' : '#22c55e';
      },
      interpret: () => {
        const v = state.naaimExposure;
        return v <= 30 ? 'Fund managers fully de-risked — contrarian buy'
          : v <= 50 ? 'Low exposure — approaching signal'
          : 'Managers still allocated — not washed out';
      },
    },
    {
      id: 'hySpreads',
      name: 'HY Credit Spreads (bps)',
      threshold: '≥ 500',
      score: () => {
        const v = state.hySpreads;
        if (v === null) return 0;
        return v >= 600 ? 1 : v >= 500 ? 0.75 : v >= 400 ? 0.25 : 0;
      },
      reading: () => state.hySpreads !== null ? state.hySpreads + ' bps' : null,
      color: () => {
        const v = state.hySpreads;
        return v >= 500 ? '#ef4444' : v >= 400 ? '#f97316' : v >= 350 ? '#f59e0b' : '#22c55e';
      },
      interpret: () => {
        const v = state.hySpreads;
        return v >= 500 ? 'CREDIT STRESS — real fear in bond markets'
          : v >= 400 ? 'Widening — credit market worried'
          : 'Spreads contained — no panic';
      },
    },
  ];
}

/**
 * Calculates the aggregate contrarian score from signals.
 * @param {Array} signals - Array of signal objects with score() methods
 * @returns {{ total: number, active: number, pct: number, label: string, colorKey: string }}
 */
function calcScore(signals) {
  let total = 0;
  let active = 0;
  signals.forEach(s => {
    const sc = s.score();
    if (sc > 0) active++;
    total += sc;
  });
  const pct = (total / signals.length) * 100;

  let label, colorKey;
  if (total >= 7) {
    label = 'STRONG CONTRARIAN BUY';
    colorKey = '#22c55e';
  } else if (total >= 5) {
    label = 'APPROACHING BUY ZONE';
    colorKey = '#f59e0b';
  } else if (total >= 3) {
    label = 'EARLY SIGNALS — WAIT';
    colorKey = '#f97316';
  } else {
    label = 'NO BUY SIGNAL';
    colorKey = '#94a3b8';
  }

  return { total, active, pct, label, colorKey };
}

module.exports = { createSignals, calcScore };
