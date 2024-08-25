import i18next from "i18next"
import { initReactI18next } from "react-i18next"
import { render, screen } from "@testing-library/react"
import { PageInfo } from "../PageInfo"

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

describe('PageInfo', () => {
  it('should render title correctly', () => {
    render(<PageInfo title="Test Title" subtitle="Test Subtitle" />)

    expect(screen.getByText('Test Title')).toBeInTheDocument()
  })

  it('should render subtitle correctly', () => {
    render(<PageInfo title="Test Title" subtitle="Test Subtitle" />)

    expect(screen.getByText('Test Subtitle')).toBeInTheDocument()
  })
})
