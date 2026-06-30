import { render, screen } from "@testing-library/react";
import RegisterPage from "../app/register/page";

jest.mock("next/navigation", () => ({
  useRouter() {
    return {
      push: jest.fn(),
    };
  },
}));

describe("Register Page", () => {
  test("renderiza el formulario", () => {
    render(<RegisterPage />);

    expect(
      screen.getByRole("button", { name: /registrarse ahora/i })
    ).toBeInTheDocument();
  });
});
import { render, screen } from "@testing-library/react";
import RegisterPage from "../app/register/page";

describe("Register Page", () => {
  test("renderiza el formulario", () => {
    render(<RegisterPage />);

    expect(screen.getByRole("button")).toBeInTheDocument();
  });
});