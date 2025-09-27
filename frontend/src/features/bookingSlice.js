import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../axiosInstance";



export const fetchBooking = createAsyncThunk("bookings/fetch", async (data) => {
  try {
    let res = await axiosInstance.get("/booking", data);
    return res.data;
  } catch (error) {
    console.log(error);
  }
});

const bookingSlice = createSlice({
  name: "booking",
  initialState: { bookings: [], loading: false, error: null },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchBooking.fulfilled, (state, action) => {
      state.loading = false;
      state.bookings = action.payload;
    });
  },
});

export default bookingSlice.reducer;
