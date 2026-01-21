import { useNavigate } from "react-router-dom";
import "./StaffCard.css";

export default function UserCard({ user }) {
  const navigate = useNavigate();

  const goToUserInfoPage = () => {
    navigate(`/UserInformation/${user.UserID}`);
  };

  return (
    <div className="userCard" onClick={goToUserInfoPage}>
      <div className="user-details">
        <span className="user-name">{`${user.UserFirstname} ${user.UserLastname}`}</span>
      </div>
    </div>
  );
}
