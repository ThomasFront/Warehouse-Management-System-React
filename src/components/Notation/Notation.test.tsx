import { render, screen } from "@testing-library/react"
import { Notation } from "./Notation"
import { ThemeProvider } from "@mui/material/styles"
import { createTheme } from "@mui/material"

describe("Notation", () => {
  const theme = createTheme({})

  it("should render children correctly", () => {
    render(
      <ThemeProvider theme={theme}>
        <Notation>
          <span>Test Content</span>
        </Notation>
      </ThemeProvider>
    )

    expect(screen.getByText("Test Content")).toBeInTheDocument()
  })
})
