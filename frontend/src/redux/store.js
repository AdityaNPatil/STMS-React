import {configureStore} from "@reduxjs/toolkit"
import authReducer from "../features/auth/authSlice"
import boardsReducer from "../features/auth/boardsSlice"
import tasksReducer from "../features/auth/tasksSlice"

const store = configureStore({
    reducer:{
        auth: authReducer,
        boards: boardsReducer,
        tasks: tasksReducer
    }
})

export default store;