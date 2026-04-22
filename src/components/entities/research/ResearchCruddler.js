import Actions from "../../UI/Actions.js";
import { Alert, Error } from "../../UI/Notifications.js";
import { CardContainer } from "../../UI/Card.js";
import { useState } from "react";
import ResearchCard from "./ResearchCard.js";
import ResearchForm from "./ResearchForm.js";
import Search from "../../UI/Search.js";
import useLoad from "../../api/useLoad.js";
import { useModal, Modal } from "../../UI/Modal.js";
import "../../UI/Modal.css";
import "./ResearchCruddler.css";
import API from "../../api/API.js";
import "../../layouts/Sidebar.css";
import Pagination from "../../UI/Pagination.js";

export default function ResearchCruddler({ endpoint }) {
  const [researchItems, isLoading, loadingMessage, loadResearch] =
    useLoad(endpoint);
  const [showForm, formTitle, openForm, closeForm] = useModal(false);
  const [showAlert, alertMessage, openAlert, closeAlert] = useModal(false);
  const [showError, errorMessage, openError, closeError] = useModal(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 12;

  const handleSubmit = async (research) => {
    const result = await API.post(endpoint, research);
    if (result.isSuccess) {
      closeForm();
      openAlert("Research task successfully added");
      await loadResearch();
    } else {
      openError(result.message);
    }
  };

  const filteredItems = researchItems.filter(
    (r) =>
      r.ResearchName?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      r.ResearchDescription?.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  const totalPages = Math.ceil(filteredItems.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedItems = filteredItems.slice(startIndex, startIndex + itemsPerPage);

  return (
    <>
      <Modal show={showForm} title={formTitle}>
        <ResearchForm onCancel={closeForm} onSubmit={handleSubmit} />
      </Modal>
      <Error show={showError} message={errorMessage} onDismiss={closeError} />
      <Alert show={showAlert} message={alertMessage} onDismiss={closeAlert} />
      <div className="panel">
        <div className="panelToolbar">
          <Actions.Add
            showText
            buttonText="Add Research Task"
            onClick={() => openForm("Add Research Task")}
          />
          <Search
            searchQuery={searchQuery}
            onSearchChange={(val) => { setSearchQuery(val); setCurrentPage(1); }}
            placeholder="Search by name or description..."
            className="search-light"
          />
        </div>

        <div className="content">
          {isLoading ? (
            <p>{loadingMessage}</p>
          ) : filteredItems.length === 0 ? (
            <p>
              {searchQuery
                ? "No research tasks match your search."
                : "No records found..."}
            </p>
          ) : (
            <>
              <CardContainer>
                {paginatedItems.map((r) => (
                  <ResearchCard research={r} key={r.ResearchID} />
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
    </>
  );
}
