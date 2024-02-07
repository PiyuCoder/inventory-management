import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { fetchInventoryAPI } from "../axios/axios"; // Replace with your actual API file

// Async thunk to fetch inventories
export const fetchInventory = createAsyncThunk(
  "inventory/fetchInventory",
  async (token) => {
    try {
      const response = await fetchInventoryAPI(token);
      return response?.data?.inventories; // Assuming your API returns data property
    } catch (error) {
      throw error.response.data; // Throw the error for handling in the reducer
    }
  }
);

const initialState = {
  inventories: [],
  loading: false,
  error: null,
};

const inventorySlice = createSlice({
  name: "inventory",
  initialState,
  reducers: {}, // Add any synchronous reducers here if needed
  extraReducers: (builder) => {
    builder
      .addCase(fetchInventory.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchInventory.fulfilled, (state, action) => {
        state.loading = false;
        state.inventories = action.payload;
      })
      .addCase(fetchInventory.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to fetch inventories";
      });
  },
});

export default inventorySlice.reducer;
