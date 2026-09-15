import { useSelector } from "react-redux";
import {
  Search,
  AlertCircle,
  ClipboardCheck,
  ShieldCheck,
} from "lucide-react";

function RootCausePanel() {
  const { root_cause } = useSelector(
    (state) => state.complaint
  );

  if (!root_cause) {
    return null;
  }

  return (
    <div className="card root-cause-card">
      <div className="root-cause-header">
        <div>
          <h2>AI Root Cause Analysis</h2>
          <p>
            Potential causes and investigation areas identified by AI
          </p>
        </div>

        <div className="root-cause-badge">
          <Search size={17} />
          AI Analysis
        </div>
      </div>

      <div className="root-cause-section">
        <div className="root-cause-section-title">
          <AlertCircle size={20} />
          <h3>Potential Root Causes</h3>
        </div>

        <p className="root-cause-note">
          These are investigation hypotheses and should be verified by the
          Quality team.
        </p>

        <ol className="root-cause-list">
          {root_cause.potential_root_causes?.map(
            (cause, index) => (
              <li key={index}>
                {cause}
              </li>
            )
          )}
        </ol>
      </div>

      <div className="root-cause-section">
        <div className="root-cause-section-title">
          <ClipboardCheck size={20} />
          <h3>Investigation Areas</h3>
        </div>

        <ul className="investigation-list">
          {root_cause.investigation_areas?.map(
            (area, index) => (
              <li key={index}>
                {area}
              </li>
            )
          )}
        </ul>
      </div>

      <div className="root-cause-footer">
        <ShieldCheck size={17} />
        <span>
          AI recommendations are intended to support investigation and
          do not represent confirmed root causes.
        </span>
      </div>
    </div>
  );
}

export default RootCausePanel;
