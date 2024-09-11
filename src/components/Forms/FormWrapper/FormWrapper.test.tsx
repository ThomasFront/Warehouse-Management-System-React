import { MemoryRouter } from "react-router"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { render, screen } from "@testing-library/react"
import { FormWrapper } from "./FormWrapper"

describe("FormWrapper", () => {
  it("should render the form wrapper", () => {
    const queryClient = new QueryClient()

    render(
      <MemoryRouter>
        <QueryClientProvider client={queryClient}>
          <FormWrapper children="" onSubmit={() => ""} submitButton={{ name: "Button name" }} />
        </QueryClientProvider>
      </MemoryRouter>
    )

    expect(screen.getByTestId("formWrapper")).toBeInTheDocument()
  })

  it("should render the children prop", () => {
    const queryClient = new QueryClient()

    render(
      <MemoryRouter>
        <QueryClientProvider client={queryClient}>
          <FormWrapper children="Children" onSubmit={() => ""} submitButton={{ name: "Button name" }} />
        </QueryClientProvider>
      </MemoryRouter>
    )

    expect(screen.getByText("Children")).toBeInTheDocument()
  })

  it("should render the submit button", () => {
    const queryClient = new QueryClient()

    render(
      <MemoryRouter>
        <QueryClientProvider client={queryClient}>
          <FormWrapper children="Children" onSubmit={() => ""} submitButton={{ name: "Button name" }} />
        </QueryClientProvider>
      </MemoryRouter>
    )

    expect(screen.getByTestId("submitButton")).toBeInTheDocument()
  })
})