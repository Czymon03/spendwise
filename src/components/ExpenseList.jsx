function ExpenseList({ expenses, onDelete }) {
  return (
    <section className="card table-card">
      <div className="section-header">
        <div>
          <p className="label">Expense History</p>
          <h2>Transactions</h2>
        </div>
      </div>

      {expenses.length === 0 ? (
        <div className="empty-state">
          <p>No expenses added yet. Add a transaction to get started.</p>
        </div>
      ) : (
        <div className="table-wrapper">
          <table>
            <thead>
              <tr>
                <th>Date</th>
                <th>Description</th>
                <th>Category</th>
                <th>Amount</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {expenses.map((expense) => (
                <tr key={expense.id}>
                  <td>{new Date(expense.date).toLocaleDateString()}</td>
                  <td>{expense.description}</td>
                  <td>{expense.category}</td>
                  <td>${Number(expense.amount).toFixed(2)}</td>
                  <td>
                    <button className="icon-button" onClick={() => onDelete(expense.id)}>
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </section>
  )
}

export default ExpenseList
