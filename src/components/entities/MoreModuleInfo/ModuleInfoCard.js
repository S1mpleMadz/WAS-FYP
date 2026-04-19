import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import Actions from "../../UI/Actions.js";
import { useModal, Modal } from "../../UI/Modal.js";
import { Alert, Error } from "../../UI/Notifications.js";
import useLoad from "../../api/useLoad.js";
import API from "../../api/API.js";
import DeleteConfirmation from "../../UI/DeleteConfirmation.js";
import ModuleForm from "../module/ModuleForm.js";
import ModuleContributionForm from "./ModuleContributionForm.js";
import { calculateModuleEffort } from "./effortCalculations.js";
import Table from "../../UI/Table.js";
import "./ModuleInfoCard.css";

const teachingColumns = [
  {
    header: "Staff Name",
    key: "UserFirstname",
    render: (row) => `${row.UserFirstname} ${row.UserLastname}`,
  },
  {
    header: "Leading %",
    key: "TeachingLeading",
    className: "center",
    render: (row) => `${parseFloat(row.TeachingLeading)}%`,
  },
  {
    header: "Lecturing %",
    key: "TeachingLecturing",
    className: "center",
    render: (row) => `${parseFloat(row.TeachingLecturing)}%`,
  },
  {
    header: "Workshops %",
    key: "TeachingWorkshops",
    className: "center",
    render: (row) => `${parseFloat(row.TeachingWorkshops)}%`,
  },
  {
    header: "Assessing %",
    key: "TeachingAssessing",
    className: "center",
    render: (row) => `${parseFloat(row.TeachingAssessing)}%`,
  },
  {
    header: "Moderation",
    key: "TeachingModeration",
    className: "center",
    render: (row) => (parseFloat(row.TeachingModeration) !== 0 ? "Yes" : "No"),
  },
];

export default function SpecificModuleInformation() {
  const { moduleId } = useParams();
  const navigate = useNavigate();

  const [module, isModuleLoading, loadingMessage, loadRecord] = useLoad(
    `/modules/${moduleId}`,
  );
  const [teachingStaff, isTeachingLoading, teachingLoadingMessage, loadTeachingData] = useLoad(
    `/teaching/module/${moduleId}`,
  );

  const [showForm, formTitle, openForm, closeForm] = useModal(false);
  const [showContribForm, contribFormTitle, openContribForm, closeContribForm] = useModal(false);
  const [showDeleteModal, , openDeleteModal, closeDeleteModal] = useModal(false);
  const [showDeleteContribModal, , openDeleteContribModal, closeDeleteContribModal] = useModal(false);
  const [showAlert, alertMessage, openAlert, closeAlert] = useModal(false);
  const [showError, errorMessage, openError, closeError] = useModal(false);

  const [totalModuleHours, setTotalModuleHours] = useState(0);
  const [isCalculatingHours, setIsCalculatingHours] = useState(false);
  const [selectedContribution, setSelectedContribution] = useState(null);

  useEffect(() => {
    if (module && module.length > 0) {
      const run = async () => {
        setIsCalculatingHours(true);
        const hours = await calculateModuleEffort(module[0]);
        setTotalModuleHours(hours);
        setIsCalculatingHours(false);
      };
      run();
    }
  }, [module]);

  const handleModify = async (updatedModule) => {
    const result = await API.put(`/modules/${updatedModule.ModuleID}`, updatedModule);
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

  const handleAddContribution = async (data) => {
    const result = await API.post("/teaching", data);
    if (result.isSuccess) {
      closeContribForm();
      openAlert("Contribution successfully added");
      await loadTeachingData();
    } else {
      openError(result.message);
    }
  };

  const handleModifyContribution = async (data) => {
    const result = await API.put(`/teaching/${data.TeachingID}`, data);
    if (result.isSuccess) {
      closeContribForm();
      openAlert("Contribution successfully updated");
      await loadTeachingData();
    } else {
      openError(result.message);
    }
  };

  const handleDeleteContribution = async () => {
    const result = await API.delete(`/teaching/${selectedContribution.TeachingID}`);
    closeDeleteContribModal();
    if (result.isSuccess) {
      setSelectedContribution(null);
      openAlert("Contribution successfully removed");
      await loadTeachingData();
    } else {
      openError(result.message);
    }
  };

  const handleOpenAddContribution = () => {
    setSelectedContribution(null);
    openContribForm("Add Contribution");
  };

  const handleOpenEditContribution = () => {
    if (!selectedContribution) {
      openError("Please select a contribution to edit");
      return;
    }
    openContribForm("Edit Contribution");
  };

  const handleOpenDeleteContribution = () => {
    if (!selectedContribution) {
      openError("Please select a contribution to delete");
      return;
    }
    openDeleteContribModal();
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
        <ModuleForm initialModule={moduleData} onCancel={closeForm} onSubmit={handleModify} />
      </Modal>

      <Modal show={showContribForm} title={contribFormTitle}>
        <ModuleContributionForm
          moduleId={parseInt(moduleId)}
          initialContribution={
            selectedContribution
              ? {
                  TeachingID:         selectedContribution.TeachingID,
                  UserID:             selectedContribution.TeachingUserID,
                  ModuleID:           selectedContribution.TeachingModuleID,
                  TeachingLeading:    selectedContribution.TeachingLeading,
                  TeachingLecturing:  selectedContribution.TeachingLecturing,
                  TeachingWorkshops:  selectedContribution.TeachingWorkshops,
                  TeachingAssessing:  selectedContribution.TeachingAssessing,
                  TeachingModeration: selectedContribution.TeachingModeration,
                }
              : null
          }
          onCancel={closeContribForm}
          onSubmit={selectedContribution == null ? handleAddContribution : handleModifyContribution}
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

      <DeleteConfirmation
        show={showDeleteContribModal}
        itemType="contribution"
        itemName={selectedContribution ? `${selectedContribution.UserFirstname} ${selectedContribution.UserLastname}` : "this contribution"}
        onConfirm={handleDeleteContribution}
        onCancel={closeDeleteContribModal}
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
          <p>
            <strong>Total Hours</strong>
            {isCalculatingHours ? "Calculating…" : `${totalModuleHours} hrs`}
          </p>
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
            OnRowClick={(i) => setSelectedContribution(teachingStaff[i])}
            OnUnSelect={() => setSelectedContribution(null)}
          />
        )}
      </div>

      <Actions.Tray>
        <Actions.Add
          showText
          buttonText="Add Contribution"
          onClick={handleOpenAddContribution}
        />
        <Actions.Modify
          showText
          buttonText="Edit Contribution"
          onClick={handleOpenEditContribution}
        />
        <Actions.Delete
          showText
          buttonText="Remove Contribution"
          onClick={handleOpenDeleteContribution}
        />
      </Actions.Tray>
    </>
  );
}
