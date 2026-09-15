import { useSelector } from "react-redux";

function ComplaintForm() {
  const complaint = useSelector((state) => state.complaint.complaint);

  if (!complaint) {
    return (
      <div className="card">
        <h2>Complaint Details</h2>
        <p>No complaint analyzed yet.</p>
        <p>Upload a complaint document or enter complaint text to begin.</p>
      </div>
    );
  }

  return (
    <div className="card">
      <h2>Complaint Details</h2>

      <div className="form-grid">
        <div>
          <label>Complaint Source</label>
          <input value={complaint.complaint_source || ""} readOnly />
        </div>

        <div>
          <label>Customer Name</label>
          <input value={complaint.customer_name || ""} readOnly />
        </div>

        <div>
          <label>Product Name</label>
          <input value={complaint.product_name || ""} readOnly />
        </div>

        <div>
          <label>Product Strength</label>
          <input value={complaint.product_strength || ""} readOnly />
        </div>

        <div>
          <label>Batch Number</label>
          <input value={complaint.batch_number || ""} readOnly />
        </div>

        <div>
          <label>Manufacturing Date</label>
          <input value={complaint.manufacturing_date || ""} readOnly />
        </div>

        <div>
          <label>Expiry Date</label>
          <input value={complaint.expiry_date || ""} readOnly />
        </div>

        <div>
          <label>Complaint Type</label>
          <input value={complaint.complaint_type || ""} readOnly />
        </div>

        <div>
          <label>Complaint Date</label>
          <input value={complaint.complaint_date || ""} readOnly />
        </div>

        <div>
          <label>Severity</label>
          <input value={complaint.severity || ""} readOnly />
        </div>

        <div>
          <label>Priority</label>
          <input value={complaint.priority || ""} readOnly />
        </div>

        <div className="full-width">
          <label>Description</label>
          <textarea
            value={complaint.description || ""}
            readOnly
            rows="5"
          />
        </div>
      </div>
    </div>
  );
}

export default ComplaintForm;
