import { render } from "@testing-library/react";
import {describe, expect, it, vi} from "vitest";
import { PrivateRouter } from "../../src/router/PrivateRouter";
import { MemoryRouter, Route, Routes } from "react-router-dom";

vi.mock('react-router-dom', async () => {
    const actual = await vi.importActual('react-router-dom');
    return {
      ...actual,
      Navigate: ({ to }: { to: string }) => <div data-testid="navigate-mock" data-to={to} />
    };
  });

describe('PrivateRouter Component',()=>{
    const TestComponent = () => <div data-testid="test-component">Protected Content</div>;

    // se renderiza cuando esta autenticado?
    it('Muestra PrivateRouter', ()=>{
        const { getByTestId } = render(
            <MemoryRouter initialEntries={['/private']}>
              <Routes>
                <Route
                  path="/private"
                  element={
                    <PrivateRouter isAuthenticated={true}>
                      <TestComponent />
                    </PrivateRouter>
                  }
                />
              </Routes>
            </MemoryRouter>
          )
        expect(getByTestId('test-component')).toBeInTheDocument()
    })

    it('Redirige si no esta autenticado',()=>{
        const { getByTestId } = render(
            <MemoryRouter initialEntries={['/private']}>
              <Routes>
                <Route
                  path="/private"
                  element={
                    <PrivateRouter isAuthenticated={false}>
                      <TestComponent />
                    </PrivateRouter>
                  }
                />
              </Routes>
            </MemoryRouter>
          )

        const navigateMock = getByTestId('navigate-mock')
        expect(navigateMock).toBeInTheDocument()
        expect(navigateMock).toHaveAttribute('data-to', '/RegisterPage')
    })
})