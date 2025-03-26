import { TransferFormData } from "../interface/types";

interface FieldConfig {
  name: keyof TransferFormData;
  label: string;
  type: string;
  autoComplete?: string;
}

export const fields:FieldConfig[] = [
    {
      name: "name",
      label: "Nombre del titular",
      type: "text",
    },
    {
      name: "accountNumber",
      label: "Número de Cuenta (20 dígitos)",
      type: "number",
    },
    {
      name: "amount",
      label: "Monto (MXN $)",
      type: "text",
    },
    {
      name: "description",
      label: "Concepto de Pago",
      type: "text",
    },
    {
      name: "email",
      label: "Correo para Comprobante",
      type: "email",
    },
    {
      name: "pin",
      label: "PIN de Seguridad (4 dígitos)",
      type: "password",
      autoComplete: 'current-password',
    },
  ];