/**
 * API response parsers extracted from index.html.
 * These parse raw JSON responses into structured data objects.
 */

/**
 * Parses a Yahoo Finance chart API response into a structured result.
 * Extracted from the yahooChart() inner logic (index.html:1248-1276).
 *
 * @param {object} data - Raw JSON response from Yahoo Finance v8 chart API
 * @returns {{ ok: boolean, price?: number, prevClose?: number, volume?: number,
 *             avg20Vol?: number, date?: Date, allCloses?: number[], allVols?: number[] }}
 */
function parseYahooChart(data) {
  if (!data || !data.chart || !data.chart.result) return { ok: false };

  const res = data.chart.result[0];
  if (!res) return { ok: false };

  const ts = res.timestamp;
  const q = res.indicators && res.indicators.quote && res.indicators.quote[0];
  if (!q) return { ok: false };

  const closes = q.close;
  const volumes = q.volume;

  if (!closes || closes.length === 0) return { ok: false };

  let lastIdx = closes.length - 1;
  while (lastIdx >= 0 && closes[lastIdx] === null) lastIdx--;
  if (lastIdx < 0) return { ok: false };

  const lastDate = ts ? new Date(ts[lastIdx] * 1000) : new Date();
  const validCloses = closes.filter(v => v !== null);
  const validVols = volumes ? volumes.filter(v => v !== null) : [];

  const avg20Vol = validVols.length >= 20
    ? validVols.slice(-20).reduce((a, b) => a + b, 0) / 20
    : validVols.length > 0
      ? validVols.reduce((a, b) => a + b, 0) / validVols.length
      : null;

  return {
    ok: true,
    price: closes[lastIdx],
    prevClose: lastIdx > 0 ? closes[lastIdx - 1] : null,
    volume: volumes ? volumes[lastIdx] : null,
    avg20Vol,
    date: lastDate,
    allCloses: validCloses,
    allVols: validVols,
  };
}

/**
 * Parses a Crypto Fear & Greed API response.
 * @param {object} data - Raw JSON from api.alternative.me/fng
 * @returns {{ ok: boolean, value?: number, label?: string, date?: Date }}
 */
function parseCryptoFearGreed(data) {
  if (!data || !data.data || !data.data[0]) return { ok: false };
  const entry = data.data[0];
  return {
    ok: true,
    value: parseInt(entry.value),
    label: entry.value_classification,
    date: new Date(entry.timestamp * 1000),
  };
}

/**
 * Parses a CoinGecko simple price response for Bitcoin.
 * @param {object} data - Raw JSON from CoinGecko simple/price
 * @returns {{ ok: boolean, price?: number, change24h?: number }}
 */
function parseCoinGecko(data) {
  if (!data || !data.bitcoin) return { ok: false };
  return {
    ok: true,
    price: data.bitcoin.usd,
    change24h: data.bitcoin.usd_24h_change,
  };
}

/**
 * Parses CNN Fear & Greed index response.
 * @param {object} data - Raw JSON from CNN dataviz API
 * @returns {{ ok: boolean, score?: number, rating?: string }}
 */
function parseCnnFearGreed(data) {
  if (!data || !data.fear_and_greed || data.fear_and_greed.score === undefined) {
    return { ok: false };
  }
  return {
    ok: true,
    score: Math.round(data.fear_and_greed.score),
    rating: data.fear_and_greed.rating || '',
  };
}

/**
 * Parses StockTwits sentiment from a stream response.
 * @param {object} data - Raw JSON from StockTwits streams API
 * @returns {{ ok: boolean, bullPct?: number, bearPct?: number, total?: number }}
 */
function parseStockTwitsSentiment(data) {
  if (!data || !data.messages) return { ok: false };

  const msgs = data.messages.filter(
    m => m.entities && m.entities.sentiment && m.entities.sentiment.basic
  );
  const bull = msgs.filter(m => m.entities.sentiment.basic === 'Bullish').length;
  const bear = msgs.filter(m => m.entities.sentiment.basic === 'Bearish').length;
  const total = bull + bear;

  if (total === 0) return { ok: false };

  return {
    ok: true,
    bullPct: Math.round(bull / total * 100),
    bearPct: Math.round(bear / total * 100),
    total,
  };
}

module.exports = {
  parseYahooChart,
  parseCryptoFearGreed,
  parseCoinGecko,
  parseCnnFearGreed,
  parseStockTwitsSentiment,
};
