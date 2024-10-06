import { render, screen } from "@testing-library/react"
import { DashboardCharts } from "./DashboardCharts";

describe("DashboardCharts", () => {
  it("should render monthly sales chart", () => {
    render(<DashboardCharts />)

    const monthlySalesChart = screen.getByTestId("monthlySalesChart")
    expect(monthlySalesChart).toBeInTheDocument()
  })

  it("should render top products chart", () => {
    render(<DashboardCharts />)

    const topProductsChart = screen.getByTestId("topProductsChart")
    expect(topProductsChart).toBeInTheDocument()
  })
})
