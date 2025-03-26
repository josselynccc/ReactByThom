// Importa la versión compatible con Vitest
import '@testing-library/jest-dom/vitest'

// Configuración adicional de testing-library
import { configure } from '@testing-library/react'

configure({
  testIdAttribute: 'data-testid', // Atributo para getByTestId
})