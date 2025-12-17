import { useParams } from "react-router-dom";
import useLoad from "../../api/useLoad";
import StaffForm from "./StaffForm";

export default function SpecificUserInformation() {
  // Initialisation ----------------------------------------------
  const { userId } = useParams();

  // State -------------------------------------------------------
  const [user, isUserLoading, loadingMessage, loadRecord] = useLoad(
    `/Users/${userId}`
  );

  const userData = user[0];

  // Context ----------------------------------------------------

  // Methods ----------------------------------------------------

  const handleModify = () => {};

  const handleDelete = () => {};

  const handleCancel = () => {};

  const handleSubmit = () => {};

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

      <button onClick={handleModify}>Modify Staff</button>
      <button onClick={handleDelete}>Delete Staff</button>

      <StaffForm
        onDismiss={handleCancel}
        onSubmit={handleSubmit}
        initialStaff={userData}
      />
    </>
  );
}
