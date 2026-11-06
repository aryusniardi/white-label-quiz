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
  const size = 180;
  const center = size / 2;
  const radius = 62;

  // 6 dimensions
  const labels = [
    { label: 'SPONTAN', key: 'impulse' },
    { label: 'DISIPLIN', key: 'discipline' },
    { label: 'MEMORI', key: 'experience' },
    { label: 'SOSIAL', key: 'social' },
    { label: 'PRAKTIS', key: 'practical' },
    { label: 'RESILIENSI', key: 'resilience' },
  ];

  const angleStep = (Math.PI * 2) / labels.length;

  const points = labels.map((dim, i) => {
    const angle = i * angleStep - Math.PI / 2;
    const value = (stats[dim.key as keyof typeof stats] || 50) / 100;
    const r = radius * value;
    const x = center + r * Math.cos(angle);
    const y = center + r * Math.sin(angle);
    return { x, y };
  });

  const polygonPoints = points.map((p) => `${p.x},${p.y}`).join(' ');

  return (
    <div className="flex flex-col items-center justify-center">
      <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} className="overflow-visible">
        {/* Background Grids */}
        {[0.33, 0.66, 1].map((scale, idx) => {
          const gridPoints = labels
            .map((_, i) => {
              const angle = i * angleStep - Math.PI / 2;
              const r = radius * scale;
              return `${center + r * Math.cos(angle)},${center + r * Math.sin(angle)}`;
            })
            .join(' ');
          return (
            <polygon
              key={idx}
              points={gridPoints}
              fill={idx === 2 ? '#FAEDCD' : 'transparent'}
              stroke="#D4A373"
              strokeWidth="1.5"
              strokeDasharray={idx < 2 ? '2,2' : 'none'}
            />
          );
        })}

        {/* Spokes */}
        {labels.map((_, i) => {
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
              stroke="#D4A373"
              strokeWidth="1"
            />
          );
        })}

        {/* Data polygon with pastel green & hard stroke */}
        <polygon
          points={polygonPoints}
          fill="rgba(19, 171, 103, 0.45)"
          stroke="#13ab67"
          strokeWidth="3"
        />

        {/* Data dots */}
        {points.map((p, i) => (
          <circle key={i} cx={p.x} cy={p.y} r="3.5" fill="#272e27" />
        ))}

        {/* Labels */}
        {labels.map((dim, i) => {
          const angle = i * angleStep - Math.PI / 2;
          const labelRadius = radius + 18;
          const lx = center + labelRadius * Math.cos(angle);
          const ly = center + labelRadius * Math.sin(angle);
          return (
            <text
              key={i}
              x={lx}
              y={ly + 3}
              textAnchor="middle"
              className="text-[8px] font-black fill-[#272e27] tracking-wider font-mono"
            >
              {dim.label}
            </text>
          );
        })}
      </svg>
    </div>
  );
}
