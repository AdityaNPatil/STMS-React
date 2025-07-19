import {configureStore} from "@reduxjs/toolkit"
import authReducer from "../features/auth/authSlice"
import boardsReducer from "../features/auth/boardsSlice"

const store = configureStore({
    reducer:{
        auth: authReducer,
        boards: boardsReducer
    }
})

export default store;