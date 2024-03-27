import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { v4 as uuidv4 } from 'uuid'; // For unique IDs

const initialState = {
  data: localStorage.getItem('tableData')
    ? JSON.parse(localStorage.getItem('tableData'))
    : [],
  loading: false,
  error: null,
};




export const addData = createAsyncThunk(
  'data/addData',
  async (newData) => {
    return { id: uuidv4(), ...newData }; // Add unique ID and spread new data
  }
);

export const deleteData = createAsyncThunk(
  'data/deleteData',
  async (id) => {
    return id; // Return the ID for deletion
  }
);

export const updateData = createAsyncThunk(
  'data/updateData',
  async (updatedData) => {
    // You can add any logic for updating data here, such as API calls or validation
    return updatedData;
  }
);


const dataSlice = createSlice({
  name: 'data',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(addData.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addData.fulfilled, (state, action) => {
        state.loading = false;
        state.data.push(action.payload);
        localStorage.setItem('tableData', JSON.stringify(state.data));
      })
      .addCase(addData.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(deleteData.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteData.fulfilled, (state, action) => {
        state.loading = false;
        state.data = state.data.filter((item) => item.id !== action.payload);
        localStorage.setItem('tableData', JSON.stringify(state.data));
      })
      .addCase(deleteData.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      // for update
      .addCase(updateData.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateData.fulfilled, (state, action) => {
        state.loading = false;
        const updatedIndex = state.data.findIndex((item) => item.id === action.payload.id);
        if (updatedIndex !== -1) {
          state.data[updatedIndex] = action.payload;
        }
        localStorage.setItem('tableData', JSON.stringify(state.data));
      })
      .addCase(updateData.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export default dataSlice.reducer;
