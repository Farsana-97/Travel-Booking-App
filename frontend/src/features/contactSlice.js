import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../axiosInstance";

export const sendContactMessage = createAsyncThunk(
  "contact/sendMessage",
  async (formData) => {
    try {
      const res = await axiosInstance.post("/api/contactus", formData);
      return res.data;
    } catch (error) {
      console.log(error);
    }
  }
);

const contactSlice = createSlice({
  name: "contact",
  initialState: {
    loading: false,
    success: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(sendContactMessage.pending, (state) => {
        state.loading = true;
        state.success = false;
        state.error = null;
      })
      .addCase(sendContactMessage.fulfilled, (state) => {
        state.loading = false;
        state.success = true;
      })
      .addCase(sendContactMessage.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Something went wrong";
      });
  },
});

export default contactSlice.reducer;
