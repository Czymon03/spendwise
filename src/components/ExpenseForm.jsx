import { useMemo, useState } from 'react'

const defaultForm = {
  amount: '',
  category: 'Food',
  description: '',
  date: ''
}

function ExpenseForm({ categories, onSubmit }) {
  const [formData, setFormData] = useState(defaultForm)
  const [errors, setErrors] = useState({})

  const isDirty = useMemo(
    () => Object.values(formData).some((value) => value.toString().trim() !== ''),
    [formData]
  )

  const validate = () => {
    const validationErrors = {}
    if (!formData.amount || Number(formData.amount) <= 0) {
      validationErrors.amount = 'Please enter a positive amount'
    }
    if (!formData.description.trim()) {
      validationErrors.description = 'Description is required'
    }
    if (!formData.category) {
      validationErrors.category = 'Category is required'
    }
    if (!formData.date) {
      validationErrors.date = 'Date is required'
    }
    setErrors(validationErrors)
    return Object.keys(validationErrors).length === 0
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    if (!validate()) return

    onSubmit({
      id: `${Date.now()}-${Math.random()}`,
      amount: Number(formData.amount).toFixed(2),
      category: formData.category,
      description: formData.description.trim(),
      date: formData.date
    })
    setFormData(defaultForm)
    setErrors({})
  }

  const handleChange = (event) => {
    const { name, value } = event.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  return (
    <section className="card form-card">
      <div className="section-header">
        <div>
          <p className="label">Add Expense</p>
          <h2>New transaction</h2>
        </div>
      </div>

      <form onSubmit={handleSubmit} noValidate>
        <div className="form-grid">
          <label className="form-field">
            <span>Amount</span>
            <input
              name="amount"
              type="number"
              min="0"
              step="0.01"
              value={formData.amount}
              onChange={handleChange}
              placeholder="0.00"
            />
            {errors.amount && <span className="error-text">{errors.amount}</span>}
          </label>

          <label className="form-field">
            <span>Category</span>
            <select name="category" value={formData.category} onChange={handleChange}>
              {categories.map((category) => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
            </select>
            {errors.category && <span className="error-text">{errors.category}</span>}
          </label>

          <label className="form-field form-field-full">
            <span>Description</span>
            <input
              name="description"
              type="text"
              value={formData.description}
              onChange={handleChange}
              placeholder="Coffee, groceries, ride-share..."
            />
            {errors.description && <span className="error-text">{errors.description}</span>}
          </label>

          <label className="form-field">
            <span>Date</span>
            <input name="date" type="date" value={formData.date} onChange={handleChange} />
            {errors.date && <span className="error-text">{errors.date}</span>}
          </label>
        </div>

        <button className="button button-primary" type="submit">
          {isDirty ? 'Save Expense' : 'Add Expense'}
        </button>
      </form>
    </section>
  )
}

export default ExpenseForm
