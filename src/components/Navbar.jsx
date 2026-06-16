function Navbar({ darkMode, setDarkMode }) {
  return (
    <header className="navbar">
      <div className="brand-row">
        <div className="brand-mark">ET</div>
        <div>
          <p className="brand-title">Expense Tracker</p>
          <p className="brand-subtitle">Smart budget dashboard</p>
        </div>
      </div>
      <button className="toggle-button" onClick={() => setDarkMode((prev) => !prev)}>
        {darkMode ? 'Light mode' : 'Dark mode'}
      </button>
    </header>
  )
}

export default Navbar
