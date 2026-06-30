import { render, screen } from "@testing-library/react";
import LoginPage from "../app/login/page";

jest.mock("next/navigation", () => ({
  useRouter() {
    return {
      push: jest.fn(),
    };
  },
}));

describe("Login Page", () => {
  test("renderiza el formulario", () => {
    render(<LoginPage />);

    expect(
      screen.getByRole("button", { name: /iniciar sesión/i })
    ).toBeInTheDocument();
  });
});
import { render, screen } from "@testing-library/react";
import LoginPage from "../app/login/page";

describe("Login Page", () => {
  test("renderiza el formulario", () => {
    render(<LoginPage />);

    expect(screen.getByRole("button")).toBeInTheDocument();
  });
});