import {create} from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware';

type BalanceStore = {
    balance: number;
    addToBalance: (amount: number) => void;
    substractFromBalance: (amount: number) => void;
    adjustBalance: (oldAmount: number, newAmount: number) => void;
};

export const useBalanceStore = create<BalanceStore>()(persist(
    (set) =>({
        balance: 10000000,
        addToBalance: (amount) => set((state) =>({balance : state.balance + amount})),
        substractFromBalance: (amount) => set((state) => ({balance: state.balance - amount})),
        adjustBalance: (oldAmount, newAmount) => {
            const difference = newAmount - oldAmount;
            set((state) => ({ balance: state.balance - difference }));
        }
    }),
    {
        name: 'balance-storage',
        storage: createJSONStorage(() => localStorage),
    }
))

    
