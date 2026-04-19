import Actions from "../../UI/Actions.js";
import { Alert, Error } from "../../UI/Notifications.js";
import { CardContainer } from "../../UI/Card.js";
import { useState } from "react";
import DutyCard from "./DutyCard.js";
import DutyForm from "./DutyForm.js";
import Search from "../../UI/Search.js";
import useLoad from "../../api/useLoad.js";
import { useModal, Modal } from "../../UI/Modal.js";
import "../../UI/Modal.css";
import "./DutyCruddler.css";
import API from "../../api/API.js";
import "../../layouts/Sidebar.css";
import ClearFilters from "../../UI/ClearFilters.js";
import Pagination from "../../UI/Pagination.js";

export default function DutyCruddler({ endpoint }) {
  const [duties, isDutiesLoading, loadingMessage, loadDuties] =
    useLoad(endpoint);
  const [showForm, formTitle, openForm, closeForm] = useModal(false);
  const [showAlert, alertMessage, openAlert, closeAlert] = useModal(false);
  const [showError, errorMessage, openError, closeError] = useModal(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const dutiesPerPage = 12;

  const handleSubmit = async (duty) => {
    const result = await API.post(endpoint, duty);
    if (result.isSuccess) {
      closeForm();
      openAlert("Duty successfully added");
      await loadDuties();
    } else {
      openError(result.message);
    }
  };

  const handleClearFilters = () => {
    setSearchQuery("");
    setCurrentPage(1);
  };

  const filteredDuties = duties.filter((duty) =>
    duty.DutyName?.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  const totalPages = Math.ceil(filteredDuties.length / dutiesPerPage);
  const startIndex = (currentPage - 1) * dutiesPerPage;
  const paginatedDuties = filteredDuties.slice(
    startIndex,
    startIndex + dutiesPerPage,
  );

  return (
    <>
      <Modal show={showForm} title={formTitle}>
        <DutyForm onCancel={closeForm} onSubmit={handleSubmit} />
      </Modal>
      <Error show={showError} message={errorMessage} onDismiss={closeError} />
      <Alert show={showAlert} message={alertMessage} onDismiss={closeAlert} />
      <div className="panel">
        <Actions.Tray>
          {!showForm && (
            <Actions.Add
              showText
              buttonText="Add New Duty"
              onClick={() => openForm("Add New Duty")}
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
                placeholder="Search by duty name..."
              />
            </div>

            <ClearFilters
              onClear={handleClearFilters}
              hasActiveFilters={searchQuery !== ""}
            />
          </aside>

          <div className="content">
            {isDutiesLoading ? (
              <p>{loadingMessage}</p>
            ) : filteredDuties.length === 0 ? (
              <p>
                {searchQuery
                  ? "No duties match your search."
                  : "No records found..."}
              </p>
            ) : (
              <>
                <CardContainer>
                  {paginatedDuties.map((duty) => (
                    <DutyCard duty={duty} key={duty.DutyID} />
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
