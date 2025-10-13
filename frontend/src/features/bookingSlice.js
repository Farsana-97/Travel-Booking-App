import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../axiosInstance";

// Get all bookings

export const fetchBooking = createAsyncThunk("bookings/fetch", async (data) => {
  try {
    let res = await axiosInstance.get("/api/booking", data);
    return res.data;
  } catch (error) {
    console.log(error);
  }
});

// Add booking

export const addBooking = createAsyncThunk("bookings/book", async (data) => {
  try {
    let res = await axiosInstance.post("/api/booking", data);
    return res.data;
  } catch (error) {
    console.log(error);
  }
});

// Fetch Booking By Id

export const fetchBookingById = createAsyncThunk(
  "booking/fetchById",
  async (id) => {
    const res = await axiosInstance.get(`/api/booking/bookingById/${id}`);
    return res.data;
  }
);

// Fetch Booking By UserId

export const fetchUserBooking = createAsyncThunk(
  "booking/fetchUser",
  async (userId) => {
    const res = await axiosInstance.get(`/api/booking/${userId}`);
    return res.data;
  }
);

export const cancelBooking = createAsyncThunk(
  "booking/cancelBooking",
  async ({ id, status }) => {
    const res = await axiosInstance.put(`/api/booking/cancel/${id}`, { status });
    return res.data;
  }
);

const bookingSlice = createSlice({
  name: "booking",
  initialState: {
    bookings: [],
    loading: false,
    error: null,
    currentBooking: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchBooking.fulfilled, (state, action) => {
        state.loading = false;
        state.bookings = action.payload;
      })
      .addCase(addBooking.fulfilled, (state, action) => {
        state.loading = false;
        state.bookings.push(action.payload);
      })
      .addCase(fetchBookingById.fulfilled, (state, action) => {
        state.currentBooking = action.payload;
      })
      .addCase(fetchUserBooking.fulfilled, (state, action) => {
        state.loading = false;
        state.bookings = action.payload;
      })
      .addCase(cancelBooking.fulfilled, (state, action) => {
        const updated = action.payload.booking;
        const index = state.bookings.findIndex((b) => b._id === updated._id);
        if (index !== -1) state.bookings[index] = updated;
      });
  },
});

export default bookingSlice.reducer;
