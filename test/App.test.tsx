
import { render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import App from "../src/App";

// Mock de react-router-dom y AppRoutes
vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual('react-router-dom');
  return {
    ...actual,
    BrowserRouter: ({ children }: { children: React.ReactNode }) => (
      <div data-testid="browser-router">
        {children}
      </div>
    )
  };
});

vi.mock('../src/AppRoutes', () => ({
  AppRoutes: () => <div data-testid="app-routes">App Routes Content</div>
}));

describe('App Component', () => {
  it('DEBE renderizar el BrowserRouter y AppRoutes', () => {
    render(<App />);
    
    // Verificar que ambos componentes están presentes
    expect(screen.getByTestId('browser-router')).toBeInTheDocument();
    expect(screen.getByTestId('app-routes')).toBeInTheDocument();
  });

  it('DEBE renderizar el contenido de AppRoutes', () => {
    render(<App />);
    expect(screen.getByText('App Routes Content')).toBeInTheDocument();
  });
});