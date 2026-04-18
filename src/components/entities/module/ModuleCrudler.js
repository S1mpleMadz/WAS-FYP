import Actions from "../../UI/Actions.js";
import { useState } from "react";
import { Alert, Error } from "../../UI/Notifications.js";
import { CardContainer } from "../../UI/Card.js";
import ModuleCard from "./ModuleCard.js";
import ModuleForm from "./ModuleForm.js";
import Search from "../../UI/Search.js";
import Filter from "../../UI/Filter.js";
import useLoad from "../../api/useLoad.js";
import { useModal, Modal } from "../../UI/Modal.js";
import "../../UI/Modal.css";
import API from "../../api/API.js";
import "../../layouts/Sidebar.css";
import "./ModuleCrudler.css";
import ParametersForm from "./ParameterForm.js";
import ClearFilters from "../../UI/ClearFilters.js";

function ModuleCrudler({ endpoint }) {
  const postModuleEndpoint = `/modules`;
  const parameterEndpoint = `/parameters`;

  const [modules, , loadingMessage, loadModules] = useLoad(endpoint);
  const [parameters, , , loadParameters] = useLoad(parameterEndpoint);
  const [showForm, formTitle, openForm, closeForm] = useModal(false);
  const [showParamForm, paramFormTitle, openParamForm, closeParamForm] = useModal(false);
  const [showAlert, alert, openAlert, closeAlert] = useModal(false);
  const [showError, error, openError, closeError] = useModal(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedLeaders, setSelectedLeaders] = useState([]);
  const [selectedCredits, setSelectedCredits] = useState([]);
  const [selectedLevels, setSelectedLevels] = useState([]);

  const handleSubmit = async (module) => {
    const result = await API.post(postModuleEndpoint, module);
    if (result.isSuccess) {
      closeForm();
      openAlert("Module successfully added");
      await loadModules();
    } else {
      openError(result.message);
    }
  };

  const handleModifyParam = async (parameters) => {
    const putEndpoint = `/parameters`;
    const result = await API.put(putEndpoint, parameters);
    if (result.isSuccess) {
      closeParamForm();
      openAlert("Parameters successfully changed");
      await loadParameters();
    } else {
      openError(result.message);
    }
  };

  const handleClearFilters = () => {
    setSearchQuery("");
    setSelectedLeaders([]);
    setSelectedCredits([]);
    setSelectedLevels([]);
  };

  const uniqueLeaders = [...new Set(modules?.map((module) => module.ModuleLeaderName).filter(Boolean))].sort();
  const uniqueCredits = [...new Set(modules?.map((module) => module.ModuleCredits).filter(Boolean))].sort(
    (a, b) => a - b
  );
  const uniqueLevels = [...new Set(modules?.map((module) => module.ModuleLevel).filter(Boolean))].sort((a, b) => a - b);
  const filteredModules = modules.filter((module) => {
    const matchesSearch =
      module.ModuleName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      module.ModuleCode.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesLeader = selectedLeaders.length === 0 || selectedLeaders.includes(module.ModuleLeaderName);
    const matchesCredit = selectedCredits.length === 0 || selectedCredits.includes(module.ModuleCredits);
    const matchesLevel = selectedLevels.length === 0 || selectedLevels.includes(module.ModuleLevel);

    return matchesSearch && matchesLeader && matchesCredit && matchesLevel;
  });

  const addNewModule = "Add new module";
  const modifyParams = "Modify the Parameters";
  return (
    <>
      <Modal show={showForm} title={formTitle}>
        <ModuleForm onCancel={closeForm} onSubmit={handleSubmit} />
      </Modal>
      <Modal show={showParamForm} title={paramFormTitle}>
        <ParametersForm initialParams={parameters} onCancel={closeParamForm} onSubmit={handleModifyParam} />
      </Modal>
      <Alert
        show={showAlert}
        message={alert}
        onDismiss={() => {
          closeAlert();
        }}
      />
      <Error show={showError} message={error} onDismiss={closeError} />
      <div className="panel">
        <Actions.Tray>
          {!showForm && <Actions.Add showText buttonText="Add new module" onClick={() => openForm(addNewModule)} />}
          {!showForm && (
            <Actions.Modify showText buttonText="Edit the Parameters" onClick={() => openParamForm(modifyParams)} />
          )}
        </Actions.Tray>

        <div className="sidebar">
          <aside>
            <div className="searchContainer">
              <h2>Search</h2>
              <Search
                searchQuery={searchQuery}
                onSearchChange={setSearchQuery}
                placeholder="Search by name or module code..."
              />

              <h2>Filter</h2>
              <Filter
                title="Module Leader"
                options={uniqueLeaders}
                selectedOptions={selectedLeaders}
                onOptionChange={setSelectedLeaders}
              />

              <Filter
                title="Credits"
                options={uniqueCredits}
                selectedOptions={selectedCredits}
                onOptionChange={setSelectedCredits}
                formatLabel={(credit) => `${credit} Credits`}
              />

              <Filter
                title="Level"
                options={uniqueLevels}
                selectedOptions={selectedLevels}
                onOptionChange={setSelectedLevels}
                formatLabel={(level) => `Level ${level}`}
              />
            </div>

            <ClearFilters
              onClear={handleClearFilters}
              hasActiveFilters={
                searchQuery !== "" ||
                selectedLeaders.length > 0 ||
                selectedCredits.length > 0 ||
                selectedLevels.length > 0
              }
            />
          </aside>

          <div className="content">
            {!modules ? (
              <p>{loadingMessage}</p>
            ) : filteredModules.length === 0 ? (
              <p>{searchQuery ? "No Modules match your search." : "No records found..."}</p>
            ) : (
              <CardContainer>
                {filteredModules.map((module) => (
                  <ModuleCard module={module} key={module.ModuleName} />
                ))}
              </CardContainer>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export default ModuleCrudler;
