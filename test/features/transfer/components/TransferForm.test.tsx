import { describe, expect } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Provider } from "react-redux";
import { store } from "../../../../src/features/transfer/store/store";
import TransferForm from "../../../../src/features/transfer/components/TransferForm";


describe("TransferForm Component", () => {
    const renderWithProviders = (ui: React.ReactElement) => {
      const queryClient = new QueryClient();
      return render(
        <Provider store={store}>
          <QueryClientProvider client={queryClient}>{ui}</QueryClientProvider>
        </Provider>
      );
    };
  
    test("renders the form correctly", () => {
      renderWithProviders(<TransferForm />);
  
      expect(screen.getByLabelText(/Nombre del titular/i)).toBeInTheDocument();
      expect(screen.getByLabelText(/Número de Cuenta/i)).toBeInTheDocument();
      expect(screen.getByLabelText(/Monto/i)).toBeInTheDocument();
      expect(screen.getByLabelText(/Concepto de Pago/i)).toBeInTheDocument();
      expect(screen.getByLabelText(/Correo para Comprobante/i)).toBeInTheDocument();
      expect(screen.getByLabelText(/PIN de Seguridad/i)).toBeInTheDocument();
    });
  
    test("fills out the form and submits", () => {
      renderWithProviders(<TransferForm />);
  
      fireEvent.change(screen.getByLabelText(/Nombre del titular/i), { target: { value: "Juan Pérez" } });
      fireEvent.change(screen.getByLabelText(/Número de Cuenta/i), { target: { value: "12345678901234567890" } });
      fireEvent.change(screen.getByLabelText(/Monto/i), { target: { value: "500" } });
      fireEvent.change(screen.getByLabelText(/Concepto de Pago/i), { target: { value: "Pago de renta" } });
      fireEvent.change(screen.getByLabelText(/Correo para Comprobante/i), { target: { value: "correo@example.com" } });
      fireEvent.change(screen.getByLabelText(/PIN de Seguridad/i), { target: { value: "1234" } });
  
      fireEvent.click(screen.getByText(/Realizar Transferencia/i));
  
      expect(screen.getByText(/Lista de Transferencias/i)).toBeInTheDocument();
    });
  });