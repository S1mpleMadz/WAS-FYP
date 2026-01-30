import { useNavigate } from "react-router-dom";
import { Card } from "../../UI/Card.js";
import Action from "../../UI/Actions.js";

export default function ModuleCard({ module }) {
  const navigate = useNavigate();

  const handleView = () => {
    // Navigate to the detail view using the ID
    navigate(`/module/${module.ModuleID}`);
  };

  return (
    <Card>
      <div className="module-card-content">
        <div className="module-details">
          <h3>
            {module.ModuleCode}: {module.ModuleName}
          </h3>
          <p className="module-leader">
            <strong>Leader:</strong> {module.UserFirstname}{" "}
            {module.UserLastname}
          </p>
          <span className="module-tag">Level {module.ModuleLevel}</span>
        </div>

        <div className="module-actions">
          <Action.Tray>
            <Action.Expand onClick={handleView} />
          </Action.Tray>
        </div>
      </div>
    </Card>
  );
}
