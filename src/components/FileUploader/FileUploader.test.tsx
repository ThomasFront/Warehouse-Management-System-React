import { render, screen } from "@testing-library/react"
import { FileUploader } from "./FileUploader"

describe("FileUploader", () => {
  it("should render file uploader", () => {
    render(<FileUploader progress={70} onChange={() => ""} />)

    const fileUploader = screen.queryByTestId("fileUploader")
    expect(fileUploader).toBeInTheDocument()
  })

  it("should render progress bar", () => {
    render(<FileUploader progress={70} onChange={() => ""} />)

    const progress = screen.queryByTestId("progress")
    expect(progress).toHaveStyle("width: 70%")
  })
})
