import { MemoryRouter } from "react-router"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { render, screen } from "@testing-library/react"
import { LoginForm } from "./LoginForm"

describe("LoginForm", () => {
  it("should render the form with email and password fields", () => {
    const queryClient = new QueryClient()

    render(
      <MemoryRouter>
        <QueryClientProvider client={queryClient}>
          <LoginForm />
        </QueryClientProvider>
      </MemoryRouter>
    )

    expect(screen.getByTestId("emailInput")).toBeInTheDocument()
    expect(screen.getByTestId("passwordInput")).toBeInTheDocument()
  })
})