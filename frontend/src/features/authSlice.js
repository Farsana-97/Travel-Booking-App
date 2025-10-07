import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import axiosInstance from "../axiosInstance";
import toast from "react-hot-toast";

// Registration

export const registerUser = createAsyncThunk("auth/register", async (data) => {
  try {
    let res = await axiosInstance.post("/auth/register", data);
    return res.data;
  } catch (error) {
    console.log(error);
  }
});

// Login

export const loginUser = createAsyncThunk("auth/login", async (data) => {
  try {
    const res = await axiosInstance.post("/auth/login", data);
    console.log(res)
    if (res.data.token) {
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("role", res.data.role);
      localStorage.setItem("userId", res.data.userId);
    }
    return res.data;
  } catch (err) {
    console.log(err);
  }
});



const authSlice = createSlice({
  name: "auth",
  initialState: {
    user: null,
    loading: false,
    error: null,
  },
  reducers: {
    logout: (state) => {
      localStorage.removeItem("token");
      localStorage.removeItem("role");
      localStorage.removeItem("userId");
      state.user = null;
      state.token = null;
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(registerUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
        toast.success("Registration Completed");
      })
      .addCase(registerUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.error;
      })

      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
        toast.success("Logined Succeffully Completed");
      })
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.error;
      });
  },
});

export const { logout } = authSlice.actions;

export default authSlice.reducer;
