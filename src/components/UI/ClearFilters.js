import "./ClearFilters.css";

export default function ClearFilters({ onClear, hasActiveFilters, className = "" }) {
  return (
    <div className={`clear-filters ${className}`}>
      <button
        onClick={onClear}
        className="clear-button"
        disabled={!hasActiveFilters}
        type="button"
      >
        Clear Search &amp; Filters
      </button>
    </div>
  );
}
