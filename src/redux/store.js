import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slices/auth.slice"
import loadingReducer from "./slices/loading.slice"

const rootReducer = {
    auth: authReducer,
    loading: loadingReducer
}

const store = configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: false
        })
})

export default store;