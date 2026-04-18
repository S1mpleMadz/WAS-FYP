import { useNavigate } from "react-router-dom";
import { Card } from "../../UI/Card.js";
import "./ModuleCard.css";

export default function ModuleCard({ module }) {
  const navigate = useNavigate();

  const goToUserInfoPage = () => {
    navigate(`/ModuleInformation/${module.ModuleID}`);
  };

  return (
    <div className="moduleCard" onClick={goToUserInfoPage}>
      <Card>
        <div className="module-details">
          <span className="module-name">{module.ModuleName}</span>
          <span className="info">Level: {module.ModuleLevel}</span>
          <span className="info">Credits: {module.ModuleCredits}</span>
        </div>
      </Card>
    </div>
  );
}
