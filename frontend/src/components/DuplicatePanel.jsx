import { useSelector } from "react-redux";
import {
  CopyCheck,
  AlertTriangle,
  CheckCircle2,
  FileSearch,
} from "lucide-react";

function DuplicatePanel() {
  const { duplicate } = useSelector(
    (state) => state.complaint
  );

  if (!duplicate) {
    return null;
  }

  const matches = duplicate.matches || [];

  return (
    <div className="card duplicate-card">
      <div className="duplicate-header">
        <div>
          <h2>Duplicate Complaint Detection</h2>
          <p>
            AI-assisted comparison with previously analyzed complaints
          </p>
        </div>

        <div
          className={`duplicate-badge ${
            duplicate.is_duplicate ? "found" : "clear"
          }`}
        >
          {duplicate.is_duplicate ? (
            <>
              <AlertTriangle size={17} />
              Possible Duplicate
            </>
          ) : (
            <>
              <CheckCircle2 size={17} />
              No Duplicate Found
            </>
          )}
        </div>
      </div>

      {duplicate.is_duplicate ? (
        <div className="duplicate-content">
          <div className="duplicate-alert">
            <AlertTriangle size={19} />

            <div>
              <strong>Similar complaint detected</strong>
              <p>
                One or more previously recorded complaints appear
                similar to this complaint.
              </p>
            </div>
          </div>

          <div className="duplicate-section">
            <div className="duplicate-section-title">
              <FileSearch size={19} />
              <h3>Potential Matches</h3>
            </div>

            <div className="duplicate-matches">
              {matches.map((match) => (
                <div
                  className="duplicate-match"
                  key={match.complaint_id}
                >
                  <div className="duplicate-match-main">
                    <div className="duplicate-match-title">
                      Complaint #{match.complaint_id}
                    </div>

                    <div className="duplicate-match-details">
                      <span>
                        <strong>Customer:</strong>{" "}
                        {match.customer_name || "N/A"}
                      </span>

                      <span>
                        <strong>Product:</strong>{" "}
                        {match.product_name || "N/A"}
                      </span>

                      <span>
                        <strong>Batch:</strong>{" "}
                        {match.batch_number || "N/A"}
                      </span>

                      <span>
                        <strong>Type:</strong>{" "}
                        {match.complaint_type || "N/A"}
                      </span>
                    </div>
                  </div>

                  <div className="similarity-score">
                    <span>Similarity</span>
                    <strong>{match.similarity}%</strong>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      ) : (
        <div className="duplicate-clear">
          <CheckCircle2 size={22} />

          <div>
            <strong>No similar complaint detected</strong>
            <p>
              The complaint does not match any previously analyzed
              complaint above the similarity threshold.
            </p>
          </div>
        </div>
      )}

      <div className="duplicate-footer">
        <CopyCheck size={16} />

        <span>
          Duplicate detection compares product, batch number,
          complaint type, and description against existing records.
        </span>
      </div>
    </div>
  );
}

export default DuplicatePanel;
