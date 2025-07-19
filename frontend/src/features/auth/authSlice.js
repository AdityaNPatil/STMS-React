import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axiosInstance from "../../utils/axiosInstance";

// async thunk for api requests using axios instance -- login and register
export const login = createAsyncThunk("auth/login", async(userData, thunkAPI) => {
    const response = await axiosInstance.post("/auth/login", userData)
    return response.data
})

export const register = createAsyncThunk("auth/register", async(userData, thunkAPI) => {
    const response = await axiosInstance.post("/auth/register", userData);
    return response.data;
})

export const authSlice = createSlice({
    name:"auth",
    initialState: { user: null, token: localStorage.getItem("token"), status: null, error: null },
    reducers:{
        logout: (state, action) => {
            state.user = null,
            state.token = null,
            localStorage.removeItem("token")
        } 
    },
    extraReducers: (builder) => {
        builder.addCase(login.fulfilled, (state, action) => {
            state.user = action.payload.user;
            state.token = action.payload.token;
            localStorage.setItem("token", action.payload.token);
        }),
        builder.addCase(login.rejected, (state, action) => {
            state.error = action.error.message;
        }),
        builder.addCase(register.fulfilled, (state, action) => {
            state.user = action.payload.user;
            state.token = action.payload.token;
            localStorage.setItem("token", action.payload.token);
        }),
        builder.addCase(register.rejected, (state, action) => {
            state.error = action.error.message;
        })
    }
})

export const {logout} = authSlice.actions;
export default authSlice.reducer