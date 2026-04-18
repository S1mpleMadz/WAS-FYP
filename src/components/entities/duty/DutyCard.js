import { useNavigate } from "react-router-dom";
import { Card } from "../../UI/Card.js";
import "./DutyCard.css";

export default function DutyCard({ duty }) {
  const navigate = useNavigate();

  const goToDutyInfoPage = () => {
    navigate(`/DutyInformation/${duty.DutyID}`);
  };

  return (
    <div className="dutyCard" onClick={goToDutyInfoPage}>
      <Card>
        <div className="duty-details">
          <span className="duty-name">{duty.DutyName}</span>
          <span className="info">Effort: {duty.DutyEffort}</span>
          <span className="info">Instances: {duty.DutyInstances}</span>
        </div>
      </Card>
    </div>
  );
}
