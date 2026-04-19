import Actions from "../../UI/Actions.js";
import { Modal } from "../../UI/Modal.js";
import { Alert, Error } from "../../UI/Notifications.js";
import DeleteConfirmation from "../../UI/DeleteConfirmation.js";
import UserForm from "../user/UserForm.js";

export default function UserProfileCard({
  userData,
  showForm,
  formTitle,
  openForm,
  closeForm,
  showDeleteModal,
  openDeleteModal,
  closeDeleteModal,
  showAlert,
  alertMessage,
  closeAlert,
  showError,
  errorMessage,
  closeError,
  onModify,
  onDelete,
}) {
  return (
    <>
      <Modal show={showForm} title={formTitle}>
        <UserForm
          initialUser={userData}
          onCancel={closeForm}
          onSubmit={onModify}
        />
      </Modal>

      <Alert show={showAlert} message={alertMessage} onDismiss={closeAlert} />
      <Error show={showError} message={errorMessage} onDismiss={closeError} />

      <DeleteConfirmation
        show={showDeleteModal}
        itemType="user"
        itemName={`${userData.UserFirstname} ${userData.UserLastname}`}
        onConfirm={onDelete}
        onCancel={closeDeleteModal}
      />

      <div className="userInfo">
        <img src={userData.UserImageURL} alt={userData.UserFirstname} />
        <div className="userInfoDetails">
          <p><strong>Title:</strong>{userData.UserTitle}</p>
          <p><strong>First Name:</strong>{userData.UserFirstname}</p>
          <p><strong>Last Name:</strong>{userData.UserLastname}</p>
          <p><strong>Email:</strong>{userData.UserEmail}</p>
          <p><strong>Type:</strong>{userData.UserTypeName}</p>
          <p><strong>Position:</strong>{userData.PositionName}</p>
          <p><strong>Department:</strong>{userData.DepartmentName}</p>
          <p><strong>Work Type:</strong>{userData.WorkTypeName}</p>
        </div>
      </div>

      <Actions.Tray>
        <Actions.Modify
          showText
          buttonText="Edit User"
          onClick={() => openForm("Edit User")}
        />
        <Actions.Delete
          showText
          buttonText="Delete User"
          onClick={openDeleteModal}
        />
      </Actions.Tray>
    </>
  );
}
