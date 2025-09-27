import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../axiosInstance";

export const fetchPayments = createAsyncThunk(
  "payments/fetch",
  async (data) => {
    try {
      let res = await axiosInstance.get("/payment", data);
      return res.data;
    } catch (error) {
      console.log(error);
    }
  }
);

const paymentSlice = createSlice({
  name: "payment",
  initialState: { payments: [], loading: false, error: null },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchPayments.fulfilled, (state, action) => {
      state.loading = false;
      state.payments = action.payload;
    });
  },
});

export default paymentSlice.reducer;
