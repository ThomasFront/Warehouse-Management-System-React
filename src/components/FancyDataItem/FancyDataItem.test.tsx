import { render, screen } from "@testing-library/react"
import { FancyDataItem } from "./FancyDataItem"

describe("FancyDataItem", () => {
  it("should render FancyDataItem correctly", () => {
    render(<FancyDataItem label="exampleLabel" value="exampleValue" colorTheme="#000" />)

    const dataItem = screen.queryByTestId("fancyDataItem")
    expect(dataItem).toBeInTheDocument()
  })

  it("should render FancyDataItem label and value", () => {
    render(<FancyDataItem label="exampleLabel" value="exampleValue" colorTheme="#000" />)

    const label = screen.queryByText("exampleLabel")
    const value = screen.queryByText("exampleValue")

    expect(label).toBeInTheDocument()
    expect(value).toBeInTheDocument()
  })
})