import { useCallback, useEffect, useState } from "react";

function ComplaintHistory() {
  const [complaints, setComplaints] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchComplaints = useCallback(async () => {
    try {
      setError("");

      const response = await fetch(
        "http://127.0.0.1:8001/api/complaints/"
      );

      if (!response.ok) {
        throw new Error(
          "Failed to fetch complaint history."
        );
      }

      const data = await response.json();

      setComplaints(data);

    } catch (err) {
      setError(err.message);

    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    // Load complaint history when the page opens
    fetchComplaints();

    // Refresh history whenever a new complaint is analyzed
    const handleComplaintAnalyzed = () => {
      fetchComplaints();
    };

    window.addEventListener(
      "complaint-analyzed",
      handleComplaintAnalyzed
    );

    return () => {
      window.removeEventListener(
        "complaint-analyzed",
        handleComplaintAnalyzed
      );
    };
  }, [fetchComplaints]);

  return (
    <div className="card history-card">
      <div className="history-header">
        <div>
          <h2>Complaint History</h2>

          <p>
            Previously analyzed pharmaceutical complaints
          </p>
        </div>

        <div className="history-count">
          {complaints.length} Complaint
          {complaints.length !== 1 ? "s" : ""}
        </div>
      </div>

      {loading && (
        <p>Loading complaint history...</p>
      )}

      {error && (
        <p className="error">
          {error}
        </p>
      )}

      {!loading &&
        !error &&
        complaints.length === 0 && (
          <p>No complaints found.</p>
        )}

      {!loading &&
        !error &&
        complaints.length > 0 && (
          <div className="history-table-wrapper">
            <table className="history-table">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Customer</th>
                  <th>Product</th>
                  <th>Batch</th>
                  <th>Type</th>
                  <th>Risk</th>
                  <th>Severity</th>
                  <th>Priority</th>
                  <th>Date</th>
                </tr>
              </thead>

              <tbody>
                {complaints.map((complaint) => (
                  <tr key={complaint.id}>
                    <td>
                      #{complaint.id}
                    </td>

                    <td>
                      {complaint.customer_name || "N/A"}
                    </td>

                    <td>
                      {complaint.product_name || "N/A"}
                    </td>

                    <td>
                      {complaint.batch_number || "N/A"}
                    </td>

                    <td>
                      {complaint.complaint_type || "N/A"}
                    </td>

                    <td>
                      <span
                        className={`risk-badge ${
                          (
                            complaint.risk_level || ""
                          ).toLowerCase()
                        }`}
                      >
                        {complaint.risk_level || "N/A"}
                      </span>
                    </td>

                    <td>
                      {complaint.severity || "N/A"}
                    </td>

                    <td>
                      {complaint.priority || "N/A"}
                    </td>

                    <td>
                      {complaint.complaint_date || "N/A"}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
    </div>
  );
}

export default ComplaintHistory;
