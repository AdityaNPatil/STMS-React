import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axiosInstance from "../../utils/axiosInstance";

export const fetchTasks = createAsyncThunk("tasks/fetchTasks", async (boardId) => {
    const response = await axiosInstance.get(`/boards/${boardId}/tasks`);
    return response.data;
})

export const createTask = createAsyncThunk("tasks/createTask", async ({ boardId, task }) => {
    const response = await axiosInstance.post(`/boards/${boardId}/tasks`, task);
    return response.data;
})

// similar async thunks for update, delete, move --- to be added.

const tasksSlice = createSlice({
    name: "tasks",
    initialState: { items: [], status: null, error: null },
    extraReducers: (builder) => {
        builder
            .addCase(fetchTasks.fulfilled, (state, action) => {
                state.items = action.payload;
            })
            .addCase(fetchTasks.rejected, (state, action) => {
                state.error = action.error.message;
            })
            .addCase(createTask.fulfilled, (state, action) => {
                state.items.push(action.payload);
            })
            .addCase(createTask.rejected, (state, action) => {
                state.error = action.error.message;
            });
    }
})

export default tasksSlice.reducer;