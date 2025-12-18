import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import API from "../../api/API";
import useLoad from "../../api/useLoad";
import StaffForm from "./StaffForm";

export default function SpecificUserInformation() {
  // Initialisation ----------------------------------------------
  const { userId } = useParams();
  const putUserEndpoint = "/users";
  const navigate = useNavigate();
  // State -------------------------------------------------------
  const [user, isUserLoading, loadingMessage, loadRecord] = useLoad(
    `/Users/${userId}`
  );

  const userData = user[0];

  const [showForm, setShowForm] = useState(false);

  // Context ----------------------------------------------------

  // Methods ----------------------------------------------------

  const goToStaffPage = () => {
    navigate("/staff");
  };

  const handleModify = () => {
    setShowForm(!showForm);
  };

  const handleDelete = async (id) => {
    const response = await API.delete(`${putUserEndpoint}/${id}`);
    goToStaffPage();
  };

  const handleCancel = () => {
    setShowForm(false);
  };

  const handleSubmit = async (userData) => {
    const response = await API.put(
      `${putUserEndpoint}/${userData.UserID}`,
      userData
    );

    if (response.isSuccess) {
      setShowForm(false);
      window.location.reload();
    }
  };

  console.log(userData);
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
      <button onClick={() => handleDelete(userData.UserID)}>
        Delete Staff
      </button>

      {showForm && (
        <StaffForm
          onDismiss={handleCancel}
          onSubmit={handleSubmit}
          initialStaff={userData}
        />
      )}
    </>
  );
}
