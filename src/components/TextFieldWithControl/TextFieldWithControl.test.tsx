import { render, screen } from "@testing-library/react"
import { useForm } from "react-hook-form"
import { TextFieldWithControl } from "./TextFieldWithControl"
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

const TextFieldWithControlWrapper = ({ errors = {}, requiredSign = false }) => {
  const { control } = useForm()

  return (
    <TextFieldWithControl
      name="email"
      label="Email Address"
      control={control}
      errors={errors}
      requiredSign={requiredSign}
      data-testid="xd"
    />
  )
}

describe("TextFieldWithControl", () => {
  it("should render TextField with correct label", () => {
    render(<TextFieldWithControlWrapper />)

    expect(screen.getByLabelText("Email Address")).toBeInTheDocument()
  })

  it("should render error message if there is an error", () => {
    render(<TextFieldWithControlWrapper errors={{ email: { message: "Email is required" } }} />)

    expect(screen.getByText("Email is required")).toBeInTheDocument()
  })

  it("should render label with asterisk if requiredSign is true", () => {
    render(<TextFieldWithControlWrapper requiredSign />)

    expect(screen.getByLabelText("Email Address*")).toBeInTheDocument()
  })
})
