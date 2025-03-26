import { render , screen} from "@testing-library/react";
import {describe, expect, it} from "vitest";
import { Footer } from "../../src/components/Footer";
describe('Footer Component',()=>{
    // se renderiza?
    it('Muestra el Footer',()=>{
        render(<Footer/>)
        expect(screen.getByRole('contentinfo')).toBeInTheDocument()
    })

    //verificar textos
    it('Muestra textos correctos', ()=>{
        render(<Footer/>)
        expect(screen.getByText(/© 2025 Mi App/i)).toBeInTheDocument()
        expect(screen.getByText(/Desarrollado con por JC/i)).toBeInTheDocument()
    })

    //verificar los atributos y las clases
    it('tiene las clases CSS correctas', ()=>{
        render(<Footer/>)

        const footer = screen.getByRole('contentinfo');
        expect(footer).toHaveClass('footer');
    })
})