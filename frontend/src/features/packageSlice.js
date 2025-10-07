import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../axiosInstance";

// Get packages

export const fetchPackage = createAsyncThunk("packages/fetch", async (data) => {
  try {
    let res = await axiosInstance.get("/api/package", data);
    return res.data;
  } catch (error) {
    console.log(error);
  }
});

// Get package by id

export const fetchPackageById = createAsyncThunk(
  "packages/fetchbyId",
  async (id) => {
    try {
      let res = await axiosInstance.get(`/api/package/${id}`);
      return res.data;
    } catch (error) {
      console.log(error);
    }
  }
);

// Add package

export const addPackage = createAsyncThunk("packages/add", async (data) => {
  try {
    let res = await axiosInstance.post("/api/package/add", data);
    return res.data;
  } catch (error) {
    console.log(error);
  }
});

// Edit Package

export const editPackage = createAsyncThunk(
  "packages/edit",
  async ({ id, data }) => {
    try {
      const res = await axiosInstance.put(`/api/package/${id}`, data);
      return res.data;
    } catch (error) {
      console.log(error);
    }
  }
);

// Delete Package

export const deletePackage = createAsyncThunk("packages/delete", async (id) => {
  try {
    const res = await axiosInstance.delete(`/api/package/${id}`);
    return res.data;
  } catch (error) {
    console.log(error);
  }
});

// Fiter Package

export const fetchFilteredPackages = createAsyncThunk(
  "packages/fetchFiltered",
  async (filters) => {
    const params = new URLSearchParams();
    Object.entries(filters).forEach(([key, value]) => {
      if (value) params.append(key, value);
    });

    const res = await axiosInstance.get(`/api/package/filter?${params.toString()}`);
    return res.data;
  }
);

const packageSlice = createSlice({
  name: "package",
  initialState: {
    packages: [],
    loading: false,
    error: null,
    singlePackage: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(addPackage.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addPackage.fulfilled, (state, action) => {
        state.loading = false;
        if (action.payload?.newPackage)
          state.packages.push(action.payload.newPackage);
      })
      .addCase(addPackage.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.error;
      })

      .addCase(fetchPackage.fulfilled, (state, action) => {
        state.loading = false;
        state.packages = action.payload;
      })

      .addCase(fetchPackageById.fulfilled, (state, action) => {
        state.loading = false;
        state.singlePackage = action.payload;
      })

      .addCase(deletePackage.fulfilled, (state, action) => {
        state.packages = state.packages.filter(
          (d) => d._id !== action.payload.id
        );
      })

      .addCase(editPackage.fulfilled, (state, action) => {
        state.loading = false;
        if (action.payload?.updatedPackage) {
          const index = state.packages.findIndex(
            (d) => d._id === action.payload.updatedPackage._id
          );
          if (index !== -1) {
            state.packages[index] = action.payload.updatedPackage;
          }
        }
      })

      .addCase(fetchFilteredPackages.fulfilled, (state, action) => {
        state.loading = false;
        state.packages = action.payload;
      });
  },
});

export default packageSlice.reducer;
