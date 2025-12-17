import { useParams } from "react-router-dom";
import useLoad from "../../api/useLoad";

export default function SpecificUserInformation() {
  // Initialisation ----------------------------------------------
  const { userId } = useParams();

  // State -------------------------------------------------------
  const [user, isUserLoading, loadingMessage, loadRecord] = useLoad(
    `/Users/${userId}`
  );

  // Handlers ----------------------------------------------------

  // View --------------------------------------------------------

  if (isUserLoading) {
    return (
      <div className="userInfo">
        <p>{loadingMessage}</p>
      </div>
    );
  }

  if (!user || user.length === 0) {
    return (
      <div className="userInfo">
        <p>User not found.</p>
      </div>
    );
  }

  const userData = user[0];

  return (
    <>
      <div className="userInfo">
        <img src={userData.UserImageURL} />
        <div className="userInfoDetails">
          <p>
            <strong>Title:</strong>
            {userData.UserTitle}
          </p>
          <p>
            <strong>First Name:</strong>
            {userData.UserFirstname}
          </p>
          <p>
            <strong>Last Name:</strong>
            {userData.UserLastname}
          </p>
          <p>
            <strong>Email:</strong>
            {userData.UserEmail}
          </p>
          <p>
            <strong>Type:</strong>
            {userData.UserTypeName}
          </p>
          <p>
            <strong>Position:</strong>
            {userData.PositionName}
          </p>
        </div>
      </div>
    </>
  );
}
