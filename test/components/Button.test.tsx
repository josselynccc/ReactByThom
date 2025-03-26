import { fireEvent, render , screen} from "@testing-library/react";
import {describe, expect, it, vi} from "vitest";
import Button from "../../src/components/Button";

describe('Button Component',()=>{
    //Se renderiza?
    it('Muestra el boton con el texto', ()=>{
        render(<Button text="Button" />)
        expect(screen.getByText('Button')).toBeInTheDocument()
    })

    //Se puede hacer click?
    it('llama a onclick cuando se hace click', ()=>{
        const handleClick = vi.fn()
        render(<Button text="Haz Click" onClick={handleClick}/>)

        fireEvent.click(screen.getByText('Haz Click'))
        expect(handleClick).toHaveBeenCalledTimes(1)
    })

    //Boton deshabilitado
    it('Se deshabilita cuando disabled es true', ()=>{
        render(<Button text="No tocar" disabled={true}/>)

        const button = screen.getByText('No tocar')
        expect(button).toBeDisabled()
        expect(button).toHaveAttribute('disabled')

    })
})
