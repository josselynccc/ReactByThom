import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { TransferFormData } from '../interface/types';

/**createSlice: Función de Redux Toolkit para crear un "slice" (porción) del store.
    PayloadAction: Tipo para acciones con payload tipado.
*/

interface TransfersState {
  transfers: TransferFormData[];
  loading: boolean;
}

const initialState: TransfersState = {
  transfers: [],
  loading: false,
};

const transfersSlice = createSlice({
  name: 'transfers',
  initialState,
  reducers: {
    setTransfers: (state, action: PayloadAction<TransferFormData[]>) => {
      state.transfers = action.payload;
    },
    addTransfer: (state, action: PayloadAction<TransferFormData>) => {
      state.transfers.push(action.payload);
    },
    updateTransfer: (state, action: PayloadAction<TransferFormData>) => {
      const index = state.transfers.findIndex(t => t.id === action.payload.id);
      if (index !== -1) state.transfers[index] = action.payload;
    },
    deleteTransfer: (state, action: PayloadAction<string>) => {
      state.transfers = state.transfers.filter(t => t.id !== action.payload);
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
  },
});

export const { 
  setTransfers, 
  addTransfer, 
  updateTransfer, 
  deleteTransfer,
  setLoading 
} = transfersSlice.actions;

export default transfersSlice.reducer;