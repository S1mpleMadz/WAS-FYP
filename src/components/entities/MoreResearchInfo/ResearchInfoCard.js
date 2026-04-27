import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import Actions from "../../UI/Actions.js";
import { useModal, Modal } from "../../UI/Modal.js";
import { Alert, Error } from "../../UI/Notifications.js";
import useLoad from "../../api/useLoad.js";
import API from "../../api/API.js";
import DeleteConfirmation from "../../UI/DeleteConfirmation.js";
import ResearchForm from "../research/ResearchForm.js";
import "./ResearchInfoCard.css";

function formatDate(dateStr) {
  if (!dateStr) return "—";
  return new Date(dateStr).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

export default function SpecificResearchInformation() {
  const { researchId } = useParams();
  const navigate = useNavigate();

  const [research, isLoading, loadingMessage, loadRecord] = useLoad(
    `/research/${researchId}`,
  );
  const [assignedUserName, setAssignedUserName] = useState(null);

  useEffect(() => {
    if (research && research.length > 0 && research[0].ResearchUserID) {
      API.get(`/Users/${research[0].ResearchUserID}`).then(result => {
        if (result.isSuccess && result.result && result.result.length > 0) {
          const u = result.result[0];
          setAssignedUserName(`${u.UserFirstname} ${u.UserLastname}`);
        }
      });
    }
  }, [research]);

  const [showForm, formTitle, openForm, closeForm] = useModal(false);
  const [showDeleteModal, , openDeleteModal, closeDeleteModal] = useModal(false);
  const [showAlert, alertMessage, openAlert, closeAlert] = useModal(false);
  const [showError, errorMessage, openError, closeError] = useModal(false);

  const handleModify = async (updatedResearch) => {
    const result = await API.put(
      `/research/${updatedResearch.ResearchID}`,
      updatedResearch,
    );
    if (result.isSuccess) {
      closeForm();
      openAlert("Research task successfully updated");
      await loadRecord();
    } else {
      openError(result.message);
    }
  };

  const handleDelete = async () => {
    const response = await API.delete(`/research/${researchId}`);
    closeDeleteModal();
    if (response.isSuccess) {
      navigate("/research");
    } else {
      openError(response.message);
    }
  };

  if (isLoading) {
    return (
      <div className="researchInfo">
        <p>{loadingMessage}</p>
      </div>
    );
  }

  if (!research || research.length === 0) {
    return (
      <div className="researchInfo">
        <p>Research task not found.</p>
      </div>
    );
  }

  const data = research[0];

  return (
    <>
      <Modal show={showForm} title={formTitle}>
        <ResearchForm
          initialResearch={data}
          onCancel={closeForm}
          onSubmit={handleModify}
        />
      </Modal>

      <Alert show={showAlert} message={alertMessage} onDismiss={closeAlert} />
      <Error show={showError} message={errorMessage} onDismiss={closeError} />

      <DeleteConfirmation
        show={showDeleteModal}
        itemType="research task"
        itemName={data.ResearchName}
        assignedTo={assignedUserName ? [assignedUserName] : []}
        onConfirm={handleDelete}
        onCancel={closeDeleteModal}
      />

      <div className="researchInfo">
        <div className="researchEffortBadge">
          <span>{data.ResearchEffort}</span>
          <small>hrs effort</small>
        </div>
        <div className="researchInfoDetails">
          <p><strong>Name</strong>{data.ResearchName}</p>
          {data.ResearchDescription && (
            <p><strong>Description</strong>{data.ResearchDescription}</p>
          )}
          <p><strong>Effort</strong>{data.ResearchEffort} hrs</p>
          <p><strong>Start Date</strong>{formatDate(data.StartDate)}</p>
          <p><strong>End Date</strong>{formatDate(data.EndDate)}</p>
        </div>
      </div>

      <Actions.Tray>
        <Actions.Modify
          showText
          buttonText="Edit Research"
          onClick={() => openForm("Edit Research")}
        />
        <Actions.Delete
          showText
          buttonText="Delete Research"
          onClick={openDeleteModal}
        />
      </Actions.Tray>
    </>
  );
}
