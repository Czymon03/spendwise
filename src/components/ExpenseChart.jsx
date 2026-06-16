import { useEffect, useRef } from 'react'
import {
  Chart,
  ArcElement,
  BarElement,
  PieController,
  BarController,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend
} from 'chart.js'

Chart.register(ArcElement, BarElement, PieController, BarController, CategoryScale, LinearScale, Tooltip, Legend)

function ExpenseChart({ categoryStats, monthlyData }) {
  const pieCanvasRef = useRef(null)
  const barCanvasRef = useRef(null)
  const pieChartRef = useRef(null)
  const barChartRef = useRef(null)

  useEffect(() => {
    if (!pieCanvasRef.current || !barCanvasRef.current) return

    pieChartRef.current?.destroy()
    barChartRef.current?.destroy()

    const pieCtx = pieCanvasRef.current.getContext('2d')
    const barCtx = barCanvasRef.current.getContext('2d')

    pieChartRef.current = new Chart(pieCtx, {
      type: 'pie',
      data: {
        labels: categoryStats.map((stat) => stat.category),
        datasets: [
          {
            data: categoryStats.map((stat) => stat.amount),
            backgroundColor: [
              '#4f46e5',
              '#14b8a6',
              '#fb7185',
              '#f59e0b',
              '#6366f1',
              '#22c55e',
              '#38bdf8'
            ],
            borderWidth: 0
          }
        ]
      },
      options: {
        plugins: { legend: { position: 'bottom' } },
        responsive: true,
        maintainAspectRatio: false
      }
    })

    barChartRef.current = new Chart(barCtx, {
      type: 'bar',
      data: {
        labels: monthlyData.map((item) => item.label),
        datasets: [
          {
            label: 'Monthly Spending',
            data: monthlyData.map((item) => item.amount),
            backgroundColor: '#2563eb'
          }
        ]
      },
      options: {
        plugins: { legend: { display: false } },
        responsive: true,
        maintainAspectRatio: false,
        scales: {
          y: { beginAtZero: true }
        }
      }
    })

    return () => {
      pieChartRef.current?.destroy()
      barChartRef.current?.destroy()
    }
  }, [categoryStats, monthlyData])

  return (
    <section className="card chart-card">
      <div className="section-header">
        <div>
          <p className="label">Spending Overview</p>
          <h2>Category insights</h2>
        </div>
      </div>

      <div className="chart-grid">
        <div className="chart-panel">
          <p className="chart-title">Spending by category</p>
          <canvas ref={pieCanvasRef} />
        </div>
        <div className="chart-panel">
          <p className="chart-title">Last 6 months</p>
          <canvas ref={barCanvasRef} />
        </div>
      </div>
    </section>
  )
}

export default ExpenseChart
