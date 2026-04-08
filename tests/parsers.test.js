const {
  parseYahooChart,
  parseCryptoFearGreed,
  parseCoinGecko,
  parseCnnFearGreed,
  parseStockTwitsSentiment,
} = require('../src/parsers');

describe('parseYahooChart', () => {
  const validResponse = {
    chart: {
      result: [{
        timestamp: [1700000000, 1700086400, 1700172800],
        indicators: {
          quote: [{
            close: [450.5, 452.3, 455.1],
            volume: [80000000, 90000000, 85000000],
          }],
        },
      }],
    },
  };

  test('parses valid response correctly', () => {
    const result = parseYahooChart(validResponse);
    expect(result.ok).toBe(true);
    expect(result.price).toBe(455.1);
    expect(result.prevClose).toBe(452.3);
    expect(result.volume).toBe(85000000);
    expect(result.allCloses).toEqual([450.5, 452.3, 455.1]);
    expect(result.allVols).toEqual([80000000, 90000000, 85000000]);
  });

  test('returns ok:false for null input', () => {
    expect(parseYahooChart(null).ok).toBe(false);
    expect(parseYahooChart(undefined).ok).toBe(false);
  });

  test('returns ok:false when chart.result is missing', () => {
    expect(parseYahooChart({ chart: {} }).ok).toBe(false);
    expect(parseYahooChart({ chart: { result: null } }).ok).toBe(false);
  });

  test('returns ok:false when result array is empty', () => {
    expect(parseYahooChart({ chart: { result: [] } }).ok).toBe(false);
  });

  test('handles trailing null closes', () => {
    const response = {
      chart: {
        result: [{
          timestamp: [1700000000, 1700086400, 1700172800],
          indicators: {
            quote: [{
              close: [450.5, 452.3, null],
              volume: [80000000, 90000000, null],
            }],
          },
        }],
      },
    };
    const result = parseYahooChart(response);
    expect(result.ok).toBe(true);
    expect(result.price).toBe(452.3);
    expect(result.prevClose).toBe(450.5);
  });

  test('returns ok:false when all closes are null', () => {
    const response = {
      chart: {
        result: [{
          timestamp: [1700000000],
          indicators: {
            quote: [{ close: [null, null], volume: [100] }],
          },
        }],
      },
    };
    const result = parseYahooChart(response);
    expect(result.ok).toBe(false);
  });

  test('handles missing volume array', () => {
    const response = {
      chart: {
        result: [{
          timestamp: [1700000000, 1700086400],
          indicators: {
            quote: [{ close: [450, 455] }],
          },
        }],
      },
    };
    const result = parseYahooChart(response);
    expect(result.ok).toBe(true);
    expect(result.volume).toBe(null);
    expect(result.avg20Vol).toBe(null);
    expect(result.allVols).toEqual([]);
  });

  test('calculates avg20Vol correctly with ≥20 data points', () => {
    const closes = Array(25).fill(100);
    const volumes = Array(25).fill(1000000);
    volumes[24] = 2000000; // last day spike
    const response = {
      chart: {
        result: [{
          timestamp: Array(25).fill(0).map((_, i) => 1700000000 + i * 86400),
          indicators: {
            quote: [{ close: closes, volume: volumes }],
          },
        }],
      },
    };
    const result = parseYahooChart(response);
    expect(result.ok).toBe(true);
    // Last 20 volumes: 19 * 1000000 + 1 * 2000000 = 21000000 / 20 = 1050000
    expect(result.avg20Vol).toBe(1050000);
  });

  test('calculates avg vol with fewer than 20 data points', () => {
    const response = {
      chart: {
        result: [{
          timestamp: [1700000000, 1700086400, 1700172800],
          indicators: {
            quote: [{
              close: [100, 101, 102],
              volume: [1000, 2000, 3000],
            }],
          },
        }],
      },
    };
    const result = parseYahooChart(response);
    expect(result.avg20Vol).toBe(2000); // (1000+2000+3000)/3
  });

  test('single data point returns prevClose as null', () => {
    const response = {
      chart: {
        result: [{
          timestamp: [1700000000],
          indicators: {
            quote: [{ close: [450], volume: [80000000] }],
          },
        }],
      },
    };
    const result = parseYahooChart(response);
    expect(result.ok).toBe(true);
    expect(result.price).toBe(450);
    expect(result.prevClose).toBe(null);
  });
});

describe('parseCryptoFearGreed', () => {
  test('parses valid response', () => {
    const data = { data: [{ value: '25', value_classification: 'Extreme Fear', timestamp: '1700000000' }] };
    const result = parseCryptoFearGreed(data);
    expect(result.ok).toBe(true);
    expect(result.value).toBe(25);
    expect(result.label).toBe('Extreme Fear');
  });

  test('returns ok:false for invalid data', () => {
    expect(parseCryptoFearGreed(null).ok).toBe(false);
    expect(parseCryptoFearGreed({}).ok).toBe(false);
    expect(parseCryptoFearGreed({ data: [] }).ok).toBe(false);
  });
});

describe('parseCoinGecko', () => {
  test('parses valid BTC response', () => {
    const data = { bitcoin: { usd: 43500, usd_24h_change: -2.5 } };
    const result = parseCoinGecko(data);
    expect(result.ok).toBe(true);
    expect(result.price).toBe(43500);
    expect(result.change24h).toBe(-2.5);
  });

  test('returns ok:false for missing bitcoin key', () => {
    expect(parseCoinGecko(null).ok).toBe(false);
    expect(parseCoinGecko({}).ok).toBe(false);
  });
});

describe('parseCnnFearGreed', () => {
  test('parses valid response', () => {
    const data = { fear_and_greed: { score: 14.7, rating: 'Extreme Fear' } };
    const result = parseCnnFearGreed(data);
    expect(result.ok).toBe(true);
    expect(result.score).toBe(15); // rounds
    expect(result.rating).toBe('Extreme Fear');
  });

  test('rounds score to integer', () => {
    const data = { fear_and_greed: { score: 27.3 } };
    const result = parseCnnFearGreed(data);
    expect(result.score).toBe(27);
  });

  test('handles missing rating', () => {
    const data = { fear_and_greed: { score: 50 } };
    const result = parseCnnFearGreed(data);
    expect(result.rating).toBe('');
  });

  test('returns ok:false for score=undefined', () => {
    expect(parseCnnFearGreed({ fear_and_greed: {} }).ok).toBe(false);
  });

  test('returns ok:false for null input', () => {
    expect(parseCnnFearGreed(null).ok).toBe(false);
  });
});

describe('parseStockTwitsSentiment', () => {
  test('parses mixed sentiment messages', () => {
    const data = {
      messages: [
        { entities: { sentiment: { basic: 'Bullish' } } },
        { entities: { sentiment: { basic: 'Bullish' } } },
        { entities: { sentiment: { basic: 'Bearish' } } },
        { entities: {} }, // no sentiment
      ],
    };
    const result = parseStockTwitsSentiment(data);
    expect(result.ok).toBe(true);
    expect(result.bullPct).toBe(67); // 2/3
    expect(result.bearPct).toBe(33); // 1/3
    expect(result.total).toBe(3);
  });

  test('returns ok:false when no messages have sentiment', () => {
    const data = { messages: [{ entities: {} }, { entities: {} }] };
    expect(parseStockTwitsSentiment(data).ok).toBe(false);
  });

  test('returns ok:false for null input', () => {
    expect(parseStockTwitsSentiment(null).ok).toBe(false);
  });

  test('returns ok:false for missing messages', () => {
    expect(parseStockTwitsSentiment({}).ok).toBe(false);
  });

  test('handles all bullish', () => {
    const data = {
      messages: [
        { entities: { sentiment: { basic: 'Bullish' } } },
        { entities: { sentiment: { basic: 'Bullish' } } },
      ],
    };
    const result = parseStockTwitsSentiment(data);
    expect(result.bullPct).toBe(100);
    expect(result.bearPct).toBe(0);
  });

  test('handles all bearish', () => {
    const data = {
      messages: [
        { entities: { sentiment: { basic: 'Bearish' } } },
        { entities: { sentiment: { basic: 'Bearish' } } },
      ],
    };
    const result = parseStockTwitsSentiment(data);
    expect(result.bullPct).toBe(0);
    expect(result.bearPct).toBe(100);
  });
});
