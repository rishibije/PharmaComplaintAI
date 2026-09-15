import { useSelector } from "react-redux";
import { CheckCircle2, ShieldCheck } from "lucide-react";

function CAPAPanel() {
  const { capa } = useSelector((state) => state.complaint);

  if (!capa) {
    return null;
  }

  return (
    <div className="card capa-card">
      <div className="capa-header">
        <div>
          <h2>AI CAPA Recommendations</h2>
          <p>
            AI-generated corrective and preventive actions
          </p>
        </div>

        <div className="capa-badge">
          <ShieldCheck size={18} />
          AI Recommended
        </div>
      </div>

      <div className="capa-section">
        <div className="capa-section-title">
          <CheckCircle2 size={20} />
          <h3>Corrective Actions</h3>
        </div>

        <ol className="capa-list">
          {capa.corrective_actions?.map((action, index) => (
            <li key={index}>
              {action}
            </li>
          ))}
        </ol>
      </div>

      <div className="capa-section">
        <div className="capa-section-title">
          <ShieldCheck size={20} />
          <h3>Preventive Actions</h3>
        </div>

        <ol className="capa-list">
          {capa.preventive_actions?.map((action, index) => (
            <li key={index}>
              {action}
            </li>
          ))}
        </ol>
      </div>

      {capa.owners?.length > 0 && (
        <div className="capa-meta">
          <strong>Owners</strong>
          <p>
            {capa.owners.join(", ")}
          </p>
        </div>
      )}

      {capa.target_completion && (
        <div className="capa-meta">
          <strong>Target Completion</strong>
          <p>{capa.target_completion}</p>
        </div>
      )}
    </div>
  );
}

export default CAPAPanel;
