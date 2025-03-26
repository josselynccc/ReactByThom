import { expect, test } from 'vitest';
import { accountData } from '../../../src/features/account/data/accountData';

test('accountData debe tener los valores correctos', () => {
    expect(accountData.accountType).toBe('Cuenta Corriente');
    expect(accountData.accountNumber).toBe("123456789123456789");
    expect(accountData.balance).toBe(2500.75);
    expect(typeof accountData.lastUpdated).toBe("string");
});
