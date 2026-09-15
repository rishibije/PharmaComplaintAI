import "./App.css";

import ComplaintForm from "./components/ComplaintForm";
import UploadPanel from "./components/UploadPanel";
import RiskPanel from "./components/RiskPanel";
import SummaryPanel from "./components/SummaryPanel";
import RootCausePanel from "./components/RootCausePanel";
import DuplicatePanel from "./components/DuplicatePanel";
import ComplaintHistory from "./components/ComplaintHistory";
import CAPAPanel from "./components/CAPAPanel";

function App() {
  return (
    <div className="app">
      <header className="header">
        <div className="header-left">
          <h1>PharmaComplaint AI</h1>
          <p>
            AI-powered Pharmaceutical Complaint Management System
          </p>
        </div>

        <div className="header-badge">
          AI-Powered QMS
        </div>
      </header>

      <main className="dashboard">
        <div className="dashboard-title">
          <h2>Customer Complaint Management</h2>

          <p>
            Review, analyze, and assess pharmaceutical customer
            complaints using AI.
          </p>
        </div>

        <div className="dashboard-grid">
          <section className="left-column">
            <ComplaintForm />

            <SummaryPanel />

            <RootCausePanel />

            <DuplicatePanel />

            <CAPAPanel />
          </section>

          <section className="right-column">
            <UploadPanel />

            <RiskPanel />
          </section>
        </div>

        <ComplaintHistory />
      </main>
    </div>
  );
}

export default App;