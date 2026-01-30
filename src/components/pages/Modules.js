import { useEffect, useState } from "react";
import API from "../api/API.js";
import Action from "../UI/Actions.js";
import { CardContainer } from "../UI/Card.js";
import Modal, { useModal } from "../UI/Modal.js";
import ModuleForm from "../entities/module/ModulesForm.js";
import ModuleCard from "../entities/module/ModuleCard.js";

export default function Modules() {
  // State
  const [modules, setModules] = useState(null);
  const [loadingMessage, setLoadingMessage] = useState("Loading records...");

  // Modal Hook
  const [showModal, modalContent, openModal, closeModal] = useModal(false);

  // Methods
  const getModules = async () => {
    const response = await API.get("/modules");
    if (response.isSuccess) {
      setModules(response.result);
    } else {
      setLoadingMessage(response.message);
      setModules([]);
    }
  };

  useEffect(() => {
    getModules();
  }, []);

  const handleSubmit = async (module) => {
    const response = await API.post("/modules", module);
    if (response.isSuccess) {
      closeModal();
      getModules(); // Refresh the list
    }
  };

  const handleAdd = () => {
    openModal(<ModuleForm onDismiss={closeModal} onSubmit={handleSubmit} />);
  };

  // View
  return (
    <section className="modules-page">
      <Modal show={showModal} title="Add New Module">
        {modalContent}
      </Modal>

      <div className="module-header">
        <h1>Module Directory</h1>
        <Action.Tray>
          <Action.Add showText buttonText="Add Module" onClick={handleAdd} />
          <Action.ListAll showText buttonText="List All" onClick={getModules} />
        </Action.Tray>
      </div>

      <hr className="divider" />

      {!modules ? (
        <p className="status-message">{loadingMessage}</p>
      ) : modules.length === 0 ? (
        <p className="status-message">No modules found.</p>
      ) : (
        <CardContainer>
          {modules.map((module) => (
            <ModuleCard module={module} key={module.ModuleID} />
          ))}
        </CardContainer>
      )}
    </section>
  );
}
