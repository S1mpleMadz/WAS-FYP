import Search from "../../UI/Search.js";
import Filter from "../../UI/Filter.js";
import ClearFilters from "../../UI/ClearFilters.js";

export default function ModuleFilters({
  searchQuery,
  onSearchChange,
  uniqueDepartments,
  selectedDepartments,
  onDepartmentsChange,
  uniqueLevels,
  selectedLevels,
  onLevelsChange,
  onClear,
  hasActiveFilters,
}) {
  return (
    <aside>
      <div className="searchContainer">
        <h2>Search</h2>
        <Search
          searchQuery={searchQuery}
          onSearchChange={onSearchChange}
          placeholder="Search by name or code..."
        />

        <h2>Filter</h2>
        <Filter
          title="Department"
          options={uniqueDepartments}
          selectedOptions={selectedDepartments}
          onOptionChange={onDepartmentsChange}
        />
        <Filter
          title="Level"
          options={uniqueLevels}
          selectedOptions={selectedLevels}
          onOptionChange={onLevelsChange}
        />
      </div>

      <ClearFilters onClear={onClear} hasActiveFilters={hasActiveFilters} />
    </aside>
  );
}
