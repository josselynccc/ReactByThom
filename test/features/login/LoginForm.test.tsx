import { render, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import LoginForm from "../../../src/features/login/LoginForm";

describe("LoginForm Component", () => {
    test("renders the login form correctly", () => {
      render(
        <BrowserRouter>
          <LoginForm />
        </BrowserRouter>
      );
  
      expect(screen.getAllByText(/Iniciar Sesión/i)[0]).toBeInTheDocument();
      expect(screen.getByLabelText(/Email/i)).toBeInTheDocument();
      expect(screen.getByLabelText(/Contraseña/i)).toBeInTheDocument();
      expect(screen.getByLabelText(/Recordarme/i)).toBeInTheDocument();
      expect(screen.getByRole("link", { name: /¿Olvidaste tu contraseña?/i })).toBeInTheDocument();
      expect(screen.getByRole("link", { name: /Regístrate/i })).toBeInTheDocument();
    });
})