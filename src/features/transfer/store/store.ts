import {configureStore} from "@reduxjs/toolkit"
import uiReducer from './uiSlice'
import transfersReducer from './transferSlice'

export const store = configureStore({
    reducer: {
        ui: uiReducer,
        transfers: transfersReducer,
    }
})

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;