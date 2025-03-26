import { render, screen, waitFor } from "@testing-library/react";
import { MemoryRouter } from "react-router";
import { test, vi, expect, beforeEach } from "vitest";

import "@testing-library/jest-dom";
import { AppRoutes } from "../src/AppRoutes";

// Mock de autenticación
vi.mock("../src/router/PublicRouter", () => ({
  PublicRouter: ({ isAuthenticated, children }: { isAuthenticated: boolean; children: React.ReactNode }) =>
    isAuthenticated ? <>{children}</> : <div data-testid="redirect-login">Redirigiendo...</div>,
}));

const renderWithRouter = (initialEntries = ["/"]) =>
  render(
    <MemoryRouter initialEntries={initialEntries}>
      <AppRoutes />
    </MemoryRouter>
  );

beforeEach(() => {
  vi.clearAllMocks();
});

test("Debería mostrar la página de inicio", async () => {
  renderWithRouter(["/home"]);

  await waitFor(() => {
    expect(screen.getByText(/Mi Banco Digital/i)).toBeInTheDocument();
  });
});

test("Debería mostrar la página de transferencias", async () => {
  renderWithRouter(["/transferencias"]);

  await waitFor(() => {
    expect(screen.getByText(/Transferencia Bancaria/i)).toBeInTheDocument();
  });
});


test("Debería redirigir a home si la ruta no existe", async () => {
  renderWithRouter(["/ruta-inexistente"]);

  expect(await screen.findByText(/Mi Banco Digital/i)).toBeInTheDocument();
});
