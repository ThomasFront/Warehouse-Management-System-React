import { MemoryRouter } from "react-router"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { render, screen } from "@testing-library/react"
import { AddCategoryForm } from "./AddCategoryForm"

describe("AddCategoryForm", () => {
  it("should render the add category form", () => {
    const queryClient = new QueryClient()

    render(
      <MemoryRouter>
        <QueryClientProvider client={queryClient}>
          <AddCategoryForm />
        </QueryClientProvider>
      </MemoryRouter>
    )

    expect(screen.getByTestId("categoryInput")).toBeInTheDocument()
  })
})