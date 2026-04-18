import { useParams, useNavigate } from "react-router-dom";
import Actions from "../../UI/Actions.js";
import { useModal, Modal } from "../../UI/Modal.js";
import { Alert, Error } from "../../UI/Notifications.js";
import useLoad from "../../api/useLoad.js";
import API from "../../api/API.js";
import DeleteConfirmation from "../../UI/DeleteConfirmation.js";
import ModuleForm from "../module/ModuleForm.js";
import "./ModuleInfoCard.css";
import Table from "../../UI/Table.js";

export default function SpecificModuleInformation() {
  const { moduleId } = useParams();
  const navigate = useNavigate();

  const [module, isModuleLoading, loadingMessage, loadRecord] = useLoad(
    `/modules/${moduleId}`,
  );
  const [showForm, formTitle, openForm, closeForm] = useModal(false);
  const [showDeleteModal, , openDeleteModal, closeDeleteModal] = useModal(false);
  const [showAlert, alertMessage, openAlert, closeAlert] = useModal(false);
  const [showError, errorMessage, openError, closeError] = useModal(false);

  const [teachingStaff, isTeachingLoading, teachingLoadingMessage] = useLoad(
    `/teaching/modules/${moduleId}`,
  );

  const teachingColumns = [
    { header: "Staff Name", key: "TeachingStaffName" },
    {
      header: "Leading %",
      key: "TeachingLeading",
      className: "center",
      render: (row) => `${row.TeachingLeading}%`,
    },
    {
      header: "Lecturing %",
      key: "TeachingLecturing",
      className: "center",
      render: (row) => `${row.TeachingLecturing}%`,
    },
    {
      header: "Workshop %",
      key: "TeachingWorkshops",
      className: "center",
      render: (row) => `${row.TeachingWorkshops}%`,
    },
    {
      header: "Assessment %",
      key: "TeachingAssessing",
      className: "center",
      render: (row) => `${row.TeachingAssessing}%`,
    },
    {
      header: "Moderation %",
      key: "TeachingModeration",
      className: "center",
      render: (row) => `${row.TeachingModeration}%`,
    },
  ];

  const handleModify = async (updatedModule) => {
    const result = await API.put(
      `/modules/${updatedModule.ModuleID}`,
      updatedModule,
    );
    if (result.isSuccess) {
      closeForm();
      openAlert("Module successfully updated");
      await loadRecord();
    } else {
      openError(result.message);
    }
  };

  const handleDelete = async () => {
    const response = await API.delete(`/modules/${moduleId}`);
    closeDeleteModal();
    if (response.isSuccess) {
      navigate("/modules");
    } else {
      openError(response.message);
    }
  };

  if (isModuleLoading) {
    return (
      <div className="moduleInfo">
        <p>{loadingMessage}</p>
      </div>
    );
  }

  if (!module || module.length === 0) {
    return (
      <div className="moduleInfo">
        <p>Module not found.</p>
      </div>
    );
  }

  const moduleData = module[0];

  return (
    <>
      <Modal show={showForm} title={formTitle}>
        <ModuleForm
          initialModule={moduleData}
          onCancel={closeForm}
          onSubmit={handleModify}
        />
      </Modal>

      <Alert show={showAlert} message={alertMessage} onDismiss={closeAlert} />
      <Error show={showError} message={errorMessage} onDismiss={closeError} />

      <DeleteConfirmation
        show={showDeleteModal}
        itemType="module"
        itemName={`${moduleData.ModuleCode} – ${moduleData.ModuleName}`}
        onConfirm={handleDelete}
        onCancel={closeDeleteModal}
      />

      <div className="moduleInfo">
        <div className="moduleCodeBadge">
          <span>{moduleData.ModuleCode}</span>
          <small>Level {moduleData.ModuleLevel}</small>
          <small>{moduleData.ModuleCredits} credits</small>
        </div>
        <div className="moduleInfoDetails">
          <p><strong>Name</strong>{moduleData.ModuleName}</p>
          <p><strong>Department</strong>{moduleData.DepartmentName}</p>
          <p><strong>Leader</strong>{moduleData.LeaderFirstname} {moduleData.LeaderLastname}</p>
          <p><strong>Level</strong>{moduleData.ModuleLevel}</p>
          <p><strong>Credits</strong>{moduleData.ModuleCredits}</p>
        </div>
      </div>

      <Actions.Tray>
        <Actions.Modify
          showText
          buttonText="Edit Module"
          onClick={() => openForm("Edit Module")}
        />
        <Actions.Delete
          showText
          buttonText="Delete Module"
          onClick={openDeleteModal}
        />
      </Actions.Tray>

      <div className="teachingInfo">
        <h3 className="table-title">Staff assigned to teach this module:</h3>
        {isTeachingLoading ? (
          <p>Loading teaching data: {teachingLoadingMessage}</p>
        ) : (
          <Table
            columns={teachingColumns}
            data={teachingStaff}
            emptyMessage="No staff assigned to this module."
          />
        )}
      </div>
    </>
  );
}
