import { render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { PublicRouter } from "../../src/router/PublicRouter";


vi.mock('react-router-dom', () => ({
  Navigate: ({ to }: { to: string }) => <div data-testid="navigate-mock" data-to={to} />,
  // Mantenemos MemoryRouter como está
  MemoryRouter: ({ children }: { children: React.ReactNode }) => <div>{children}</div>,
}));

describe('PublicRouter Component', () => {
  const TestComponent = () => <div data-testid="test-component">Public Content</div>;

  it('Muestra contenido cuando NO está autenticado', () => {
    render(
      <PublicRouter isAuthenticated={false}>
        <TestComponent />
      </PublicRouter>
    );

    expect(screen.getByTestId('test-component')).toBeInTheDocument();
    expect(screen.queryByTestId('navigate-mock')).toBeNull();
  });

});