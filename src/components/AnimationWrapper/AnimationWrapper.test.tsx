import { render, screen } from "@testing-library/react"
import { AnimationWrapper } from "./AnimationWrapper"

describe("AnimationWrapper", () => {
  it("should render children", () => {
    render(
      <AnimationWrapper>
        <div data-testid="children">Test Child</div>
      </AnimationWrapper>
    )

    const childElement = screen.getByTestId("children")
    expect(childElement).toBeInTheDocument()
  })
})
