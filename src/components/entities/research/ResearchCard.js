import { useNavigate } from "react-router-dom";
import { Card } from "../../UI/Card.js";
import "./ResearchCard.css";

function formatDate(dateStr) {
  if (!dateStr) return "—";
  return new Date(dateStr).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

export default function ResearchCard({ research }) {
  const navigate = useNavigate();

  return (
    <div
      className="researchCard"
      onClick={() => navigate(`/ResearchInformation/${research.ResearchID}`)}
    >
      <Card>
        <div className="research-details">
          <span className="research-name">{research.ResearchName}</span>
          {research.ResearchDescription && (
            <span className="research-description">
              {research.ResearchDescription}
            </span>
          )}
          <span className="research-info">
            {formatDate(research.StartDate)} – {formatDate(research.EndDate)}
          </span>
          <span className="research-info">{research.ResearchEffort} hrs effort</span>
        </div>
      </Card>
    </div>
  );
}
