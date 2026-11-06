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
}

export function RadarChart({ stats }: RadarChartProps) {
  const size = 260;
  const center = size / 2;
  const radius = 80;

  const axes = [
    { label: 'SPONTAN', key: 'impulse' },
    { label: 'DISIPLIN', key: 'discipline' },
    { label: 'MEMORI', key: 'experience' },
    { label: 'SOSIAL', key: 'social' },
    { label: 'PRAKTIS', key: 'practical' },
    { label: 'RESILIENSI', key: 'resilience' },
  ];

  const angleStep = (Math.PI * 2) / axes.length;

  const points = axes.map((axis, i) => {
    const angle = i * angleStep - Math.PI / 2;
    const value = (stats[axis.key as keyof typeof stats] || 3) / 5;
    const r = radius * value;
    const x = center + r * Math.cos(angle);
    const y = center + r * Math.sin(angle);
    return `${x},${y}`;
  }).join(' ');

  const rings = [0.25, 0.5, 0.75, 1];

  return (
    <div className="w-full flex flex-col items-center justify-center py-2">
      <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} className="overflow-visible">
        {rings.map((ring, idx) => {
          const ringPoints = axes.map((_, i) => {
            const angle = i * angleStep - Math.PI / 2;
            const r = radius * ring;
            const x = center + r * Math.cos(angle);
            const y = center + r * Math.sin(angle);
            return `${x},${y}`;
          }).join(' ');

          return (
            <polygon
              key={idx}
              points={ringPoints}
              fill="none"
              stroke="#E2E8F0"
              strokeWidth="1.5"
            />
          );
        })}

        {axes.map((_, i) => {
          const angle = i * angleStep - Math.PI / 2;
          const x = center + radius * Math.cos(angle);
          const y = center + radius * Math.sin(angle);
          return (
            <line
              key={i}
              x1={center}
              y1={center}
              x2={x}
              y2={y}
              stroke="#CBD5E1"
              strokeWidth="1"
              strokeDasharray="2 2"
            />
          );
        })}

        <polygon
          points={points}
          fill="rgba(245, 158, 11, 0.25)"
          stroke="#2D2424"
          strokeWidth="3"
        />

        {axes.map((axis, i) => {
          const angle = i * angleStep - Math.PI / 2;
          const labelDist = radius + 24;
          const lx = center + labelDist * Math.cos(angle);
          const ly = center + labelDist * Math.sin(angle);

          return (
            <text
              key={i}
              x={lx}
              y={ly + 4}
              fontSize="10"
              fontWeight="900"
              fill="#2D2424"
              textAnchor="middle"
              className="tracking-wider uppercase select-none font-mono"
            >
              {axis.label}
            </text>
          );
        })}
      </svg>
    </div>
  );
}
