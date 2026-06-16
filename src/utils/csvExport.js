export function exportExpensesToCsv(expenses) {
  const headers = ['Date', 'Description', 'Category', 'Amount']
  const rows = expenses.map((expense) => [expense.date, expense.description, expense.category, expense.amount])
  const csvContent = [headers, ...rows].map((row) => row.map(escapeCsv).join(',')).join('\n')
  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' })
  const url = URL.createObjectURL(blob)
  const link = document.createElement('a')
  link.href = url
  link.download = `expenses-${new Date().toISOString().slice(0, 10)}.csv`
  link.click()
  URL.revokeObjectURL(url)
}

function escapeCsv(value) {
  const stringValue = String(value).replace(/"/g, '""')
  return `"${stringValue}"`
}
