import { useId } from 'react';

// Lightweight SVG charts. Each one is an image with a text title and description, and the
// simulator always shows the same numbers in a table next to it.

function Figure({ width, height, title, desc, children }) {
  const id = useId();
  return (
    <svg
      viewBox={`0 0 ${width} ${height}`}
      role="img"
      aria-labelledby={`${id}-title ${id}-desc`}
      className="h-auto w-full"
    >
      <title id={`${id}-title`}>{title}</title>
      <desc id={`${id}-desc`}>{desc}</desc>
      {children}
    </svg>
  );
}

const scale = ([d0, d1], [r0, r1]) => (value) => r0 + ((value - d0) / (d1 - d0)) * (r1 - r0);

function YAxis({ ticks, y, left, right, label }) {
  return (
    <g>
      {ticks.map((tick) => (
        <g key={tick}>
          <line x1={left} x2={right} y1={y(tick)} y2={y(tick)} className="stroke-slate-200" />
          <text x={left - 6} y={y(tick) + 3.5} textAnchor="end" className="fill-slate-600 text-[10px]">
            {tick}
          </text>
        </g>
      ))}
      {label && (
        <text
          transform={`translate(11 ${(y(ticks[0]) + y(ticks[ticks.length - 1])) / 2}) rotate(-90)`}
          textAnchor="middle"
          className="fill-slate-700 text-[10px] font-semibold"
        >
          {label}
        </text>
      )}
    </g>
  );
}

/** Individual scores of two groups, with each group's mean and 95 % confidence interval. */
export function StripPlot({ groups, domain = [0, 100], yLabel, title, desc }) {
  const width = 360;
  const height = 250;
  const margin = { left: 44, right: 12, top: 12, bottom: 42 };
  const y = scale(domain, [height - margin.bottom, margin.top]);
  const plotWidth = width - margin.left - margin.right;
  const centers = groups.map((_, index) => margin.left + plotWidth * (index === 0 ? 0.28 : 0.72));
  const colors = ['fill-slate-500', 'fill-indigo-600'];

  return (
    <Figure width={width} height={height} title={title} desc={desc}>
      <YAxis
        ticks={[0, 25, 50, 75, 100]}
        y={y}
        left={margin.left}
        right={width - margin.right}
        label={yLabel}
      />
      {groups.map((group, index) => (
        <g key={group.label}>
          {group.values.map((value, i) => (
            <circle
              key={i}
              cx={centers[index] + (((i * 37) % 23) - 11) * 2.4}
              cy={y(value)}
              r="3.4"
              className={`${colors[index]} opacity-60`}
            />
          ))}
          <line
            x1={centers[index]}
            x2={centers[index]}
            y1={y(group.ci[0])}
            y2={y(group.ci[1])}
            className="stroke-slate-900"
            strokeWidth="2"
          />
          {[group.ci[0], group.ci[1]].map((value) => (
            <line
              key={value}
              x1={centers[index] - 8}
              x2={centers[index] + 8}
              y1={y(value)}
              y2={y(value)}
              className="stroke-slate-900"
              strokeWidth="2"
            />
          ))}
          <line
            x1={centers[index] - 30}
            x2={centers[index] + 30}
            y1={y(group.mean)}
            y2={y(group.mean)}
            className="stroke-slate-900"
            strokeWidth="3.5"
          />
          <text
            x={centers[index]}
            y={height - margin.bottom + 18}
            textAnchor="middle"
            className="fill-slate-800 text-[10.5px] font-semibold"
          >
            {group.label}
          </text>
        </g>
      ))}
    </Figure>
  );
}

/** Scatter plot with the least-squares line. */
export function ScatterPlot({ x, y: values, slope, intercept, xDomain, yDomain, xLabel, yLabel, title, desc }) {
  const width = 360;
  const height = 260;
  const margin = { left: 44, right: 12, top: 12, bottom: 44 };
  const sx = scale(xDomain, [margin.left, width - margin.right]);
  const sy = scale(yDomain, [height - margin.bottom, margin.top]);
  const lineY = (value) => Math.min(yDomain[1], Math.max(yDomain[0], intercept + slope * value));
  const xTicks = [0, 30, 60, 90, 120, 150].filter((tick) => tick <= xDomain[1]);

  return (
    <Figure width={width} height={height} title={title} desc={desc}>
      <YAxis
        ticks={[0, 2, 4, 6, 8, 10]}
        y={sy}
        left={margin.left}
        right={width - margin.right}
        label={yLabel}
      />
      {xTicks.map((tick) => (
        <text
          key={tick}
          x={sx(tick)}
          y={height - margin.bottom + 14}
          textAnchor="middle"
          className="fill-slate-600 text-[10px]"
        >
          {tick}
        </text>
      ))}
      <text
        x={(margin.left + width - margin.right) / 2}
        y={height - 8}
        textAnchor="middle"
        className="fill-slate-700 text-[10px] font-semibold"
      >
        {xLabel}
      </text>
      {x.map((value, i) => (
        <circle key={i} cx={sx(value)} cy={sy(values[i])} r="3.2" className="fill-indigo-600 opacity-55" />
      ))}
      <line
        x1={sx(xDomain[0])}
        y1={sy(lineY(xDomain[0]))}
        x2={sx(xDomain[1])}
        y2={sy(lineY(xDomain[1]))}
        className="stroke-rose-700"
        strokeWidth="2.5"
      />
    </Figure>
  );
}

/** Distribution of the estimates from many repeated studies. */
export function Histogram({ values, marker, bins = 18, title, desc, markerLabel }) {
  const width = 360;
  const height = 170;
  const margin = { left: 16, right: 16, top: 22, bottom: 30 };
  const low = Math.min(...values, marker, 0);
  const high = Math.max(...values, marker, 0);
  const pad = (high - low) * 0.05 || 1;
  const domain = [low - pad, high + pad];
  const binWidth = (domain[1] - domain[0]) / bins;
  const counts = Array.from({ length: bins }, () => 0);
  values.forEach((value) => {
    counts[Math.min(bins - 1, Math.floor((value - domain[0]) / binWidth))] += 1;
  });
  const sx = scale(domain, [margin.left, width - margin.right]);
  const sy = scale([0, Math.max(...counts)], [height - margin.bottom, margin.top]);
  const format = (value) => (Math.abs(domain[1] - domain[0]) < 3 ? value.toFixed(2) : value.toFixed(0));

  return (
    <Figure width={width} height={height} title={title} desc={desc}>
      {counts.map((count, i) => (
        <rect
          key={i}
          x={sx(domain[0] + i * binWidth) + 1}
          y={sy(count)}
          width={Math.max(0, sx(domain[0] + binWidth) - sx(domain[0]) - 2)}
          height={sy(0) - sy(count)}
          className="fill-indigo-300"
        />
      ))}
      <line x1={sx(0)} x2={sx(0)} y1={margin.top - 6} y2={sy(0)} className="stroke-slate-500" strokeDasharray="3 3" />
      <line x1={sx(marker)} x2={sx(marker)} y1={margin.top - 6} y2={sy(0)} className="stroke-emerald-700" strokeWidth="2.5" />
      <text x={sx(marker)} y={margin.top - 9} textAnchor="middle" className="fill-emerald-800 text-[10px] font-semibold">
        {markerLabel}
      </text>
      <line x1={margin.left} x2={width - margin.right} y1={sy(0)} y2={sy(0)} className="stroke-slate-400" />
      {[domain[0] + pad, 0, domain[1] - pad].map((tick, i) => (
        <text key={i} x={sx(tick)} y={height - 12} textAnchor="middle" className="fill-slate-600 text-[10px]">
          {format(tick)}
        </text>
      ))}
    </Figure>
  );
}
