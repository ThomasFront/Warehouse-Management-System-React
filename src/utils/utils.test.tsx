import { capitalizeFirstLetter, formatDateTimeToDisplay, formatDateToDisplay, getUserInitials, handleMessagePriorityColor, removeEmptyStrings, transformAvatarStorageUrl } from "./common";

describe("capitalizeFirstLetter", () => {
  it("should capitalize the first letter of a string", () => {
    expect(capitalizeFirstLetter("hello")).toBe("Hello")
  })
})

describe("getUserInitials", () => {
  it("should return initials from first name and last name", () => {
    expect(getUserInitials("John", "Doe")).toBe("JD")
  })
})

describe("removeEmptyStrings", () => {
  it("should remove properties with empty string values", () => {
    const obj = { a: "value", b: "", c: "another value" }
    const cleanedObj = removeEmptyStrings(obj)
    expect(cleanedObj).toEqual({ a: "value", c: "another value" })
  })
})

describe("transformAvatarStorageUrl", () => {
  it("should replace 'public' with 'storage' in URL", () => {
    expect(transformAvatarStorageUrl("http://example.com/public/avatar.png")).toBe("http://example.com/storage/avatar.png")
  })
})

describe("formatDateToDisplay", () => {
  it("should format date to 'dd-MM-yyyy'", () => {
    expect(formatDateToDisplay("2024-09-17T15:32:26.000Z")).toBe("17-09-2024")
  })
})

describe("handleMessagePriorityColor", () => {
  it("should return the correct color for message priority levels", () => {
    expect(handleMessagePriorityColor("high")).toBe("#FF4C4C")
    expect(handleMessagePriorityColor("medium")).toBe("#FFA500")
    expect(handleMessagePriorityColor("low")).toBe("#4CAF50")
  })
})

describe("formatDateTimeToDisplay", () => {
  it("should format date and time correctly", () => {
    expect(formatDateTimeToDisplay("2024-09-17T17:08:51.000000Z")).toBe("17-09-2024, 19:08")
  });
});