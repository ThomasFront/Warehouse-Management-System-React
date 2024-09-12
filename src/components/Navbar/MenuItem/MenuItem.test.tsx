import { render, screen } from "@testing-library/react";
import { MenuItem } from "./MenuItem";
import { BrowserRouter } from "react-router-dom";

describe("MenuItem", () => {
  it("renders MenuItem with correct name", () => {
    const mockMenuItem = {
      id: 1,
      name: "Products",
      sublinks: [
        { id: 2, name: "Product list", url: "/product-list" },
        { id: 3, name: "Add product", url: "/product-add" },
      ],
    };

    render(
      <BrowserRouter>
        <MenuItem item={mockMenuItem} currentPathname="/users" />
      </BrowserRouter>
    );

    expect(screen.getByText("Products")).toBeInTheDocument();
  });
})