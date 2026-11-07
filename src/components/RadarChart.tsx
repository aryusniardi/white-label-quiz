import React from 'react';

interface RadarChartProps {
  stats: {
    impulse: number;
    discipline: number;
    experience: number;
    social: number;
    practical: number;
    resilience: number;
  };
  accentColor?: string;
}

export function RadarChart({ stats }: RadarChartProps) {
  const size = 260;
  const center = size / 2;
  const radius = 75;

  const traits = [
    { key: 'impulse', label: 'OTONOMI' },
    { key: 'discipline', label: 'BATASAN' },
    { key: 'experience', label: 'AI SKILL' },
    { key: 'social', label: 'SOSIAL' },
    { key: 'practical', label: 'STRATEGIS' },
    { key: 'resilience', label: 'RESILIENSI' },
  ];

  const getCoordinates = (index: number, value: number, maxVal = 5) => {
    const angle = (Math.PI / 3) * index - Math.PI / 2;
    // Map value 1-5 to a healthy visible radius between 25% and 95% of radius
    const normalized = Math.max(1, Math.min(value, 5));
    const r = (normalized / 5) * radius;
    // Step to nearest 2 pixels for retro pixel stepped look
    const x = Math.round((center + r * Math.cos(angle)) / 2) * 2;
    const y = Math.round((center + r * Math.sin(angle)) / 2) * 2;
    return { x, y };
  };

  const rings = [0.2, 0.4, 0.6, 0.8, 1];

  const dataPoints = traits.map((t, i) => {
    const val = stats[t.key as keyof typeof stats] || 3;
    return getCoordinates(i, val);
  });

  const polygonPoints = dataPoints.map((p) => `${p.x},${p.y}`).join(' ');

  return (
    <div className="flex flex-col items-center justify-center p-2 bg-[#FFFDF7] border-2 border-[#272e27]">
      <svg
        width={size}
        height={size}
        className="overflow-visible"
        style={{ shapeRendering: 'crispEdges' }}
      >
        {/* Background pixel grid lines */}
        {rings.map((ring, ringIdx) => {
          const ringPoints = traits
            .map((_, i) => {
              const { x, y } = getCoordinates(i, ring * 5, 5);
              return `${x},${y}`;
            })
            .join(' ');
          return (
            <polygon
              key={ringIdx}
              points={ringPoints}
              fill={ringIdx === 4 ? '#F4EFE6' : 'none'}
              stroke="#D8D0C5"
              strokeWidth="2"
            />
          );
        })}

        {/* Axes lines with crisp edges */}
        {traits.map((_, i) => {
          const { x, y } = getCoordinates(i, 5, 5);
          return (
            <line
              key={i}
              x1={center}
              y1={center}
              x2={x}
              y2={y}
              stroke="#D8D0C5"
              strokeWidth="2"
            />
          );
        })}

        {/* Data polygon with pixel green stepped fill */}
        <polygon
          points={polygonPoints}
          fill="rgba(19, 171, 103, 0.45)"
          stroke="#13ab67"
          strokeWidth="3.5"
        />

        {/* Pixel Vertex markers (square boxes instead of smooth dots) */}
        {dataPoints.map((p, i) => (
          <rect
            key={i}
            x={p.x - 4}
            y={p.y - 4}
            width={8}
            height={8}
            fill="#13ab67"
            stroke="#272e27"
            strokeWidth="2"
          />
        ))}

        {/* Pixel Labels */}
        {traits.map((t, i) => {
          const angle = (Math.PI / 3) * i - Math.PI / 2;
          const labelDist = radius + 22;
          const lx = center + labelDist * Math.cos(angle);
          const ly = center + labelDist * Math.sin(angle);

          return (
            <text
              key={i}
              x={lx}
              y={ly}
              textAnchor="middle"
              dominantBaseline="middle"
              fill="#272e27"
              className="font-pixel text-[8px]"
            >
              {t.label}
            </text>
          );
        })}
      </svg>
    </div>
  );
}
