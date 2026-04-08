const { fearColor, vixColor, toneColor, fmtChg, chgCol, spark } = require('../src/helpers');

describe('fearColor', () => {
  test('returns red for extreme fear (≤10)', () => {
    expect(fearColor(0)).toBe('#ef4444');
    expect(fearColor(10)).toBe('#ef4444');
  });

  test('returns orange for fear (11-25)', () => {
    expect(fearColor(11)).toBe('#f97316');
    expect(fearColor(25)).toBe('#f97316');
  });

  test('returns amber for mild fear (26-40)', () => {
    expect(fearColor(26)).toBe('#f59e0b');
    expect(fearColor(40)).toBe('#f59e0b');
  });

  test('returns green for greed (>40)', () => {
    expect(fearColor(41)).toBe('#22c55e');
    expect(fearColor(100)).toBe('#22c55e');
  });

  test('boundary: exactly 10 vs 11', () => {
    expect(fearColor(10)).toBe('#ef4444');
    expect(fearColor(11)).toBe('#f97316');
  });

  test('boundary: exactly 25 vs 26', () => {
    expect(fearColor(25)).toBe('#f97316');
    expect(fearColor(26)).toBe('#f59e0b');
  });
});

describe('vixColor', () => {
  test('returns red for extreme VIX (≥60)', () => {
    expect(vixColor(60)).toBe('#ef4444');
    expect(vixColor(80)).toBe('#ef4444');
  });

  test('returns orange for high VIX (35-59)', () => {
    expect(vixColor(35)).toBe('#f97316');
    expect(vixColor(59)).toBe('#f97316');
  });

  test('returns amber for elevated VIX (25-34)', () => {
    expect(vixColor(25)).toBe('#f59e0b');
    expect(vixColor(34)).toBe('#f59e0b');
  });

  test('returns green for low VIX (<25)', () => {
    expect(vixColor(15)).toBe('#22c55e');
    expect(vixColor(24)).toBe('#22c55e');
  });
});

describe('toneColor', () => {
  test('maps all known tones', () => {
    expect(toneColor('apocalyptic')).toBe('#ef4444');
    expect(toneColor('extreme fear')).toBe('#f97316');
    expect(toneColor('severe fear')).toBe('#f59e0b');
    expect(toneColor('cautious')).toBe('#94a3b8');
  });

  test('returns green for unknown tones', () => {
    expect(toneColor('bullish')).toBe('#22c55e');
    expect(toneColor('measured')).toBe('#22c55e');
    expect(toneColor('')).toBe('#22c55e');
  });
});

describe('fmtChg', () => {
  test('formats positive changes with + prefix', () => {
    expect(fmtChg(2.5)).toBe('+2.50%');
    expect(fmtChg(0.01)).toBe('+0.01%');
  });

  test('formats negative changes', () => {
    expect(fmtChg(-3.14)).toBe('-3.14%');
  });

  test('formats zero', () => {
    expect(fmtChg(0)).toBe('0.00%');
  });

  test('returns empty string for null/undefined', () => {
    expect(fmtChg(null)).toBe('');
    expect(fmtChg(undefined)).toBe('');
  });
});

describe('chgCol', () => {
  test('returns green for positive', () => {
    expect(chgCol(1)).toBe('#22c55e');
    expect(chgCol(0.001)).toBe('#22c55e');
  });

  test('returns red for negative', () => {
    expect(chgCol(-1)).toBe('#ef4444');
    expect(chgCol(-0.001)).toBe('#ef4444');
  });

  test('returns gray for zero', () => {
    expect(chgCol(0)).toBe('#94a3b8');
  });
});

describe('spark', () => {
  test('returns empty string for null/undefined data', () => {
    expect(spark(null, '#fff')).toBe('');
    expect(spark(undefined, '#fff')).toBe('');
  });

  test('returns empty string for single data point', () => {
    expect(spark([42], '#fff')).toBe('');
  });

  test('returns SVG string for valid data', () => {
    const result = spark([1, 2, 3], '#22c55e');
    expect(result).toContain('<svg');
    expect(result).toContain('polyline');
    expect(result).toContain('circle');
  });

  test('uses provided color for uptrend', () => {
    const result = spark([1, 2, 3], '#22c55e');
    expect(result).toContain('#22c55e');
  });

  test('uses red for downtrend', () => {
    const result = spark([3, 2, 1], '#22c55e');
    expect(result).toContain('#ef4444');
  });

  test('respects custom width and height', () => {
    const result = spark([1, 2], '#fff', 100, 50);
    expect(result).toContain('width="100"');
    expect(result).toContain('height="50"');
  });

  test('handles flat data (all same value)', () => {
    const result = spark([5, 5, 5], '#22c55e');
    expect(result).toContain('<svg');
    // Should not produce NaN in coordinates
    expect(result).not.toContain('NaN');
  });
});
