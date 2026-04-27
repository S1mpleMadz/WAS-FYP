import { useParams, useNavigate } from "react-router-dom";
import { useState } from "react";
import Actions from "../../UI/Actions.js";
import { useModal, Modal } from "../../UI/Modal.js";
import { Alert, Error } from "../../UI/Notifications.js";
import useLoad from "../../api/useLoad.js";
import API from "../../api/API.js";
import DeleteConfirmation from "../../UI/DeleteConfirmation.js";
import DutyForm from "../duty/DutyForm.js";
import UserDutyForm from "./UserDutyForm.js";
import Table from "../../UI/Table.js";
import "./DutyInfoCard.css";

const assignedStaffColumns = [
  {
    header: "Staff Name",
    key: "UserFirstname",
    render: (row) => `${row.UserFirstname} ${row.UserLastname}`,
  },
];

export default function SpecificDutyInformation() {
  const { dutyId } = useParams();
  const navigate = useNavigate();

  const [duty, isDutyLoading, loadingMessage, loadRecord] = useLoad(
    `/duty/${dutyId}`,
  );
  const [assignedStaff, isStaffLoading, staffLoadingMessage, loadAssignedStaff] = useLoad(
    `/userduties/duty/${dutyId}`,
  );

  const [showForm, formTitle, openForm, closeForm] = useModal(false);
  const [showAssignForm, , openAssignForm, closeAssignForm] = useModal(false);
  const [showDeleteModal, , openDeleteModal, closeDeleteModal] = useModal(false);
  const [showDeleteAssignModal, , openDeleteAssignModal, closeDeleteAssignModal] = useModal(false);
  const [showAlert, alertMessage, openAlert, closeAlert] = useModal(false);
  const [showError, errorMessage, openError, closeError] = useModal(false);

  const [selectedAssignment, setSelectedAssignment] = useState(null);

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

  const handleAssign = async (data) => {
    const result = await API.post("/userduties", data);
    if (result.isSuccess) {
      closeAssignForm();
      openAlert("Staff member successfully assigned");
      await loadAssignedStaff();
    } else {
      openError(result.message);
    }
  };

  const handleRemoveAssignment = async () => {
    const result = await API.delete(`/userduties/${selectedAssignment.UserDutyID}`);
    closeDeleteAssignModal();
    if (result.isSuccess) {
      setSelectedAssignment(null);
      openAlert("Assignment successfully removed");
      await loadAssignedStaff();
    } else {
      openError(result.message);
    }
  };

  const handleOpenRemoveAssignment = () => {
    if (!selectedAssignment) {
      openError("Please select an assignment to remove");
      return;
    }
    openDeleteAssignModal();
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

  const dutyAssignedTo = (assignedStaff || []).map(
    s => `${s.UserFirstname} ${s.UserLastname}`
  );

  return (
    <>
      <Modal show={showForm} title={formTitle}>
        <DutyForm
          initialDuty={dutyData}
          onCancel={closeForm}
          onSubmit={handleModify}
        />
      </Modal>

      <Modal show={showAssignForm} title="Assign Staff to Duty">
        <UserDutyForm
          dutyId={parseInt(dutyId)}
          onCancel={closeAssignForm}
          onSubmit={handleAssign}
        />
      </Modal>

      <Alert show={showAlert} message={alertMessage} onDismiss={closeAlert} />
      <Error show={showError} message={errorMessage} onDismiss={closeError} />

      <DeleteConfirmation
        show={showDeleteModal}
        itemType="duty"
        itemName={dutyData.DutyName}
        assignedTo={dutyAssignedTo}
        onConfirm={handleDelete}
        onCancel={closeDeleteModal}
      />

      <DeleteConfirmation
        show={showDeleteAssignModal}
        itemType="assignment"
        itemName={
          selectedAssignment
            ? `${selectedAssignment.UserFirstname} ${selectedAssignment.UserLastname}`
            : "this assignment"
        }
        onConfirm={handleRemoveAssignment}
        onCancel={closeDeleteAssignModal}
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

      <div className="dutyAssignedInfo">
        <h3 className="table-title">Staff assigned to this duty:</h3>
        {isStaffLoading ? (
          <p>Loading assigned staff: {staffLoadingMessage}</p>
        ) : (
          <Table
            columns={assignedStaffColumns}
            data={assignedStaff}
            emptyMessage="No staff assigned to this duty."
            OnRowClick={(i) => setSelectedAssignment(assignedStaff[i])}
            OnUnSelect={() => setSelectedAssignment(null)}
          />
        )}
      </div>

      <Actions.Tray>
        <Actions.Add
          showText
          buttonText="Assign Staff"
          onClick={openAssignForm}
        />
        <Actions.Delete
          showText
          buttonText="Remove Assignment"
          onClick={handleOpenRemoveAssignment}
        />
      </Actions.Tray>
    </>
  );
}
