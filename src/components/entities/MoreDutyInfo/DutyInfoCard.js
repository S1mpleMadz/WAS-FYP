import { useParams, useNavigate } from "react-router-dom";
import Actions from "../../UI/Actions.js";
import { useModal, Modal } from "../../UI/Modal.js";
import { Alert, Error } from "../../UI/Notifications.js";
import useLoad from "../../api/useLoad.js";
import API from "../../api/API.js";
import DeleteConfirmation from "../../UI/DeleteConfirmation.js";
import DutyForm from "../duty/DutyForm.js";
import "./DutyInfoCard.css";

export default function SpecificDutyInformation() {
  const { dutyId } = useParams();
  const navigate = useNavigate();

  const [duty, isDutyLoading, loadingMessage, loadRecord] = useLoad(
    `/duty/${dutyId}`,
  );
  const [showForm, formTitle, openForm, closeForm] = useModal(false);
  const [showDeleteModal, , openDeleteModal, closeDeleteModal] = useModal(false);
  const [showAlert, alertMessage, openAlert, closeAlert] = useModal(false);
  const [showError, errorMessage, openError, closeError] = useModal(false);

  const handleModify = async (updatedDuty) => {
    const result = await API.put(`/duty/${updatedDuty.DutyID}`, updatedDuty);
    if (result.isSuccess) {
      closeForm();
      openAlert("Duty successfully updated");
      await loadRecord();
    } else {
      openError(result.message);
    }
  };

  const handleDelete = async () => {
    const response = await API.delete(`/duty/${dutyId}`);
    closeDeleteModal();
    if (response.isSuccess) {
      navigate("/duties");
    } else {
      openError(response.message);
    }
  };

  if (isDutyLoading) {
    return (
      <div className="dutyInfo">
        <p>{loadingMessage}</p>
      </div>
    );
  }

  if (!duty || duty.length === 0) {
    return (
      <div className="dutyInfo">
        <p>Duty not found.</p>
      </div>
    );
  }

  const dutyData = duty[0];

  return (
    <>
      <Modal show={showForm} title={formTitle}>
        <DutyForm
          initialDuty={dutyData}
          onCancel={closeForm}
          onSubmit={handleModify}
        />
      </Modal>

      <Alert show={showAlert} message={alertMessage} onDismiss={closeAlert} />
      <Error show={showError} message={errorMessage} onDismiss={closeError} />

      <DeleteConfirmation
        show={showDeleteModal}
        itemType="duty"
        itemName={dutyData.DutyName}
        onConfirm={handleDelete}
        onCancel={closeDeleteModal}
      />

      <div className="dutyInfo">
        <div className="dutyEffortBadge">
          <span>{dutyData.DutyEffort}</span>
          <small>hrs effort</small>
          <small>{dutyData.DutyInstances} instance{dutyData.DutyInstances !== 1 ? "s" : ""}</small>
        </div>
        <div className="dutyInfoDetails">
          <p><strong>Name</strong>{dutyData.DutyName}</p>
          <p><strong>Effort</strong>{dutyData.DutyEffort} hrs</p>
          <p><strong>Instances</strong>{dutyData.DutyInstances}</p>
        </div>
      </div>

      <Actions.Tray>
        <Actions.Modify
          showText
          buttonText="Edit Duty"
          onClick={() => openForm("Edit Duty")}
        />
        <Actions.Delete
          showText
          buttonText="Delete Duty"
          onClick={openDeleteModal}
        />
      </Actions.Tray>
    </>
  );
}
