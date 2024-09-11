import { MemoryRouter } from "react-router"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { render, screen } from "@testing-library/react"
import { CreateUserForm } from "./CreateUserForm"

describe("CreateUserForm", () => {
  it("should render the create user form with inputs", () => {
    const queryClient = new QueryClient()

    render(
      <MemoryRouter>
        <QueryClientProvider client={queryClient}>
          <CreateUserForm />
        </QueryClientProvider>
      </MemoryRouter>
    )

    expect(screen.getByTestId("firstName")).toBeInTheDocument()
    expect(screen.getByTestId("lastName")).toBeInTheDocument()
    expect(screen.getByTestId("email")).toBeInTheDocument()
    expect(screen.getByTestId("role")).toBeInTheDocument()
    expect(screen.getByTestId("password")).toBeInTheDocument()
  })
})