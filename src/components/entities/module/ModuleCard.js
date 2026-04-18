import { useNavigate } from "react-router-dom";
import { Card } from "../../UI/Card.js";
import "./ModuleCard.css";

export default function ModuleCard({ module }) {
  const navigate = useNavigate();

  return (
    <div
      className="moduleCard"
      onClick={() => navigate(`/ModuleInformation/${module.ModuleID}`)}
    >
      <Card>
        <div className="module-details">
          <span className="module-code">{module.ModuleCode}</span>
          <span className="module-name">{module.ModuleName}</span>
          <span className="module-info">{module.DepartmentName}</span>
          <span className="module-info">Level {module.ModuleLevel}</span>
        </div>
      </Card>
    </div>
  );
}
