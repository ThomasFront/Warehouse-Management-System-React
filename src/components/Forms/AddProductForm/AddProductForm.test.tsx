import { MemoryRouter } from "react-router"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { render, screen } from "@testing-library/react"
import { AddProductForm } from "./AddProductForm"

describe("AddProductForm", () => {
  it("should render the add product form with inputs", () => {
    const queryClient = new QueryClient()

    render(
      <MemoryRouter>
        <QueryClientProvider client={queryClient}>
          <AddProductForm />
        </QueryClientProvider>
      </MemoryRouter>
    )

    expect(screen.getByTestId("productName")).toBeInTheDocument()
    expect(screen.getByTestId("category")).toBeInTheDocument()
    expect(screen.getByTestId("price")).toBeInTheDocument()
    expect(screen.getByTestId("stock")).toBeInTheDocument()
    expect(screen.getByTestId("description")).toBeInTheDocument()
  })
})