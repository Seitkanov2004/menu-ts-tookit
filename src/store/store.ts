import { combineReducers, configureStore } from "@reduxjs/toolkit";
import BeginSlice from "./Reducers/BeginSlice";

const rootReducer = combineReducers({
    BeginSlice,

})

export const setupStore = () => {
    return configureStore({
        reducer: rootReducer
    })
}

export type rootState = ReturnType<typeof rootReducer>
type AppStore = ReturnType<typeof setupStore>
export type AppDispatch = AppStore["dispatch"]