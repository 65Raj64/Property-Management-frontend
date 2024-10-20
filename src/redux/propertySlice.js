import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchProperties = createAsyncThunk(
  "properties/fetchProperties",
  async () => {
    const response = await axios.get("http://localhost:5000/api/properties");
    return response.data;
  }
);

export const deleteProperty = createAsyncThunk(
  "properties/deleteProperty",
  async (id) => {
    await axios.delete(`http://localhost:5000/api/properties/${id}`);
    return id;
  }
);

const propertySlice = createSlice({
  name: "properties",
  initialState: {
    list: [],
    status: null,
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProperties.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchProperties.fulfilled, (state, action) => {
        state.list = action.payload;
        state.status = "success";
      })
      .addCase(fetchProperties.rejected, (state) => {
        state.status = "failed";
      })
      .addCase(deleteProperty.fulfilled, (state, action) => {
        state.list = state.list.filter(
          (property) => property._id !== action.payload
        );
      });
  },
});

export default propertySlice.reducer;
