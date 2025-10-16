import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../axiosInstance";

// Get all Payments

export const fetchPayments = createAsyncThunk(
  "payments/fetch",
  async (data) => {
    try {
      let res = await axiosInstance.get("/api/payment", data);
      return res.data;
    } catch (error) {
      console.log(error);
    }
  }
);

// Payment Session

export const addPaymentSession = createAsyncThunk(
  "payments/addPayment",
  async (data) => {
    try {
      let res = await axiosInstance.post("/api/payment", data);
      return res.data;
    } catch (err) {
      console.log(err);
    }
  }
);



const paymentSlice = createSlice({
  name: "payment",
  initialState: {
    payments: [],
    loading: false,
    error: null,
    session: null,
    updatedPayment: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchPayments.fulfilled, (state, action) => {
        state.loading = false;
        state.payments = action.payload;
      })
      .addCase(addPaymentSession.fulfilled, (state, action) => {
        state.loading = false;
        state.session = action.payload;
      })

  },
});

export default paymentSlice.reducer;
