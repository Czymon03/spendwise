function Dashboard({ totals }) {
  return (
    <section className="dashboard-grid">
      <div className="card dashboard-card">
        <p className="label">Total Expenses</p>
        <h2>${totals.total.toFixed(2)}</h2>
      </div>
      <div className="card dashboard-card">
        <p className="label">This Month</p>
        <h2>${totals.monthlyTotal.toFixed(2)}</h2>
      </div>
      <div className="card dashboard-card">
        <p className="label">Transactions</p>
        <h2>{totals.transactionCount}</h2>
      </div>
    </section>
  )
}

export default Dashboard
