import { render, screen } from "@testing-library/react"
import { ErrorMessage } from "./ErrorMessage"
import i18next from "i18next";
import { initReactI18next } from "react-i18next";

i18next
  .use(initReactI18next)
  .init({
    lng: 'en',
    resources: {
      en: {
        translation: {}
      },
    },
  })

describe("ErrorMessage", () => {
  it("should render error message when message prop is provided", () => {
    render(<ErrorMessage message="errorMessage" />)

    const formHelperText = screen.getByText("errorMessage")
    expect(formHelperText).toBeInTheDocument()
  })

  it("should not render anything when message prop is not provided", () => {
    const { container } = render(<ErrorMessage message="" />)

    const hasChildren = container.children.length > 0
    expect(hasChildren).toBe(false)
  })
})
