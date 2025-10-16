import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import axiosInstance from "../axiosInstance";


export const fetchDestination = createAsyncThunk(
  "destination/fetch",
  async (data) => {
    try {
      let res = await axiosInstance.get("/api/destination", data);
      return res.data;
    } catch (error) {
      console.log(error);
    }
  }
);

export const addDestination = createAsyncThunk(
  "destination/add",
  async (data) => {
    try {
      let res = await axiosInstance.post("/api/destination", data);
      return res.data;
    } catch (error) {
      console.log(error);
    }
  }
);

export const editDestination = createAsyncThunk(
  "destination/edit",
  async ({ id, data }) => {
    try {
      const res = await axiosInstance.put(`/api/destination/${id}`, data);
      return res.data;
    } catch (error) {
      console.log(error);
    }
  }
);

export const deleteDestination = createAsyncThunk(
  "destination/delete",
  async (id) => {
    try {
      const res = await axiosInstance.delete(`/api/destination/${id}`);
      return res.data;
    } catch (error) {
      console.log(error);
    }
  }
);

const destinationSlice = createSlice({
  name: "destination",
  initialState: { destinations: [], loading: false, error: null },
  reducers: {},
  extraReducers: (builder) => {
    builder

      .addCase(addDestination.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addDestination.fulfilled, (state, action) => {
        state.loading = false;
        console.log(action.payload)
        if (action.payload?.newDestination) {
          state.destinations.push(action.payload.newDestination);
        }
      })
      .addCase(addDestination.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload.message;
      })


      .addCase(fetchDestination.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchDestination.fulfilled, (state, action) => {
        state.loading = false;
        state.destinations = action.payload;
      })
      .addCase(fetchDestination.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload.message;
      })



      .addCase(deleteDestination.fulfilled, (state, action) => {
        state.destinations = state.destinations.filter(
          (d) => d._id !== action.payload.id
        );

      })



      .addCase(editDestination.fulfilled, (state, action) => {
        state.loading = false;
        if (action.payload?.destination) {
          const index = state.destinations.findIndex(
            (d) => d._id === action.payload.destination._id
          );
          if (index !== -1) {
            state.destinations[index] = action.payload.destination;
          }
        }
      });
  },
});

export default destinationSlice.reducer;
