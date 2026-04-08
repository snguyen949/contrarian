const { stats } = require('../src/backtest-stats');

describe('backtest stats', () => {
  test('returns zeros for empty array', () => {
    const result = stats([]);
    expect(result.total).toBe(0);
    expect(result.wins).toBe(0);
    expect(result.losses).toBe(0);
    expect(result.winRate).toBe(0);
    expect(result.profitFactor).toBe(0);
  });

  test('returns zeros for null input', () => {
    const result = stats(null);
    expect(result.total).toBe(0);
  });

  test('calculates win rate correctly', () => {
    const trades = [
      { r: 2, dir: 'Long', t1: true, t2: true, t3: false },
      { r: -1, dir: 'Long', t1: false },
      { r: 3, dir: 'Short', t1: true, t2: true, t3: true },
      { r: -1, dir: 'Short', t1: false },
    ];
    const result = stats(trades);
    expect(result.total).toBe(4);
    expect(result.wins).toBe(2);
    expect(result.losses).toBe(2);
    expect(result.winRate).toBe(0.5);
  });

  test('calculates average win and loss', () => {
    const trades = [
      { r: 2, dir: 'Long', t1: true },
      { r: 4, dir: 'Long', t1: true },
      { r: -1, dir: 'Long', t1: false },
      { r: -3, dir: 'Long', t1: false },
    ];
    const result = stats(trades);
    expect(result.avgWin).toBe(3);   // (2+4)/2
    expect(result.avgLoss).toBe(2);  // (1+3)/2
  });

  test('calculates profit factor', () => {
    const trades = [
      { r: 3, dir: 'Long', t1: true },
      { r: -1, dir: 'Long', t1: false },
    ];
    const result = stats(trades);
    expect(result.profitFactor).toBe(3); // avgWin(3) / avgLoss(1)
  });

  test('profit factor is Infinity when no losses', () => {
    const trades = [
      { r: 2, dir: 'Long', t1: true },
      { r: 3, dir: 'Long', t1: true },
    ];
    const result = stats(trades);
    expect(result.profitFactor).toBe(Infinity);
  });

  test('profit factor is 0 when no wins and no losses', () => {
    const trades = [
      { r: 0, dir: 'Long', t1: false },
    ];
    const result = stats(trades);
    expect(result.profitFactor).toBe(0);
  });

  test('calculates totalR correctly', () => {
    const trades = [
      { r: 2, dir: 'Long', t1: true },
      { r: -1, dir: 'Long', t1: false },
      { r: 3, dir: 'Long', t1: true },
    ];
    const result = stats(trades);
    expect(result.totalR).toBe(4); // 2 + -1 + 3
  });

  test('calculates long vs short win rates', () => {
    const trades = [
      { r: 2, dir: 'Long', t1: true },
      { r: -1, dir: 'Long', t1: false },
      { r: 1, dir: 'Short', t1: true },
      { r: 1, dir: 'Short', t1: true },
      { r: -1, dir: 'Short', t1: false },
    ];
    const result = stats(trades);
    expect(result.longWinRate).toBe(0.5);           // 1/2
    expect(result.shortWinRate).toBeCloseTo(0.667, 2); // 2/3
    expect(result.longCount).toBe(2);
    expect(result.shortCount).toBe(3);
  });

  test('exit counts: t3 hit', () => {
    const trades = [
      { r: 5, dir: 'Long', t1: true, t2: true, t3: true },
    ];
    const result = stats(trades);
    expect(result.exitCounts.t3).toBe(1);
    expect(result.exitCounts.t2).toBe(0);
    expect(result.exitCounts.t1).toBe(0);
    expect(result.exitCounts.stopLoss).toBe(0);
  });

  test('exit counts: t2 only (no t3)', () => {
    const trades = [
      { r: 3, dir: 'Long', t1: true, t2: true, t3: false },
    ];
    const result = stats(trades);
    expect(result.exitCounts.t2).toBe(1);
    expect(result.exitCounts.t3).toBe(0);
  });

  test('exit counts: t1 only (no t2)', () => {
    const trades = [
      { r: 1, dir: 'Long', t1: true, t2: false },
    ];
    const result = stats(trades);
    expect(result.exitCounts.t1).toBe(1);
  });

  test('exit counts: stop loss (no t1)', () => {
    const trades = [
      { r: -1, dir: 'Long', t1: false },
    ];
    const result = stats(trades);
    expect(result.exitCounts.stopLoss).toBe(1);
  });

  test('single winning trade', () => {
    const trades = [{ r: 2.5, dir: 'Long', t1: true, t2: true, t3: false }];
    const result = stats(trades);
    expect(result.winRate).toBe(1);
    expect(result.avgWin).toBe(2.5);
    expect(result.avgLoss).toBe(0);
    expect(result.totalR).toBe(2.5);
  });

  test('single losing trade', () => {
    const trades = [{ r: -1.5, dir: 'Short', t1: false }];
    const result = stats(trades);
    expect(result.winRate).toBe(0);
    expect(result.avgWin).toBe(0);
    expect(result.avgLoss).toBe(1.5);
    expect(result.totalR).toBe(-1.5);
  });

  test('handles zero-R trades (breakeven)', () => {
    const trades = [
      { r: 0, dir: 'Long', t1: true },
      { r: 0, dir: 'Short', t1: false },
    ];
    const result = stats(trades);
    // r=0 is neither > 0 nor < 0
    expect(result.wins).toBe(0);
    expect(result.losses).toBe(0);
    expect(result.winRate).toBe(0);
    expect(result.totalR).toBe(0);
  });
});
