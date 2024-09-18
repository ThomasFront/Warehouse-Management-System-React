import { MemoryRouter } from "react-router"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { render, screen } from "@testing-library/react"
import { AddMessageForm } from "./AddMessageForm"

describe("AddMessageForm", () => {
  it("should render the add message form", () => {
    const queryClient = new QueryClient()

    render(
      <MemoryRouter>
        <QueryClientProvider client={queryClient}>
          <AddMessageForm />
        </QueryClientProvider>
      </MemoryRouter>
    )

    expect(screen.getByTestId("title")).toBeInTheDocument()
    expect(screen.getByTestId("priority")).toBeInTheDocument()
    expect(screen.getByTestId("message")).toBeInTheDocument()
  })
})