import { useNavigate } from "react-router-dom";
import { Card } from "../../UI/Card.js";
import "./DutyCard.css";

export default function DutyCard({ duty }) {
  const navigate = useNavigate();

  return (
    <div
      className="dutyCard"
      onClick={() => navigate(`/DutyInformation/${duty.DutyID}`)}
    >
      <Card>
        <div className="duty-details">
          <span className="duty-name">{duty.DutyName}</span>
          <span className="duty-info">{duty.DutyEffort} hrs effort</span>
          <span className="duty-info">
            {duty.DutyInstances} instance{duty.DutyInstances !== 1 ? "s" : ""}
          </span>
        </div>
      </Card>
    </div>
  );
}
