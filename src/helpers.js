/**
 * Color mapping and formatting helpers extracted from index.html.
 * These are pure functions with no DOM dependencies.
 */

/** Maps a 0-100 fear/greed index value to a hex color. */
function fearColor(v) {
  return v <= 10 ? '#ef4444'
    : v <= 25 ? '#f97316'
    : v <= 40 ? '#f59e0b'
    : '#22c55e';
}

/** Maps a VIX level to a hex color. */
function vixColor(v) {
  return v >= 60 ? '#ef4444'
    : v >= 35 ? '#f97316'
    : v >= 25 ? '#f59e0b'
    : '#22c55e';
}

/** Maps a headline tone string to a hex color. */
function toneColor(t) {
  return t === 'apocalyptic' ? '#ef4444'
    : t === 'extreme fear' ? '#f97316'
    : t === 'severe fear' ? '#f59e0b'
    : t === 'cautious' ? '#94a3b8'
    : '#22c55e';
}

/** Formats a percentage change value as "+X.XX%" or "-X.XX%". Returns '' for null/undefined. */
function fmtChg(v) {
  return v !== null && v !== undefined
    ? (v > 0 ? '+' : '') + v.toFixed(2) + '%'
    : '';
}

/** Returns a color string for a price change: green for positive, red for negative, gray for zero. */
function chgCol(v) {
  return v > 0 ? '#22c55e' : v < 0 ? '#ef4444' : '#94a3b8';
}

/**
 * Generates an SVG sparkline string from a data array.
 * @param {number[]} data - Array of numeric values
 * @param {string} color - Base color for the line
 * @param {number} w - SVG width (default 70)
 * @param {number} h - SVG height (default 22)
 * @returns {string} SVG markup string, or '' if data is insufficient
 */
function spark(data, color, w = 70, h = 22) {
  if (!data || data.length < 2) return '';
  const min = Math.min(...data);
  const max = Math.max(...data);
  const range = max - min || 1;
  const pts = data.map((v, i) =>
    `${(i / (data.length - 1)) * w},${h - ((v - min) / range) * h}`
  ).join(' ');
  const lastY = h - ((data[data.length - 1] - min) / range) * h;
  const trend = data[data.length - 1] >= data[0] ? color : '#ef4444';
  return `<svg width="${w}" height="${h}" viewBox="0 0 ${w} ${h}" style="display:block;margin-top:4px;opacity:0.7">
      <polyline points="${pts}" fill="none" stroke="${trend}" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
      <circle cx="${w}" cy="${lastY}" r="2" fill="${trend}"/>
    </svg>`;
}

module.exports = { fearColor, vixColor, toneColor, fmtChg, chgCol, spark };
