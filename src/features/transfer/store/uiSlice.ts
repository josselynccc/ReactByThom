import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface UiState{
    notifications:string[];
}

const initialState:UiState = {
    notifications:[]
};

const uiSlice = createSlice({
    name:'ui',
    initialState,
    reducers:{
        addNotification: (state, action: PayloadAction<string>) =>{
            state.notifications.push(action.payload);
        },
    },
});

export const {addNotification} = uiSlice.actions;
export default uiSlice.reducer;