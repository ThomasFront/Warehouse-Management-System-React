import { render, screen } from "@testing-library/react"
import { EmojiPanel } from "./EmojiPanel"

describe("EmojiPanel", () => {
  it("should render emoji panel", () => {
    render(<EmojiPanel />)

    const emojiPanel = screen.getByTestId("emojiPanel")
    expect(emojiPanel).toBeInTheDocument()
  })
})
