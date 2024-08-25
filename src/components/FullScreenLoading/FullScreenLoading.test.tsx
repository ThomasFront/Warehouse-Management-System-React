import { render, screen } from "@testing-library/react"
import { FullScreenLoading } from "./FullScreenLoading"

describe("FullScreenLoading", () => {
  it("should render Backdrop when open prop is provided", () => {
    render(<FullScreenLoading open />)

    const backdropElement = screen.queryByTestId("backdrop")
    expect(backdropElement).toBeInTheDocument()
  })
})
