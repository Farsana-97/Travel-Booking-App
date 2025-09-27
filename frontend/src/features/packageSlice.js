import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../axiosInstance";

export const fetchPackage = createAsyncThunk("packages/fetch", async (data) => {
  try {
    let res = await axiosInstance.get("/package", data);
    return res.data;
  } catch (error) {
    console.log(error);
  }
});


export const addPackage = createAsyncThunk(
  "packages/add",
  async (data) => {
    try {
      let res = await axiosInstance.post("/package", data);
      return res.data;
    } catch (error) {
      console.log(error);
    }
  }
);


export const editPackage = createAsyncThunk(
  "packages/edit",
  async ({ id, data }) => {
    try {
      const res = await axiosInstance.put(`/package/${id}`, data);
      return res.data;
    } catch (error) {
      console.log(error);
    }
  }
);

export const deletePackage = createAsyncThunk(
  "packages/delete",
  async (id) => {
    try {
      const res = await axiosInstance.delete(`/package/${id}`);
      return res.data;
    } catch (error) {
      console.log(error);
    }
  }
);


const packageSlice = createSlice({
  name: "package",
  initialState: { packages: [], loading: false, error: null },
  reducers: {},
  extraReducers: (builder) => {
    builder

      .addCase(addPackage.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addPackage.fulfilled, (state, action) => {
        state.loading = false;
        if (action.payload?.newPackage) {
          state.packages.push(action.payload.newPackage);
        }
      })
      .addCase(addPackage.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload.message;
      })

      .addCase(fetchPackage.fulfilled, (state, action) => {
        state.loading = false;
        state.packages = action.payload;
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
      });
  },
});

export default packageSlice.reducer;
