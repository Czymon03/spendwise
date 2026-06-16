export function calculateTotals(expenses) {
  const now = new Date()
  const currentMonth = now.getMonth()
  const currentYear = now.getFullYear()

  const total = expenses.reduce((sum, expense) => sum + Number(expense.amount), 0)
  const monthlyTotal = expenses
    .filter((expense) => {
      const date = new Date(expense.date)
      return date.getMonth() === currentMonth && date.getFullYear() === currentYear
    })
    .reduce((sum, expense) => sum + Number(expense.amount), 0)

  return {
    total,
    monthlyTotal,
    transactionCount: expenses.length
  }
}

export function groupByCategory(expenses) {
  const categoryMap = expenses.reduce((acc, expense) => {
    const key = expense.category || 'Other'
    const amount = Number(expense.amount)
    acc[key] = (acc[key] || 0) + amount
    return acc
  }, {})

  const total = Object.values(categoryMap).reduce((sum, value) => sum + value, 0)

  return Object.entries(categoryMap).map(([category, amount]) => ({
    category,
    amount,
    percentage: total ? Number(((amount / total) * 100).toFixed(1)) : 0
  }))
}

export function monthlySpending(expenses) {
  const monthMap = {}
  const now = new Date()
  const months = Array.from({ length: 6 }, (_, offset) => {
    const date = new Date(now.getFullYear(), now.getMonth() - offset, 1)
    return { label: date.toLocaleString('default', { month: 'short' }), year: date.getFullYear(), month: date.getMonth() }
  }).reverse()

  months.forEach(({ label, month, year }) => {
    const key = `${year}-${month}`
    monthMap[key] = { label, amount: 0 }
  })

  expenses.forEach((expense) => {
    const date = new Date(expense.date)
    const key = `${date.getFullYear()}-${date.getMonth()}`
    if (monthMap[key]) {
      monthMap[key].amount += Number(expense.amount)
    }
  })

  return Object.values(monthMap)
}
