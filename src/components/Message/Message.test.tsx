import { MemoryRouter } from "react-router"
import { render, screen } from "@testing-library/react"
import { Message } from "./Message"

const message = {
  id: 1,
  title: "Example title",
  message: "Example message",
  priority: "high",
  createdAt: "2024-09-17T15:32:26.000000Z",
  user: {
    id: 9,
    firstName: "Thomas",
    lastName: "Kanciano",
    role: "admin",
    createdAt: "2024-09-11T18:18:33.000000Z",
    avatar: "http://example.com/public/avatar.png"
  }
}


describe("Message", () => {
  it("should render message", () => {
    render(
      <MemoryRouter>
        <Message message={message} />
      </MemoryRouter>
    )

    const messageWrapper = screen.getByTestId("messageWrapper")
    expect(messageWrapper).toBeInTheDocument()
  })

  it("should render user data", () => {
    render(
      <MemoryRouter>
        <Message message={message} />
      </MemoryRouter>
    )

    const firstName = screen.queryByText("Thomas Kanciano")
    expect(firstName).toBeInTheDocument()
  })

  it("should render message data", () => {
    render(
      <MemoryRouter>
        <Message message={message} />
      </MemoryRouter>
    )

    const titleText = screen.queryByText("Example title")
    const messageText = screen.queryByText("Example message")
    expect(titleText).toBeInTheDocument()
    expect(messageText).toBeInTheDocument()
  })

  it("should render color header based on priority", () => {
    render(
      <MemoryRouter>
        <Message message={message} />
      </MemoryRouter>
    )

    const header = screen.queryByTestId("messageHeader")
    expect(header).toHaveStyle("background-color: #FF4C4C")
  })

})