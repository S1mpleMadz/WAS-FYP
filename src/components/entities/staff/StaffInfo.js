import { useParams, useNavigate } from "react-router-dom";
import { useState } from "react";
import API from "../../api/API";
import useLoad from "../../api/useLoad";
import StaffForm from "./StaffForm.js";
import Action from "../../UI/Actions.js"; // Import Action UI
import Modal, { useModal } from "../../UI/Modal.js"; // Import Modal UI
import "./StaffInfo.css";

export default function SpecificUserInformation() {
  const { userId } = useParams();
  const navigate = useNavigate();

  // Use Modal for Edit Form
  const [showModal, modalContent, openModal, closeModal] = useModal(false);

  // Data Loading
  const [user, isUserLoading, loadingMessage] = useLoad(`/Users/${userId}`);
  const userData = user ? user[0] : null;

  // Handlers
  const handleDelete = async () => {
    // In a real app, you might want a "Are you sure?" modal here
    const response = await API.delete(`/users/${userId}`);
    if (response.isSuccess) navigate("/staff");
  };

  const handleEditSubmit = async (updatedStaff) => {
    const response = await API.put(
      `/users/${updatedStaff.UserID}`,
      updatedStaff,
    );
    if (response.isSuccess) {
      closeModal();
      window.location.reload(); // Simple reload to fetch fresh data
    }
  };

  const openEditModal = () => {
    openModal(
      <StaffForm
        initialStaff={userData}
        onDismiss={closeModal}
        onSubmit={handleEditSubmit}
      />,
    );
  };

  // View
  if (isUserLoading || !userData)
    return <p>{loadingMessage || "User not found"}</p>;

  return (
    <div className="staff-info-container">
      {/* Modal for Editing */}
      <Modal show={showModal} title="Modify Staff Member">
        {modalContent}
      </Modal>

      <div className="staff-profile-header">
        <img src={userData.UserImageURL} alt="Profile" />
        <div className="header-text">
          <h1>
            {userData.UserTitle} {userData.UserFirstname}{" "}
            {userData.UserLastname}
          </h1>
          <p>{userData.PositionName}</p>
        </div>
      </div>

      <div className="staff-data-grid">
        <div className="data-row">
          <strong>Email:</strong> <span>{userData.UserEmail}</span>
        </div>
        <div className="data-row">
          <strong>Department:</strong>{" "}
          <span>{userData.DepartmentName || "N/A"}</span>
        </div>
        <div className="data-row">
          <strong>Type:</strong> <span>{userData.UserTypeName}</span>
        </div>
      </div>

      <div className="action-bar">
        <Action.Tray>
          <Action.Modify showText buttonText="Modify" onClick={openEditModal} />
          <Action.Delete showText buttonText="Delete" onClick={handleDelete} />
          <Action.Cancel
            showText
            buttonText="Back"
            onClick={() => navigate("/staff")}
          />
        </Action.Tray>
      </div>
    </div>
  );
}
