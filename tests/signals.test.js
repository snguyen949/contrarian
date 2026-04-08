const { createSignals, calcScore } = require('../src/signals');

function makeState(overrides = {}) {
  return {
    spyPrice: null, spyVol: null, spy20dAvgVol: null, spyPctFromATH: null,
    vix: null, btcPrice: null, btcChange24h: null,
    cryptoFG: null, cryptoFGLabel: null,
    cnnFG: null, aaiiBull: null, aaiiBear: null,
    putCallRatio: null, pctAbove200dma: null, naaimExposure: null,
    hySpreads: null,
    ...overrides,
  };
}

describe('Signal Scoring — CNN Fear & Greed', () => {
  test('score = 1 when cnnFG ≤ 14 (extreme fear)', () => {
    const signals = createSignals(makeState({ cnnFG: 14 }));
    expect(signals[0].score()).toBe(1);
  });

  test('score = 1 when cnnFG = 0', () => {
    const signals = createSignals(makeState({ cnnFG: 0 }));
    expect(signals[0].score()).toBe(1);
  });

  test('score = 0.5 when cnnFG is 15-25 (fear)', () => {
    const signals = createSignals(makeState({ cnnFG: 15 }));
    expect(signals[0].score()).toBe(0.5);
    const signals2 = createSignals(makeState({ cnnFG: 25 }));
    expect(signals2[0].score()).toBe(0.5);
  });

  test('score = 0 when cnnFG > 25', () => {
    const signals = createSignals(makeState({ cnnFG: 26 }));
    expect(signals[0].score()).toBe(0);
    const signals2 = createSignals(makeState({ cnnFG: 75 }));
    expect(signals2[0].score()).toBe(0);
  });

  test('score = 0 when cnnFG is null', () => {
    const signals = createSignals(makeState({ cnnFG: null }));
    expect(signals[0].score()).toBe(0);
  });
});

describe('Signal Scoring — VIX', () => {
  test('score = 1 when VIX ≥ 45', () => {
    const signals = createSignals(makeState({ vix: 45 }));
    expect(signals[1].score()).toBe(1);
    const signals2 = createSignals(makeState({ vix: 80 }));
    expect(signals2[1].score()).toBe(1);
  });

  test('score = 0.75 when VIX 35-44', () => {
    const signals = createSignals(makeState({ vix: 35 }));
    expect(signals[1].score()).toBe(0.75);
    const signals2 = createSignals(makeState({ vix: 44 }));
    expect(signals2[1].score()).toBe(0.75);
  });

  test('score = 0.25 when VIX 28-34', () => {
    const signals = createSignals(makeState({ vix: 28 }));
    expect(signals[1].score()).toBe(0.25);
    const signals2 = createSignals(makeState({ vix: 34 }));
    expect(signals2[1].score()).toBe(0.25);
  });

  test('score = 0 when VIX < 28', () => {
    const signals = createSignals(makeState({ vix: 15 }));
    expect(signals[1].score()).toBe(0);
  });

  test('score = 0 when VIX is null', () => {
    const signals = createSignals(makeState({ vix: null }));
    expect(signals[1].score()).toBe(0);
  });
});

describe('Signal Scoring — Crypto Fear & Greed', () => {
  test('score = 1 when ≤ 10', () => {
    const signals = createSignals(makeState({ cryptoFG: 10 }));
    expect(signals[2].score()).toBe(1);
  });

  test('score = 0.75 when 11-20', () => {
    const signals = createSignals(makeState({ cryptoFG: 20 }));
    expect(signals[2].score()).toBe(0.75);
  });

  test('score = 0.25 when 21-30', () => {
    const signals = createSignals(makeState({ cryptoFG: 30 }));
    expect(signals[2].score()).toBe(0.25);
  });

  test('score = 0 when > 30', () => {
    const signals = createSignals(makeState({ cryptoFG: 50 }));
    expect(signals[2].score()).toBe(0);
  });

  test('score = 0 when null', () => {
    const signals = createSignals(makeState({ cryptoFG: null }));
    expect(signals[2].score()).toBe(0);
  });
});

describe('Signal Scoring — AAII Bear-Bull Spread', () => {
  test('score = 1 when aaiiBear ≥ 55', () => {
    const signals = createSignals(makeState({ aaiiBear: 55 }));
    expect(signals[3].score()).toBe(1);
  });

  test('score = 0.75 when 45-54', () => {
    const signals = createSignals(makeState({ aaiiBear: 45 }));
    expect(signals[3].score()).toBe(0.75);
  });

  test('score = 0.25 when 38-44', () => {
    const signals = createSignals(makeState({ aaiiBear: 38 }));
    expect(signals[3].score()).toBe(0.25);
  });

  test('score = 0 when < 38', () => {
    const signals = createSignals(makeState({ aaiiBear: 30 }));
    expect(signals[3].score()).toBe(0);
  });

  test('score = 0 when null', () => {
    const signals = createSignals(makeState({ aaiiBear: null }));
    expect(signals[3].score()).toBe(0);
  });
});

describe('Signal Scoring — Put/Call Ratio', () => {
  test('score = 1 when ≥ 1.3', () => {
    const signals = createSignals(makeState({ putCallRatio: 1.3 }));
    expect(signals[4].score()).toBe(1);
  });

  test('score = 0.5 when 1.1-1.29', () => {
    const signals = createSignals(makeState({ putCallRatio: 1.1 }));
    expect(signals[4].score()).toBe(0.5);
  });

  test('score = 0 when < 1.1', () => {
    const signals = createSignals(makeState({ putCallRatio: 0.8 }));
    expect(signals[4].score()).toBe(0);
  });

  test('score = 0 when null', () => {
    const signals = createSignals(makeState({ putCallRatio: null }));
    expect(signals[4].score()).toBe(0);
  });
});

describe('Signal Scoring — SPY Volume Spike', () => {
  test('score = 1 when volume ≥ 3x average', () => {
    const signals = createSignals(makeState({ spyVol: 300, spy20dAvgVol: 100 }));
    expect(signals[5].score()).toBe(1);
  });

  test('score = 0.75 when 2x-2.99x', () => {
    const signals = createSignals(makeState({ spyVol: 200, spy20dAvgVol: 100 }));
    expect(signals[5].score()).toBe(0.75);
  });

  test('score = 0.25 when 1.5x-1.99x', () => {
    const signals = createSignals(makeState({ spyVol: 150, spy20dAvgVol: 100 }));
    expect(signals[5].score()).toBe(0.25);
  });

  test('score = 0 when < 1.5x', () => {
    const signals = createSignals(makeState({ spyVol: 100, spy20dAvgVol: 100 }));
    expect(signals[5].score()).toBe(0);
  });

  test('score = 0 when volume is null', () => {
    const signals = createSignals(makeState({ spyVol: null, spy20dAvgVol: 100 }));
    expect(signals[5].score()).toBe(0);
  });

  test('score = 0 when avg volume is null', () => {
    const signals = createSignals(makeState({ spyVol: 200, spy20dAvgVol: null }));
    expect(signals[5].score()).toBe(0);
  });

  test('score = 0 when avg volume is 0 (avoids Infinity)', () => {
    const signals = createSignals(makeState({ spyVol: 200, spy20dAvgVol: 0 }));
    // 0 is falsy, so the guard catches it
    expect(signals[5].score()).toBe(0);
  });
});

describe('Signal Scoring — SPY Drawdown', () => {
  test('score = 1 when drawdown ≥ 20%', () => {
    const signals = createSignals(makeState({ spyPctFromATH: 20 }));
    expect(signals[6].score()).toBe(1);
  });

  test('score = 0.75 when 10-19%', () => {
    const signals = createSignals(makeState({ spyPctFromATH: 10 }));
    expect(signals[6].score()).toBe(0.75);
  });

  test('score = 0.25 when 7-9%', () => {
    const signals = createSignals(makeState({ spyPctFromATH: 7 }));
    expect(signals[6].score()).toBe(0.25);
  });

  test('score = 0 when < 7%', () => {
    const signals = createSignals(makeState({ spyPctFromATH: 3 }));
    expect(signals[6].score()).toBe(0);
  });
});

describe('Signal Scoring — Breadth (% above 200-DMA)', () => {
  test('score = 1 when ≤ 30%', () => {
    const signals = createSignals(makeState({ pctAbove200dma: 30 }));
    expect(signals[7].score()).toBe(1);
  });

  test('score = 0.75 when 31-40%', () => {
    const signals = createSignals(makeState({ pctAbove200dma: 40 }));
    expect(signals[7].score()).toBe(0.75);
  });

  test('score = 0.25 when 41-50%', () => {
    const signals = createSignals(makeState({ pctAbove200dma: 50 }));
    expect(signals[7].score()).toBe(0.25);
  });

  test('score = 0 when > 50%', () => {
    const signals = createSignals(makeState({ pctAbove200dma: 70 }));
    expect(signals[7].score()).toBe(0);
  });

  test('score = 0 when null', () => {
    const signals = createSignals(makeState({ pctAbove200dma: null }));
    expect(signals[7].score()).toBe(0);
  });
});

describe('Signal Scoring — NAAIM Exposure', () => {
  test('score = 1 when ≤ 25', () => {
    const signals = createSignals(makeState({ naaimExposure: 25 }));
    expect(signals[8].score()).toBe(1);
  });

  test('score = 0.75 when 26-40', () => {
    const signals = createSignals(makeState({ naaimExposure: 40 }));
    expect(signals[8].score()).toBe(0.75);
  });

  test('score = 0.25 when 41-60', () => {
    const signals = createSignals(makeState({ naaimExposure: 60 }));
    expect(signals[8].score()).toBe(0.25);
  });

  test('score = 0 when > 60', () => {
    const signals = createSignals(makeState({ naaimExposure: 80 }));
    expect(signals[8].score()).toBe(0);
  });

  test('score = 0 when null', () => {
    const signals = createSignals(makeState({ naaimExposure: null }));
    expect(signals[8].score()).toBe(0);
  });
});

describe('Signal Scoring — HY Credit Spreads', () => {
  test('score = 1 when ≥ 600 bps', () => {
    const signals = createSignals(makeState({ hySpreads: 600 }));
    expect(signals[9].score()).toBe(1);
  });

  test('score = 0.75 when 500-599 bps', () => {
    const signals = createSignals(makeState({ hySpreads: 500 }));
    expect(signals[9].score()).toBe(0.75);
  });

  test('score = 0.25 when 400-499 bps', () => {
    const signals = createSignals(makeState({ hySpreads: 400 }));
    expect(signals[9].score()).toBe(0.25);
  });

  test('score = 0 when < 400 bps', () => {
    const signals = createSignals(makeState({ hySpreads: 300 }));
    expect(signals[9].score()).toBe(0);
  });

  test('score = 0 when null', () => {
    const signals = createSignals(makeState({ hySpreads: null }));
    expect(signals[9].score()).toBe(0);
  });
});

// ===== Score Aggregation =====

describe('calcScore', () => {
  test('returns 0 total and NO BUY SIGNAL when all signals are null', () => {
    const signals = createSignals(makeState());
    const result = calcScore(signals);
    expect(result.total).toBe(0);
    expect(result.active).toBe(0);
    expect(result.label).toBe('NO BUY SIGNAL');
  });

  test('STRONG CONTRARIAN BUY when total ≥ 7', () => {
    // Max out enough signals to hit 7+
    const state = makeState({
      cnnFG: 5, vix: 50, cryptoFG: 5, aaiiBear: 60,
      putCallRatio: 1.5, spyVol: 400, spy20dAvgVol: 100,
      spyPctFromATH: 25, pctAbove200dma: 20, naaimExposure: 20,
      hySpreads: 700,
    });
    const signals = createSignals(state);
    const result = calcScore(signals);
    expect(result.total).toBeGreaterThanOrEqual(7);
    expect(result.label).toBe('STRONG CONTRARIAN BUY');
    expect(result.active).toBe(10);
  });

  test('APPROACHING BUY ZONE when total is 5-6.99', () => {
    const state = makeState({
      cnnFG: 14, vix: 45, cryptoFG: 10, aaiiBear: 55, putCallRatio: 1.3,
      // Rest null — scores 0
    });
    const signals = createSignals(state);
    const result = calcScore(signals);
    expect(result.total).toBe(5); // 1+1+1+1+1
    expect(result.label).toBe('APPROACHING BUY ZONE');
  });

  test('EARLY SIGNALS when total is 3-4.99', () => {
    const state = makeState({
      cnnFG: 14, vix: 45, cryptoFG: 10,
      // 3 signals at score=1 each
    });
    const signals = createSignals(state);
    const result = calcScore(signals);
    expect(result.total).toBe(3);
    expect(result.label).toBe('EARLY SIGNALS — WAIT');
  });

  test('boundary: exactly 7.0 → STRONG BUY', () => {
    const state = makeState({
      cnnFG: 14, vix: 45, cryptoFG: 10, aaiiBear: 55,
      putCallRatio: 1.3, spyVol: 300, spy20dAvgVol: 100, spyPctFromATH: 20,
      // total = 1+1+1+1+1+1+1 = 7
    });
    const signals = createSignals(state);
    const result = calcScore(signals);
    expect(result.total).toBe(7);
    expect(result.label).toBe('STRONG CONTRARIAN BUY');
  });

  test('counts active signals correctly with partial scores', () => {
    const state = makeState({
      cnnFG: 20, // 0.5
      vix: 30,   // 0.25
    });
    const signals = createSignals(state);
    const result = calcScore(signals);
    expect(result.active).toBe(2);
    expect(result.total).toBeCloseTo(0.75);
  });

  test('percentage calculation is correct', () => {
    const state = makeState({ cnnFG: 14 }); // score = 1 out of 10 signals
    const signals = createSignals(state);
    const result = calcScore(signals);
    expect(result.pct).toBeCloseTo(10); // 1/10 * 100
  });
});
