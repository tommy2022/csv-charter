
export const COLORS = [
  '#3b82f6', // blue
  '#10b981', // green
  '#ef4444', // red
  '#f59e0b', // amber
  '#8b5cf6', // violet
  '#ec4899', // pink
  '#6366f1', // indigo
  '#22d3ee', // cyan
  '#f472b6', // light pink
  '#a3e635', // lime
  '#f87171', // light red
  '#fb7185', // rose
  '#fbbf24', // yellow
  '#34d399', // teal
  '#818cf8', // light indigo
  '#c084fc', // purple
  '#facc15', // gold
  '#4ade80', // light green
  '#60a5fa', // light blue
  '#a78bfa', // lavender
  '#fcd34d', // light gold
  '#fde68a', // pale yellow
  '#fca5a5', // pale red
  '#6ee7b7', // mint
  '#93c5fd', // sky blue
  '#fdba74', // orange
  '#d1fae5', // pale green
  '#f9a8d4', // pale pink
  '#bbf7d0', // pale teal
  '#fef08a', // pale gold
];

export function getColor(index) {
  return COLORS[index % COLORS.length];
}
