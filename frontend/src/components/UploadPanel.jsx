import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  setLoading,
  setAnalysis,
  setError,
} from "../store/complaintSlice";

function UploadPanel() {
  const [text, setText] = useState("");
  const [file, setFile] = useState(null);

  const dispatch = useDispatch();

  const { loading, error } = useSelector(
    (state) => state.complaint
  );

  const analyzeComplaint = async () => {
    if (!text.trim() && !file) {
      dispatch(
        setError(
          "Please enter complaint text or upload a PDF/TXT file."
        )
      );

      return;
    }

    dispatch(setLoading(true));
    dispatch(setError(null));

    try {
      const formData = new FormData();

      if (text.trim()) {
        formData.append("text", text);
      }

      if (file) {
        formData.append("file", file);
      }

      const response = await fetch(
        "http://127.0.0.1:8001/api/complaints/analyze",
        {
          method: "POST",
          body: formData,
        }
      );

      if (!response.ok) {
        const errorData = await response.json();

        throw new Error(
          errorData.detail || "Analysis failed."
        );
      }

      const data = await response.json();

      // Update Redux with the latest AI analysis
      dispatch(setAnalysis(data));

      // Tell ComplaintHistory to refresh
      window.dispatchEvent(
        new CustomEvent("complaint-analyzed")
      );

    } catch (err) {
      dispatch(setError(err.message));

    } finally {
      dispatch(setLoading(false));
    }
  };

  return (
    <div className="card">
      <h2>Complaint Input</h2>

      <label>Upload Complaint Document</label>

      <input
        type="file"
        accept=".pdf,.txt"
        onChange={(event) => {
          setFile(event.target.files[0]);
        }}
      />

      {file && (
        <p>
          Selected file: <strong>{file.name}</strong>
        </p>
      )}

      <div className="divider">OR</div>

      <label>Enter Complaint Text</label>

      <textarea
        rows="8"
        placeholder="Paste customer complaint here..."
        value={text}
        onChange={(event) => {
          setText(event.target.value);
        }}
      />

      <button
        onClick={analyzeComplaint}
        disabled={loading}
      >
        {loading
          ? "Analyzing Complaint..."
          : "Analyze Complaint"}
      </button>

      {error && (
        <p className="error">
          {error}
        </p>
      )}
    </div>
  );
}

export default UploadPanel;
