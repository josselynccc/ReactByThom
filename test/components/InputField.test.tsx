import { render, screen } from "@testing-library/react";
import {describe, expect, it} from "vitest";
import InputField from "../../src/components/InputField";

describe('InputField Component',()=>{
    //Se renderiza?
    it('Muestra Input Field',()=>{
        render(<InputField label="Nombre" id="name-input"/>)

        const input = screen.getByRole('textbox')

        expect(input).toBeInTheDocument()
        expect(input).toHaveAttribute('id','name-input')
    })

    //props en input
    it('pasa correctamente las props',()=>{
        render(<InputField label="Email" id="email" type="email" placeholder="aa@gmail.com"/>)

        const input = screen.getByRole('textbox')
        expect(input).toHaveAttribute('type', 'email')
        expect(input).toHaveAttribute('placeholder', 'aa@gmail.com')
    })

    //probar si el error se renderiza solo si es true
    it('error no es vacio', ()=>{
        render(<InputField label="Nombre" error="Email invalido"/>)

        const errorMessage = screen.getByText('Email invalido')

        expect(errorMessage).toBeInTheDocument()
        expect(errorMessage).toHaveClass('error-message')
    })
})