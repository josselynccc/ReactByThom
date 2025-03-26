import {  render , screen} from "@testing-library/react";
import {describe, expect, it} from "vitest";
import { Navbar } from "../../src/components/NavBar";
import { BrowserRouter } from "react-router-dom";

describe('NavBar Component', ()=>{
    //se renderiza?
    it('Muestra el NavBar',()=>{
        render(
            <BrowserRouter>
                <Navbar />
            </BrowserRouter>
        )
        expect(screen.getByRole("navigation")).toBeInTheDocument()
    })

    //contiene todos los enlaces?
    it('Muestra todos los enlaces', ()=>{
        render(
            <BrowserRouter>
                <Navbar />
            </BrowserRouter>
        )

        const links = screen.getAllByRole('link')
        expect(links).toHaveLength(5)
        expect(screen.getByText('Home')).toBeInTheDocument()
        expect(screen.getByText('Transferencias')).toBeInTheDocument()
        expect(screen.getByText('Iniciar sesión')).toBeInTheDocument()
        expect(screen.getByText('Registrarse')).toBeInTheDocument()
    })

    it('Aplica las clases correctamente', ()=>{
        render(
            <BrowserRouter>
                <Navbar />
            </BrowserRouter>
        )

        const navLinks= screen.getByRole('list')
        expect(screen.getByRole('navigation')).toHaveClass('navbar')
        expect(navLinks).toHaveClass('navbar-links')
    })
})