/**
 * Supertrend backtest statistics calculator extracted from supertrend.html:388-406.
 * Pure function that computes trade statistics from an array of trade objects.
 */

/**
 * Computes aggregate statistics for a set of trades.
 * @param {Array<{r: number, dir: string, t1?: boolean, t2?: boolean, t3?: boolean}>} trades
 * @returns {{
 *   total: number, wins: number, losses: number, winRate: number,
 *   avgWin: number, avgLoss: number, profitFactor: number, totalR: number,
 *   longWinRate: number, shortWinRate: number, longCount: number, shortCount: number,
 *   exitCounts: { t3: number, t2: number, t1: number, stopLoss: number }
 * }}
 */
function stats(trades) {
  if (!trades || trades.length === 0) {
    return {
      total: 0, wins: 0, losses: 0, winRate: 0,
      avgWin: 0, avgLoss: 0, profitFactor: 0, totalR: 0,
      longWinRate: 0, shortWinRate: 0, longCount: 0, shortCount: 0,
      exitCounts: { t3: 0, t2: 0, t1: 0, stopLoss: 0 },
    };
  }

  const wins = trades.filter(t => t.r > 0);
  const losses = trades.filter(t => t.r < 0);

  const avgWin = wins.length > 0
    ? wins.reduce((s, t) => s + t.r, 0) / wins.length
    : 0;
  const avgLoss = losses.length > 0
    ? Math.abs(losses.reduce((s, t) => s + t.r, 0)) / losses.length
    : 0;
  const profitFactor = avgLoss > 0 ? avgWin / avgLoss : avgWin > 0 ? Infinity : 0;

  const totalR = trades.reduce((s, t) => s + t.r, 0);

  const longs = trades.filter(t => t.dir === 'Long');
  const shorts = trades.filter(t => t.dir === 'Short');
  const longWinRate = longs.length > 0
    ? longs.filter(t => t.r > 0).length / longs.length
    : 0;
  const shortWinRate = shorts.length > 0
    ? shorts.filter(t => t.r > 0).length / shorts.length
    : 0;

  const t3 = trades.filter(t => t.t3).length;
  const t2 = trades.filter(t => t.t2 && !t.t3).length;
  const t1 = trades.filter(t => t.t1 && !t.t2).length;
  const stopLoss = trades.filter(t => !t.t1).length;

  return {
    total: trades.length,
    wins: wins.length,
    losses: losses.length,
    winRate: wins.length / trades.length,
    avgWin,
    avgLoss,
    profitFactor,
    totalR,
    longWinRate,
    shortWinRate,
    longCount: longs.length,
    shortCount: shorts.length,
    exitCounts: { t3, t2, t1, stopLoss },
  };
}

module.exports = { stats };
