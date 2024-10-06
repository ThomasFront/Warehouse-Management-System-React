import { render, screen } from "@testing-library/react"
import AddIcon from '@mui/icons-material/Add';
import { MemoryRouter } from "react-router-dom"
import { DashboardDataItem } from "./DashboardDataItem"

describe("DashboardDataItem", () => {
  it("should render title correctly", () => {
    render(
      <MemoryRouter>
        <DashboardDataItem
          title="exampleTitle"
          count={10}
          icon={<AddIcon />}
          color="#000"
          navigateTo="/examplePath"
          isLoading={false}
        />
      </MemoryRouter>
    )

    const title = screen.getByText("exampleTitle")
    expect(title).toBeInTheDocument()
  })

  it("should render count correctly", () => {
    render(
      <MemoryRouter>
        <DashboardDataItem
          title="exampleTitle"
          count={10}
          icon={<AddIcon />}
          color="#000"
          navigateTo="/examplePath"
          isLoading={false}
        />
      </MemoryRouter>
    )

    const count = screen.getByText(10)
    expect(count).toBeInTheDocument()
  })

  it("should render icon correctly", () => {
    render(
      <MemoryRouter>
        <DashboardDataItem
          title="exampleTitle"
          count={10}
          icon={<AddIcon />}
          color="#000"
          navigateTo="/examplePath"
          isLoading={false}
        />
      </MemoryRouter>
    )

    const addIcon = screen.queryByTestId("AddIcon")
    expect(addIcon).toBeInTheDocument()
  })

  it("should has background color from props", () => {
    render(
      <MemoryRouter>
        <DashboardDataItem
          title="exampleTitle"
          count={10}
          icon={<AddIcon />}
          color="#000"
          navigateTo="/examplePath"
          isLoading={false}
        />
      </MemoryRouter>
    )

    const item = screen.getByText("exampleTitle")
    const computedStyle = getComputedStyle(item)
    expect(computedStyle.color).toBe("rgb(255, 255, 255)")
  })
})
