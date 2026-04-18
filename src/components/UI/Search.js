import "./Search.css";

function Search({ searchQuery, onSearchChange, placeholder = "Search...", className = "" }) {
  return (
    <div className={`search-input ${className}`}>
      <input
        type="text"
        placeholder={placeholder}
        value={searchQuery}
        onChange={(e) => onSearchChange(e.target.value)}
      />
    </div>
  );
}

export default Search;
