import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { BrowserRouter } from "react-router-dom"
import { render, screen } from "@testing-library/react"
import { CustomAvatar } from "./CustomAvatar"

describe("CustomAvatar", () => {
  it("should render custom avatar component", () => {
    const queryClient = new QueryClient()

    render(
      <BrowserRouter>
        <QueryClientProvider client={queryClient}>
          <CustomAvatar />
        </QueryClientProvider>
      </BrowserRouter>
    )

    const customAvatarElement = screen.getByTestId("customAvatar")
    expect(customAvatarElement).toBeInTheDocument()
  })
})