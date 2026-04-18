import { useNavigate } from "react-router-dom";
import { Card } from "../../UI/Card.js";
import "./UserCard.css";

export default function UserCard({ user }) {
  const navigate = useNavigate();

  const goToUserInfoPage = () => {
    navigate(`/UserInformation/${user.UserID}`);
  };

  return (
    <div className="userCard" onClick={goToUserInfoPage}>
      <Card>
        <div className="user-details">
          <span className="user-name">{`${user.UserFirstname} ${user.UserLastname}`}</span>
          <span className="info">{user.UserUsertypeName}</span>
          <span className="info">{user.UserPositionName}</span>
        </div>
      </Card>
    </div>
  );
}
