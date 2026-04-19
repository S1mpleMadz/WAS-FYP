import { useParams, useNavigate } from "react-router-dom";
import bcrypt from "bcryptjs";
import { useModal } from "../../UI/Modal.js";
import useLoad from "../../api/useLoad.js";
import API from "../../api/API.js";
import "./UserInfoCard.css";
import UserProfileCard from "./UserProfileCard.js";
import UserDataTables from "./UserDataTables.js";

export default function SpecificUserInformation() {
  const { userId } = useParams();
  const navigate = useNavigate();

  const [user, isUserLoading, loadingMessage, loadRecord] = useLoad(`/Users/${userId}`);
  const [teaching, isTeachingLoading, teachingLoadingMessage] = useLoad(`/teaching/user/${userId}`);
  const [teachingDuty, isDutyLoading, dutyLoadingMessage] = useLoad(`/userduties/user/${userId}`);
  const [research, isResearchLoading, researchLoadingMessage] = useLoad(`/research/user/${userId}`);

  const [showForm, formTitle, openForm, closeForm] = useModal(false);
  const [showDeleteModal, , openDeleteModal, closeDeleteModal] = useModal(false);
  const [showResetPassword, , openResetPassword, closeResetPassword] = useModal(false);
  const [showAlert, alertMessage, openAlert, closeAlert] = useModal(false);
  const [showError, errorMessage, openError, closeError] = useModal(false);

  const handleModify = async (updatedUser) => {
    const result = await API.put(`/Users/${updatedUser.UserID}`, updatedUser);
    if (result.isSuccess) {
      closeForm();
      openAlert("User successfully updated");
      await loadRecord();
    } else {
      openError(result.message);
    }
  };

  const handleResetPassword = async (newPassword) => {
    const hash = await bcrypt.hash(newPassword, 10);
    const result = await API.put(`/usercredentials/${userId}`, { UserID: parseInt(userId, 10), PasswordHash: hash });
    closeResetPassword();
    if (result.isSuccess) {
      openAlert("Password successfully reset");
    } else {
      openError(result.message);
    }
  };

  const handleDelete = async () => {
    const response = await API.delete(`/users/${userId}`);
    closeDeleteModal();
    if (response.isSuccess) {
      navigate("/staff");
    } else {
      openError(response.message);
    }
  };

  if (isUserLoading) {
    return <div className="userInfo"><p>{loadingMessage}</p></div>;
  }

  if (!user || user.length === 0) {
    return <div className="userInfo"><p>User not found.</p></div>;
  }

  const userData = user[0];

  return (
    <>
      <UserProfileCard
        userData={userData}
        showForm={showForm}
        formTitle={formTitle}
        openForm={openForm}
        closeForm={closeForm}
        showDeleteModal={showDeleteModal}
        openDeleteModal={openDeleteModal}
        closeDeleteModal={closeDeleteModal}
        showResetPassword={showResetPassword}
        openResetPassword={openResetPassword}
        closeResetPassword={closeResetPassword}
        showAlert={showAlert}
        alertMessage={alertMessage}
        closeAlert={closeAlert}
        showError={showError}
        errorMessage={errorMessage}
        closeError={closeError}
        onModify={handleModify}
        onResetPassword={handleResetPassword}
        onDelete={handleDelete}
      />
      <UserDataTables
        teaching={teaching}
        isTeachingLoading={isTeachingLoading}
        teachingLoadingMessage={teachingLoadingMessage}
        teachingDuty={teachingDuty}
        isDutyLoading={isDutyLoading}
        dutyLoadingMessage={dutyLoadingMessage}
        research={research}
        isResearchLoading={isResearchLoading}
        researchLoadingMessage={researchLoadingMessage}
      />
    </>
  );
}
