import * as yup from "yup";

export const schema = yup.object().shape({
  name: yup.string().required("El nombre es obligatorio"),
  accountNumber: yup
    .string()
    .required("El número de cuenta es obligatorio")
    .matches(/^\d{20}$/, "El número de cuenta debe tener 20 dígitos"),
  amount: yup
    .number()
    .typeError("El monto debe ser un número")
    .positive("El monto debe ser positivo")
    .required("El monto es obligatorio"),
  description: yup.string().required("El concepto de pago es obligatorio"),
  email: yup
    .string()
    .email("Ingresa un correo electrónico válido")
    .required("El correo es obligatorio"),
  pin: yup
    .string()
    .required("El PIN es obligatorio")
    .matches(/^\d{4}$/, "El PIN debe tener 4 dígitos"),
});