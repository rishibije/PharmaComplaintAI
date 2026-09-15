import { useSelector } from "react-redux";

function RiskPanel() {
  const { risk, completeness } = useSelector(
    (state) => state.complaint
  );

  if (!risk && !completeness) {
    return (
      <div className="card">
        <h2>AI Copilot</h2>
        <p>Risk assessment will appear after complaint analysis.</p>
      </div>
    );
  }

  return (
    <div className="card">
      <h2>AI Copilot</h2>

      {risk && (
        <>
          <div className="risk-box">
            <span>Risk Level</span>
            <strong>{risk.risk_level || "N/A"}</strong>
          </div>

          <div className="info-row">
            <span>Severity</span>
            <strong>{risk.severity || "N/A"}</strong>
          </div>

          <div className="info-row">
            <span>Priority</span>
            <strong>{risk.priority || "N/A"}</strong>
          </div>

          <div className="reason-box">
            <h3>AI Assessment</h3>
            <p>{risk.reason || "No reason provided."}</p>
          </div>
        </>
      )}

      {completeness && (
        <div className="completeness-box">
          <h3>Complaint Completeness</h3>

          <p>
            Score:{" "}
            <strong>
              {completeness.score ?? 0}%
            </strong>
          </p>

          <p>
            Status:{" "}
            <strong>
              {completeness.is_sufficient ? "Complete" : "Incomplete"}
            </strong>
          </p>

          {completeness.missing &&
            completeness.missing.length > 0 && (
              <div>
                <p>Missing Fields:</p>

                <ul>
                  {completeness.missing.map((field, index) => (
                    <li key={index}>{field}</li>
                  ))}
                </ul>
              </div>
            )}
        </div>
      )}
    </div>
  );
}

export default RiskPanel;