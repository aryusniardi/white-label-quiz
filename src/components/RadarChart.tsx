import React from 'react';

interface RadarChartProps {
  stats: {
    actionOriented: number;
    problemSolving: number;
    innovation: number;
    teamwork: number;
    influence: number;
    attentionToDetail: number;
  };
}

export function RadarChart({ stats }: RadarChartProps) {
  // 6 dimensions: angles 0, 60, 120, 180, 240, 300 degrees
  // center (110, 110), radius max 75
  const center = 110;
  const maxRadius = 70;

  const labels = [
    { name: 'Action', key: 'actionOriented' },
    { name: 'Solving', key: 'problemSolving' },
    { name: 'Innovation', key: 'innovation' },
    { name: 'Teamwork', key: 'teamwork' },
    { name: 'Influence', key: 'influence' },
    { name: 'Detail', key: 'attentionToDetail' },
  ];

  const getCoordinates = (value: number, index: number) => {
    const angle = (Math.PI / 3) * index - Math.PI / 2; // start from top
    const radius = (value / 5) * maxRadius;
    const x = center + radius * Math.cos(angle);
    const y = center + radius * Math.sin(angle);
    return { x, y };
  };

  const getLabelCoordinates = (index: number) => {
    const angle = (Math.PI / 3) * index - Math.PI / 2;
    const radius = maxRadius + 18;
    const x = center + radius * Math.cos(angle);
    const y = center + radius * Math.sin(angle);
    return { x, y };
  };

  // Polygon points
  const points = labels
    .map((l, i) => {
      const val = stats[l.key as keyof typeof stats] || 3;
      const { x, y } = getCoordinates(val, i);
      return `${x},${y}`;
    })
    .join(' ');

  // Grid levels (1 to 5)
  const gridLevels = [1, 2, 3, 4, 5];

  return (
    <div className="flex flex-col items-center justify-center p-2 bg-[#FFFDF7] rounded-xl border-2 border-[#2D2424] shadow-[2px_2px_0px_#2D2424]">
      <div className="text-[10px] font-black uppercase tracking-wider text-[#2D2424] mb-1">
        Radar 6 Dimensi Kerja
      </div>
      <svg width="220" height="220" viewBox="0 0 220 220" className="overflow-visible">
        {/* Background grids */}
        {gridLevels.map((level) => {
          const gridPoints = labels
            .map((_, i) => {
              const { x, y } = getCoordinates(level, i);
              return `${x},${y}`;
            })
            .join(' ');
          return (
            <polygon
              key={level}
              points={gridPoints}
              fill={level === 5 ? '#FFF9E6' : 'none'}
              stroke="#E2E8F0"
              strokeWidth="1.5"
            />
          );
        })}

        {/* Spokes */}
        {labels.map((_, i) => {
          const { x, y } = getCoordinates(5, i);
          return <line key={i} x1={center} y1={center} x2={x} y2={y} stroke="#CBD5E0" strokeWidth="1" strokeDasharray="2,2" />;
        })}

        {/* User stats polygon */}
        <polygon
          points={points}
          fill="rgba(246, 173, 85, 0.45)"
          stroke="#DD6B20"
          strokeWidth="3"
        />

        {/* Data points */}
        {labels.map((l, i) => {
          const val = stats[l.key as keyof typeof stats] || 3;
          const { x, y } = getCoordinates(val, i);
          return <circle key={i} cx={x} cy={y} r="4" fill="#C05621" stroke="#FFFFFF" strokeWidth="2" />;
        })}

        {/* Labels */}
        {labels.map((l, i) => {
          const { x, y } = getLabelCoordinates(i);
          return (
            <text
              key={i}
              x={x}
              y={y + 3}
              fontSize="9"
              fontWeight="800"
              fill="#2D2424"
              textAnchor="middle"
              className="font-mono"
            >
              {l.name}
            </text>
          );
        })}
      </svg>
    </div>
  );
}
