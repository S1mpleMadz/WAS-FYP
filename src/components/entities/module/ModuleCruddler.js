import Actions from "../../UI/Actions.js";
import { Alert, Error } from "../../UI/Notifications.js";
import { CardContainer } from "../../UI/Card.js";
import { useState } from "react";
import ModuleCard from "./ModuleCard.js";
import ModuleForm from "./ModuleForm.js";
import Search from "../../UI/Search.js";
import useLoad from "../../api/useLoad.js";
import { useModal, Modal } from "../../UI/Modal.js";
import "../../UI/Modal.css";
import "./ModuleCruddler.css";
import API from "../../api/API.js";
import "../../layouts/Sidebar.css";
import Filter from "../../UI/Filter.js";
import ClearFilters from "../../UI/ClearFilters.js";
import Pagination from "../../UI/Pagination.js";

export default function ModuleCruddler({ endpoint }) {
  const [modules, isModulesLoading, loadingMessage, loadModules] =
    useLoad(endpoint);
  const [showForm, formTitle, openForm, closeForm] = useModal(false);
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
      selectedDepartments.length === 0 ||
      selectedDepartments.includes(module.DepartmentName);

    const matchesLevel =
      selectedLevels.length === 0 ||
      selectedLevels.includes(String(module.ModuleLevel));

    return matchesSearch && matchesDepartment && matchesLevel;
  });

  const totalPages = Math.ceil(filteredModules.length / modulesPerPage);
  const startIndex = (currentPage - 1) * modulesPerPage;
  const paginatedModules = filteredModules.slice(
    startIndex,
    startIndex + modulesPerPage,
  );

  const uniqueDepartments = [
    ...new Set(modules.map((m) => m.DepartmentName).filter(Boolean)),
  ].sort();

  const uniqueLevels = [
    ...new Set(modules.map((m) => String(m.ModuleLevel)).filter(Boolean)),
  ].sort();

  return (
    <>
      <Modal show={showForm} title={formTitle}>
        <ModuleForm onCancel={closeForm} onSubmit={handleSubmit} />
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
        </Actions.Tray>

        <div className="sidebar">
          <aside>
            <div className="searchContainer">
              <h2>Search</h2>
              <Search
                searchQuery={searchQuery}
                onSearchChange={setSearchQuery}
                placeholder="Search by name or code..."
              />

              <h2>Filter</h2>
              <Filter
                title="Department"
                options={uniqueDepartments}
                selectedOptions={selectedDepartments}
                onOptionChange={setSelectedDepartments}
              />
              <Filter
                title="Level"
                options={uniqueLevels}
                selectedOptions={selectedLevels}
                onOptionChange={setSelectedLevels}
              />
            </div>

            <ClearFilters
              onClear={handleClearFilters}
              hasActiveFilters={
                searchQuery !== "" ||
                selectedDepartments.length > 0 ||
                selectedLevels.length > 0
              }
            />
          </aside>

          <div className="content">
            {isModulesLoading ? (
              <p>{loadingMessage}</p>
            ) : filteredModules.length === 0 ? (
              <p>
                {searchQuery
                  ? "No modules match your search."
                  : "No records found..."}
              </p>
            ) : (
              <>
                <CardContainer>
                  {paginatedModules.map((module) => (
                    <ModuleCard module={module} key={module.ModuleID} />
                  ))}
                </CardContainer>
                <Pagination
                  currentPage={currentPage}
                  totalPages={totalPages}
                  onPageChange={setCurrentPage}
                />
              </>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
