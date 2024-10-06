import { MemoryRouter } from "react-router"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { render, screen } from "@testing-library/react"
import { AddSaleForm } from "./AddSaleForm"

describe("AddSaleForm", () => {
  it("should render the add sale form with inputs", () => {
    const queryClient = new QueryClient()

    render(
      <MemoryRouter>
        <QueryClientProvider client={queryClient}>
          <AddSaleForm />
        </QueryClientProvider>
      </MemoryRouter>
    )

    expect(screen.getByTestId("productId")).toBeInTheDocument()
    expect(screen.getByTestId("quantity")).toBeInTheDocument()
  })
})