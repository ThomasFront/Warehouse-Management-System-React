import { render, screen } from "@testing-library/react"
import { CustomPagination } from "./CustomPagination"

describe("CustomPagination", () => {
  it("should render custom pagination", () => {
    render(<CustomPagination page={2} onChange={() => undefined} />)

    const customPagination = screen.queryByTestId("customPagination")
    expect(customPagination).toBeInTheDocument()
  })
})
