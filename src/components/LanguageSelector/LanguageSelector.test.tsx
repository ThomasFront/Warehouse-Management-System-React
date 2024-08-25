import { render, screen } from "@testing-library/react"
import { LanguageSelector } from "./LanguageSelector"

describe("LanguageSelector", () => {
  it("should render LanguageSelector", () => {
    render(<LanguageSelector />)

    const languageSelector = screen.queryByTestId("rfs-btn")
    expect(languageSelector).toBeInTheDocument()
  })

  it("should render ReactFlagsSelect with default selected language", () => {
    localStorage.setItem("lang", "pl")

    render(<LanguageSelector />)

    const selectElement = screen.getByText("PL")
    expect(selectElement).toBeInTheDocument()
  })
})