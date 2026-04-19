import { CardContainer } from "../../UI/Card.js";
import ModuleCard from "./ModuleCard.js";
import Pagination from "../../UI/Pagination.js";

export default function ModuleGrid({
  isModulesLoading,
  loadingMessage,
  filteredModules,
  searchQuery,
  paginatedModules,
  currentPage,
  totalPages,
  onPageChange,
}) {
  if (isModulesLoading) return <p>{loadingMessage}</p>;

  if (filteredModules.length === 0) {
    return <p>{searchQuery ? "No modules match your search." : "No records found..."}</p>;
  }

  return (
    <>
      <CardContainer>
        {paginatedModules.map((module) => (
          <ModuleCard module={module} key={module.ModuleID} />
        ))}
      </CardContainer>
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={onPageChange}
      />
    </>
  );
}
