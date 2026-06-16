import { useEffect, useMemo, useState } from 'react'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import Navbar from './components/Navbar.jsx'
import Dashboard from './components/Dashboard.jsx'
import ExpenseForm from './components/ExpenseForm.jsx'
import ExpenseList from './components/ExpenseList.jsx'
import ExpenseChart from './components/ExpenseChart.jsx'
import FilterBar from './components/FilterBar.jsx'
import useLocalStorage from './hooks/useLocalStorage.js'
import { calculateTotals, groupByCategory, monthlySpending } from './utils/calculations.js'
import { exportExpensesToCsv } from './utils/csvExport.js'

const defaultCategories = [
  'Food',
  'Transportation',
  'Entertainment',
  'Shopping',
  'Bills',
  'Education',
  'Other'
]

const initialFilters = {
  category: 'All',
  search: ''
}

function App() {
  const [expenses, setExpenses] = useLocalStorage('expenses', [])
  const [darkMode, setDarkMode] = useLocalStorage('darkMode', false)
  const [filters, setFilters] = useState(initialFilters)
  const [selectedExpense, setSelectedExpense] = useState(null)

  useEffect(() => {
    document.documentElement.dataset.theme = darkMode ? 'dark' : 'light'
  }, [darkMode])

  const filteredExpenses = useMemo(() => {
    return expenses
      .filter((expense) =>
        filters.category === 'All' ? true : expense.category === filters.category
      )
      .filter((expense) =>
        expense.description.toLowerCase().includes(filters.search.toLowerCase())
      )
      .sort((a, b) => new Date(b.date) - new Date(a.date))
  }, [expenses, filters])

  const totals = useMemo(() => calculateTotals(expenses), [expenses])
  const categoryStats = useMemo(() => groupByCategory(expenses), [expenses])
  const monthlyData = useMemo(() => monthlySpending(expenses), [expenses])

  const handleAddExpense = (expense) => {
    setExpenses((prev) => [expense, ...prev])
    toast.success('Expense added successfully')
  }

  const handleDeleteExpense = (id) => {
    setExpenses((prev) => prev.filter((expense) => expense.id !== id))
    if (selectedExpense === id) {
      setSelectedExpense(null)
    }
    toast.info('Expense removed')
  }

  const handleClearAll = () => {
    if (!expenses.length) {
      toast.warning('No expenses to clear')
      return
    }
    const confirmed = window.confirm('Clear all expenses? This cannot be undone.')
    if (confirmed) {
      setExpenses([])
      toast.success('All expenses cleared')
    }
  }

  const handleExportCsv = () => {
    if (!expenses.length) {
      toast.warning('No expenses to export')
      return
    }
    exportExpensesToCsv(expenses)
    toast.success('CSV export ready')
  }

  const handleFilterChange = (newFilters) => {
    setFilters(newFilters)
  }

  return (
    <div className="app-shell">
      <Navbar darkMode={darkMode} setDarkMode={setDarkMode} />
      <main className="content">
        <section className="hero-card">
          <div>
            <p className="eyebrow">Expense Tracker</p>
            <h1>Manage your spending with ease.</h1>
            <p className="hero-copy">
              Track expenses, analyze your budget with charts, and keep your data safe in LocalStorage.
            </p>
          </div>
          <div className="hero-actions">
            <button className="button button-secondary" onClick={handleExportCsv}>
              Export CSV
            </button>
            <button className="button button-outline" onClick={handleClearAll}>
              Clear All
            </button>
          </div>
        </section>

        <Dashboard totals={totals} />

        <section className="grid-two-up">
          <ExpenseForm categories={defaultCategories} onSubmit={handleAddExpense} />
          <ExpenseChart categoryStats={categoryStats} monthlyData={monthlyData} />
        </section>

        <FilterBar
          categories={defaultCategories}
          filters={filters}
          onFilterChange={handleFilterChange}
          onClear={() => setFilters(initialFilters)}
        />

        <ExpenseList
          expenses={filteredExpenses}
          onDelete={handleDeleteExpense}
          selectedExpense={selectedExpense}
          onSelect={setSelectedExpense}
        />
      </main>
      <ToastContainer position="top-right" autoClose={2500} hideProgressBar theme={darkMode ? 'dark' : 'light'} />
    </div>
  )
}

export default App
