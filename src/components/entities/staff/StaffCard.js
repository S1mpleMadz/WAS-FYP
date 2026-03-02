import { useNavigate } from "react-router-dom";
import Action from "../../UI/Actions.js"; // Use your Action UI
import "./StaffCard.css";

export default function StaffCard({ user }) {
  const navigate = useNavigate();

  const handleView = () => {
    navigate(`/UserInformation/${user.UserID}`);
  };

  // Fallback image if user has none
  const imageSrc =
    user.UserImageURL && user.UserImageURL.length > 5
      ? user.UserImageURL
      : "https://img.icons8.com/clouds/100/000000/user.png";

  return (
    <div className="staff-card-content">
      <img src={imageSrc} alt={`${user.UserFirstname} ${user.UserLastname}`} />

      <div className="staff-details">
        <h3>
          {user.UserTitle} {user.UserFirstname} {user.UserLastname}
        </h3>
        <p className="staff-email">{user.UserEmail}</p>
        <span className="staff-tag">{user.UserTypeName}</span>
      </div>

      {/* Action Tray for specific card actions */}
      <div className="staff-actions">
        <Action.Tray>
          <Action.Expand onClick={handleView} />
        </Action.Tray>
      </div>
    </div>
  );
}
