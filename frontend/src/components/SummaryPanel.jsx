import { useSelector } from "react-redux";

function formatInlineText(text) {
  const parts = text.split(/(\*\*.*?\*\*)/g);

  return parts.map((part, index) => {
    if (part.startsWith("**") && part.endsWith("**")) {
      return (
        <strong key={index}>
          {part.slice(2, -2)}
        </strong>
      );
    }

    return <span key={index}>{part}</span>;
  });
}

function SummaryPanel() {
  const { summary } = useSelector(
    (state) => state.complaint
  );

  if (!summary) {
    return null;
  }

  const lines = summary
    .split("\n")
    .map((line) => line.trim())
    .filter(Boolean);

  return (
    <div className="card">
      <h2>AI Summary</h2>

      <div className="summary-box">
        {lines.map((line, index) => {
          // Heading
          if (
            line.includes("Complaint Summary") &&
            !line.startsWith("-")
          ) {
            return (
              <h3 className="summary-heading" key={index}>
                Complaint Summary
              </h3>
            );
          }

          // Bullet point
          if (line.startsWith("-")) {
            const content = line.replace(/^-\s*/, "");

            return (
              <div className="summary-item" key={index}>
                <span className="summary-bullet">•</span>
                <span>{formatInlineText(content)}</span>
              </div>
            );
          }

          // Numbered recommendation
          const numberedMatch = line.match(
            /^(\d+)\.\s*(.*)$/
          );

          if (numberedMatch) {
            return (
              <div className="summary-item" key={index}>
                <span className="summary-number">
                  {numberedMatch[1]}.
                </span>
                <span>
                  {formatInlineText(numberedMatch[2])}
                </span>
              </div>
            );
          }

          return (
            <p key={index}>
              {formatInlineText(line)}
            </p>
          );
        })}
      </div>
    </div>
  );
}

export default SummaryPanel;