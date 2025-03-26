import { schema } from "../../../../src/features/transfer/components/ValidacionYupHookForm";


describe('Yup Validation Schema', () => {
  const validData = {
    name: 'Juan Pérez',
    accountNumber: '12345678901234567890',
    amount: 1000,
    description: 'Pago de servicios',
    email: 'juan@example.com',
    pin: '1234'
  };

  it('DEBE validar datos correctos', async () => {
    await expect(schema.validate(validData)).resolves.toBe(validData);
  });

  describe('Validación de campos requeridos', () => {
    it('DEBE requerir el nombre', async () => {
      const data = { ...validData, name: '' };
      await expect(schema.validate(data)).rejects.toThrow('El nombre es obligatorio');
    });

    it('DEBE requerir el número de cuenta', async () => {
      const data = { ...validData, accountNumber: '' };
      await expect(schema.validate(data)).rejects.toThrow('El número de cuenta es obligatorio');
    });

    // Repetir para los demás campos requeridos...
  });

  describe('Validación de formato', () => {
    it('DEBE validar el formato del número de cuenta (20 dígitos)', async () => {
      const data = { ...validData, accountNumber: '123' };
      await expect(schema.validate(data)).rejects.toThrow('El número de cuenta debe tener 20 dígitos');
    });

    it('DEBE validar que el monto sea positivo', async () => {
      const data = { ...validData, amount: -100 };
      await expect(schema.validate(data)).rejects.toThrow('El monto debe ser positivo');
    });

    it('DEBE validar el formato del email', async () => {
      const data = { ...validData, email: 'correo-invalido' };
      await expect(schema.validate(data)).rejects.toThrow('Ingresa un correo electrónico válido');
    });

    it('DEBE validar el formato del PIN (4 dígitos)', async () => {
      const data = { ...validData, pin: '12' };
      await expect(schema.validate(data)).rejects.toThrow('El PIN debe tener 4 dígitos');
    });
  });

  describe('Validación de tipos', () => {
    it('DEBE validar que el monto sea número', async () => {
      const data = { ...validData, amount: 'mil pesos' };
      await expect(schema.validate(data)).rejects.toThrow('El monto debe ser un número');
    });

    it('DEBE convertir string a número cuando es posible', async () => {
      const data = { ...validData, amount: '1500' };
      await expect(schema.validate(data)).resolves.toMatchObject({ amount: 1500 });
    });
  });

  describe('Validaciones personalizadas', () => {
    it('DEBE rechazar PIN con caracteres no numéricos', async () => {
      const data = { ...validData, pin: '12a4' };
      await expect(schema.validate(data)).rejects.toThrow('El PIN debe tener 4 dígitos');
    });

    it('DEBE aceptar números decimales en el monto', async () => {
      const data = { ...validData, amount: 1500.50 };
      await expect(schema.validate(data)).resolves.toBeDefined();
    });
  });
});