import Actions from "../../UI/Actions.js";
import { Alert, Error } from "../../UI/Notifications.js";
import { useState } from "react";
import ModuleForm from "./ModuleForm.js";
import ParametersForm from "./ParametersForm.js";
import ModuleFilters from "./ModuleFilters.js";
import ModuleGrid from "./ModuleGrid.js";
import useLoad from "../../api/useLoad.js";
import { useModal, Modal } from "../../UI/Modal.js";
import "../../UI/Modal.css";
import "./ModuleCruddler.css";
import API from "../../api/API.js";
import "../../layouts/Sidebar.css";

export default function ModuleCruddler({ endpoint }) {
  const [modules, isModulesLoading, loadingMessage, loadModules] = useLoad(endpoint);
  const [parameters, , , loadParameters] = useLoad("/parameters");
  const [showForm, formTitle, openForm, closeForm] = useModal(false);
  const [showParamsForm, paramsFormTitle, openParamsForm, closeParamsForm] = useModal(false);
  const [showAlert, alertMessage, openAlert, closeAlert] = useModal(false);
  const [showError, errorMessage, openError, closeError] = useModal(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedDepartments, setSelectedDepartments] = useState([]);
  const [selectedLevels, setSelectedLevels] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const modulesPerPage = 12;

  const handleSubmit = async (module) => {
    const result = await API.post(endpoint, module);
    if (result.isSuccess) {
      closeForm();
      openAlert("Module successfully added");
      await loadModules();
    } else {
      openError(result.message);
    }
  };

  const handleUpdateParameters = async (updatedParams) => {
    const result = await API.put(`/parameters/${updatedParams.ParameterID}`, updatedParams);
    if (result.isSuccess) {
      closeParamsForm();
      openAlert("Parameters successfully updated");
      await loadParameters();
    } else {
      openError(result.message);
    }
  };

  const handleClearFilters = () => {
    setSearchQuery("");
    setSelectedDepartments([]);
    setSelectedLevels([]);
    setCurrentPage(1);
  };

  const filteredModules = modules.filter((module) => {
    const matchesSearch =
      module.ModuleName?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      module.ModuleCode?.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesDepartment =
      selectedDepartments.length === 0 || selectedDepartments.includes(module.DepartmentName);
    const matchesLevel =
      selectedLevels.length === 0 || selectedLevels.includes(String(module.ModuleLevel));
    return matchesSearch && matchesDepartment && matchesLevel;
  });

  const totalPages = Math.ceil(filteredModules.length / modulesPerPage);
  const startIndex = (currentPage - 1) * modulesPerPage;
  const paginatedModules = filteredModules.slice(startIndex, startIndex + modulesPerPage);

  const uniqueDepartments = [...new Set(modules.map((m) => m.DepartmentName).filter(Boolean))].sort();
  const uniqueLevels = [...new Set(modules.map((m) => String(m.ModuleLevel)).filter(Boolean))].sort();
  const parametersData = parameters && parameters.length > 0 ? parameters[0] : null;

  return (
    <>
      <Modal show={showForm} title={formTitle}>
        <ModuleForm onCancel={closeForm} onSubmit={handleSubmit} />
      </Modal>
      <Modal show={showParamsForm} title={paramsFormTitle}>
        {parametersData && (
          <ParametersForm
            initialParameters={parametersData}
            onCancel={closeParamsForm}
            onSubmit={handleUpdateParameters}
          />
        )}
      </Modal>
      <Error show={showError} message={errorMessage} onDismiss={closeError} />
      <Alert show={showAlert} message={alertMessage} onDismiss={closeAlert} />

      <div className="panel">
        <Actions.Tray>
          {!showForm && (
            <Actions.Add
              showText
              buttonText="Add New Module"
              onClick={() => openForm("Add New Module")}
            />
          )}
          <Actions.Modify
            showText
            buttonText="Edit Parameters"
            onClick={() => openParamsForm("Edit Parameters")}
          />
        </Actions.Tray>

        <div className="sidebar">
          <ModuleFilters
            searchQuery={searchQuery}
            onSearchChange={setSearchQuery}
            uniqueDepartments={uniqueDepartments}
            selectedDepartments={selectedDepartments}
            onDepartmentsChange={setSelectedDepartments}
            uniqueLevels={uniqueLevels}
            selectedLevels={selectedLevels}
            onLevelsChange={setSelectedLevels}
            onClear={handleClearFilters}
            hasActiveFilters={searchQuery !== "" || selectedDepartments.length > 0 || selectedLevels.length > 0}
          />
          <div className="content">
            <ModuleGrid
              isModulesLoading={isModulesLoading}
              loadingMessage={loadingMessage}
              filteredModules={filteredModules}
              searchQuery={searchQuery}
              paginatedModules={paginatedModules}
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={setCurrentPage}
            />
          </div>
        </div>
      </div>
    </>
  );
}
