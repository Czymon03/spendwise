function FilterBar({ categories, filters, onFilterChange, onClear }) {
  return (
    <section className="card filter-card">
      <div className="filter-row">
        <div className="filter-group">
          <label>
            <span>Category</span>
            <select
              value={filters.category}
              onChange={(event) => onFilterChange({ ...filters, category: event.target.value })}
            >
              <option value="All">All</option>
              {categories.map((category) => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
            </select>
          </label>

          <label>
            <span>Search</span>
            <input
              type="search"
              placeholder="Search description"
              value={filters.search}
              onChange={(event) => onFilterChange({ ...filters, search: event.target.value })}
            />
          </label>
        </div>

        <button className="button button-outline" onClick={onClear}>
          Clear filters
        </button>
      </div>
    </section>
  )
}

export default FilterBar
