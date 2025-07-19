import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../../utils/axiosInstance";

export const fetchBoards = createAsyncThunk("boards/fetchBoards", async () => {
    const response = await axiosInstance.get("/boards");
    return response.data
});

export const createBoard = createAsyncThunk("boards/createBoard", async (data) => {
    const response = await axiosInstance.post("/boards", data);
    return response.data;
});

const boardSlice = createSlice({
    name: "board",
    initialState: { items: [], status: null, error: null },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchBoards.fulfilled, (state, action) => {
                state.items = action.payload;
            })
            .addCase(fetchBoards.rejected, (state, action) => {
                state.error = action.error.message;
            })
            .addCase(createBoard.fulfilled, (state, action) => {
                state.items.push(action.payload);
            })
            .addCase(createBoard.rejected, (state, action) => {
                state.error = action.error.message;
            });
    }
})

export default boardSlice.reducer;