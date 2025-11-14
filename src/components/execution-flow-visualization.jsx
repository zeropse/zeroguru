function ExecutionFlowVisualization({ steps }) {
  const typeColors = {
    assignment: "#3b82f6", // blue
    condition: "#f59e0b", // amber
    loop: "#10b981", // emerald
    function_call: "#8b5cf6", // violet
    return: "#ef4444", // red
    print: "#06b6d4", // cyan
    other: "#6b7280", // gray
  };

  const getTypeIcon = (type) => {
    switch (type) {
      case "assignment":
        return "→";
      case "condition":
        return "?";
      case "loop":
        return "⟲";
      case "function_call":
        return "⚡";
      case "return":
        return "↩";
      case "print":
        return "📄";
      default:
        return "•";
    }
  };

  const wrapText = (text, maxLength) => {
    const words = text.split(" ");
    const lines = [];
    let currentLine = "";
    for (const word of words) {
      if ((currentLine + " " + word).length <= maxLength) {
        currentLine += (currentLine ? " " : "") + word;
      } else {
        if (currentLine) lines.push(currentLine);
        currentLine = word;
      }
    }
    if (currentLine) lines.push(currentLine);
    return lines;
  };

  const nodeWidth = 320;
  const nodeHeight = 100;
  const containerHeight = Math.max(500, steps.length * (nodeHeight + 60) + 40);

  return (
    <svg
      width="100%"
      height={containerHeight}
      viewBox={`0 0 400 ${containerHeight}`}
      className="w-full"
      style={{ backgroundColor: "var(--muted)" }}
    >
      {/* Draw connecting lines */}
      {steps.slice(0, -1).map((_, index) => (
        <g key={`line-${index}`}>
          {/* Vertical line with arrow */}
          <line
            x1="200"
            y1={70 + index * (nodeHeight + 60)}
            x2="200"
            y2={90 + (index + 1) * (nodeHeight + 60)}
            stroke="var(--border)"
            strokeWidth="3"
            strokeDasharray="8,4"
          />
          {/* Arrow head */}
          <polygon
            points={`200,${95 + (index + 1) * (nodeHeight + 60)} 195,${
              85 + (index + 1) * (nodeHeight + 60)
            } 205,${85 + (index + 1) * (nodeHeight + 60)}`}
            fill="var(--muted-foreground)"
          />
        </g>
      ))}

      {/* Draw nodes */}
      {steps.map((step, index) => {
        const yPos = 20 + index * (nodeHeight + 60);
        const color = typeColors[step.type] || typeColors.other;
        const lines = wrapText(step.description, 35);

        return (
          <g key={`step-${index}`}>
            {/* Node background */}
            <rect
              x="40"
              y={yPos}
              width={nodeWidth}
              height={nodeHeight}
              rx="12"
              fill="var(--card)"
              stroke={color}
              strokeWidth="2"
              filter="drop-shadow(0 4px 6px rgba(0, 0, 0, 0.1))"
            />

            {/* Type badge */}
            <circle cx="70" cy={yPos + 25} r="18" fill={color} opacity="0.9" />
            <text
              x="70"
              y={yPos + 32}
              textAnchor="middle"
              className="text-lg font-bold"
              fill="white"
            >
              {getTypeIcon(step.type)}
            </text>

            {/* Line number */}
            <text
              x="70"
              y={yPos + 60}
              textAnchor="middle"
              className="text-xs font-semibold"
              fill="var(--muted-foreground)"
            >
              Line {step.line}
            </text>

            {/* Description text */}
            {lines.slice(0, 3).map((line, lineIndex) => (
              <text
                key={lineIndex}
                x="120"
                y={yPos + 30 + lineIndex * 18}
                className="text-sm font-medium"
                fill="var(--foreground)"
              >
                {line}
              </text>
            ))}
            {lines.length > 3 && (
              <text
                x="120"
                y={yPos + 30 + 3 * 18}
                className="text-sm font-medium"
                fill="var(--muted-foreground)"
              >
                ...
              </text>
            )}
          </g>
        );
      })}
    </svg>
  );
}

export default ExecutionFlowVisualization;
