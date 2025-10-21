import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import axiosInstance from "../axiosInstance";
import toast from "react-hot-toast";

// Registration

export const registerUser = createAsyncThunk("auth/register", async (data) => {
  try {
    let res = await axiosInstance.post("/api/auth/register", data);
    console.log(res);
    return res.data;
  } catch (error) {
    console.log(error);
  }
});

// Login

export const loginUser = createAsyncThunk("auth/login", async (data) => {
  try {
    const res = await axiosInstance.post("/api/auth/login", data);
    console.log("hello");
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

export const fetchUsers = createAsyncThunk("auth/fetch", async () => {
  try {
    const res = await axiosInstance.get("/api/auth/users");
    return res.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
});

export const deleteUser = createAsyncThunk(
  "auth/delete",
  async (id) => {
    try {
      const res = await axiosInstance.delete(`/api/auth/${id}`);
      return res.data;
    } catch (error) {
      console.log(error);
    }
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState: {
    user: null,
    loading: false,
    error: null,
    users: [],
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
        toast.success(
          "🎉 Registration Successful!\nWelcome aboard, traveler!",
          {
            style: {
              borderRadius: "12px",
              background: "#f0fdf4",
              color: "#166534",
              border: "1px solid #86efac",
              fontWeight: "500",
            },
            iconTheme: {
              primary: "#16a34a",
              secondary: "#f0fdf4",
            },
            duration: 4000,
          }
        );
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
        toast.success(
          "🎉 Welcome To TravelVista!\nYou’re logged in successfully.",
          {
            style: {
              borderRadius: "12px",
              background: "#f0fdf4",
              color: "#166534",
              border: "1px solid #86efac",
              fontWeight: "500",
            },
            iconTheme: {
              primary: "#16a34a",
              secondary: "#f0fdf4",
            },
            duration: 4000,
          }
        );
      })
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.error;
      })

      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.loading = false;
        state.users = action.payload;
      })
      .addCase(fetchUsers.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchUsers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.error;
      })

      .addCase(deleteUser.fulfilled, (state, action) => {
              state.users = state.users.filter(
                (d) => d._id !== action.payload.id
              );
      
            })
  },
});

export const { logout } = authSlice.actions;

export default authSlice.reducer;
