import { render, screen } from "@testing-library/react"
import { Navbar } from "./Navbar"
import { MemoryRouter } from "react-router-dom"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
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

describe("Navbar", () => {
  const queryClient = new QueryClient()

  it("should render Navbar component", () => {
    render(
      <MemoryRouter>
        <QueryClientProvider client={queryClient}>
          <Navbar />
        </QueryClientProvider>
      </MemoryRouter>
    )


    expect(screen.getByLabelText("open drawer")).toBeInTheDocument()
    expect(screen.getByText("Warehouse Management System")).toBeInTheDocument()
  })

  it("should show menu button when drawer is closed", () => {
    render(
      <MemoryRouter>
        <QueryClientProvider client={queryClient}>
          <Navbar />
        </QueryClientProvider>
      </MemoryRouter>
    )

    expect(screen.getByLabelText("open drawer")).toBeVisible()
  })
})
