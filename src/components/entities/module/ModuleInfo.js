import { useParams, useNavigate } from "react-router-dom";
import API from "../../api/API.js";
import useLoad from "../../api/useLoad.js";
import Action from "../../UI/Actions.js";
import Modal, { useModal } from "../../UI/Modal.js";
import ModuleForm from "./ModuleForm.js";
import "./Modules.css";

export default function ModuleInfo() {
  const { id } = useParams(); // Matches /module/:id
  const navigate = useNavigate();

  // Modal Hook
  const [showModal, modalContent, openModal, closeModal] = useModal(false);

  // Fetch Data (returns an array, usually we need the first item)
  const [module, isLoading, loadError] = useLoad(`/modules/${id}`);
  const moduleData = module ? module[0] : null;

  // Handlers
  const handleDelete = async () => {
    if (window.confirm("Are you sure you want to delete this module?")) {
      const response = await API.delete(`/modules/${id}`);
      if (response.isSuccess) navigate("/modules");
    }
  };

  const handleEditSubmit = async (updatedModule) => {
    const response = await API.put(`/modules/${id}`, updatedModule);
    if (response.isSuccess) {
      closeModal();
      window.location.reload(); // Reload to show updated data
    }
  };

  const openEditModal = () => {
    openModal(
      <ModuleForm
        initialModule={moduleData}
        onDismiss={closeModal}
        onSubmit={handleEditSubmit}
      />,
    );
  };

  if (isLoading || !moduleData)
    return <p>{loadError || "Loading module details..."}</p>;

  return (
    <div className="module-info-container">
      <Modal show={showModal} title="Edit Module">
        {modalContent}
      </Modal>

      <div className="module-profile-header">
        <img src={moduleData.ModuleImageURL} alt={moduleData.ModuleName} />
        <div className="header-text">
          <h1>
            {moduleData.ModuleCode} {moduleData.ModuleName}
          </h1>
          <p>Level {moduleData.ModuleLevel}</p>
        </div>
      </div>

      <div className="module-data-grid">
        <div className="data-row">
          <strong>Department:</strong> <span>{moduleData.DepartmentName}</span>
        </div>
        <div className="data-row">
          <strong>Module Leader:</strong>
          <span>
            {moduleData.UserFirstname} {moduleData.UserLastname} (
            {moduleData.UserEmail})
          </span>
        </div>
      </div>

      <div className="action-bar">
        <Action.Tray>
          <Action.Modify showText buttonText="Edit" onClick={openEditModal} />
          <Action.Delete showText buttonText="Delete" onClick={handleDelete} />
          <Action.Cancel
            showText
            buttonText="Back"
            onClick={() => navigate("/modules")}
          />
        </Action.Tray>
      </div>
    </div>
  );
}
