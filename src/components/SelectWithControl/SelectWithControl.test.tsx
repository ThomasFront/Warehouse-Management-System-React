import { render, screen } from "@testing-library/react"
import { useForm } from "react-hook-form"
import i18next from "i18next";
import { initReactI18next } from "react-i18next";
import { SelectWithControl } from "./SelectWithControl";

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

const SelectWithControlWrapper = ({ errors = {}, requiredSign = false }) => {
  const { control } = useForm()
  const options = [{ label: "Label 1", value: "1" }, { label: "Label 2", value: "2" }]

  return (
    <SelectWithControl
      name="role"
      label="Role"
      control={control}
      errors={errors}
      requiredSign={requiredSign}
      options={options}
      data-testid="selectWithControl"
    />
  )
}

describe("SelectWithControl", () => {
  it("should render Select properly", () => {
    render(<SelectWithControlWrapper />)

    expect(screen.getByTestId("selectWithControl")).toBeInTheDocument()
  })
})
