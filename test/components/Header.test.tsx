import { render , screen} from "@testing-library/react";
import {describe, expect, it, vi} from "vitest";
import { Header } from "../../src/components/Header";
vi.mock('../../src/components/NavBar', () => ({
    Navbar: () => <nav>Navbar Mock</nav>
  }));

describe('Header Component',()=>{
    // se renderiza?
    it('Muestra el Header',()=>{
        render(<Header/>)
        expect(screen.getByRole('banner')).toBeInTheDocument()
    })

    //aplicar la clase css correcta
    it('tiene las clases CSS correctas', ()=>{
        render(<Header/>)

        const header = screen.getByRole('banner');
        expect(header).toHaveClass('header');
    })

    it('contiene el componente bar',()=>{
        render(<Header></Header>);
        expect(screen.getByText('Navbar Mock')).toBeInTheDocument()
    })
})