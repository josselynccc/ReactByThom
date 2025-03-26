
import {describe, expect, it} from "vitest";
import { fields } from "../../../../src/features/transfer/components/Fields";
import { TransferFormData } from "../../../../src/features/TransferManagement/http/interface/Transfer";

describe('fields configuration', () => {
  it('DEBE exportar un array de FieldConfig', () => {
    expect(Array.isArray(fields)).toBe(true);
    expect(fields.length).toBeGreaterThan(0);
  });

  it('CADA campo DEBE tener las propiedades requeridas', () => {
    fields.forEach(field => {
      expect(field).toHaveProperty('name');
      expect(field).toHaveProperty('label');
      expect(field).toHaveProperty('type');
      expect(typeof field.name).toBe('string');
      expect(typeof field.label).toBe('string');
      expect(typeof field.type).toBe('string');
    });
  });

  it('LOS nombres de campos DEBERÍAN coincidir con TransferFormData', () => {
    const formDataKeys: Array<keyof TransferFormData> = [
      'name', 
      'accountNumber', 
      'amount', 
      'description', 
      'email', 
      'pin'
    ];
    
    fields.forEach(field => {
      expect(formDataKeys).toContain(field.name);
    });
  });

  it('DEBE tener los campos específicos con configuración correcta', () => {
    const accountNumberField = fields.find(f => f.name === 'accountNumber');
    expect(accountNumberField?.type).toBe('number');
    expect(accountNumberField?.label).toMatch(/20 dígitos/);

    const amountField = fields.find(f => f.name === 'amount');
    expect(amountField?.type).toBe('text');
    expect(amountField?.label).toMatch(/MXN \$/);

    const pinField = fields.find(f => f.name === 'pin');
    expect(pinField?.type).toBe('password');
    expect(pinField?.label).toMatch(/4 dígitos/);
    expect(pinField?.autoComplete).toBe('current-password');
  });

  it('DEBE mantener el orden específico de los campos', () => {
    const expectedOrder = [
      'name',
      'accountNumber',
      'amount',
      'description',
      'email',
      'pin'
    ];
    
    const actualOrder = fields.map(field => field.name);
    expect(actualOrder).toEqual(expectedOrder);
  });
});