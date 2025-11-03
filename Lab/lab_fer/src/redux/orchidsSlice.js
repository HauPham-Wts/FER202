// Redux Toolkit Slice - Lab 6
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { orchidsAPI } from '../services/api';

// Async Thunks for API calls
export const fetchOrchids = createAsyncThunk(
  'orchids/fetchAll',
  async (_, { rejectWithValue }) => {
    try {
      const data = await orchidsAPI.getAll();
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const fetchOrchidById = createAsyncThunk(
  'orchids/fetchById',
  async (id, { rejectWithValue }) => {
    try {
      const data = await orchidsAPI.getById(id);
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const createOrchid = createAsyncThunk(
  'orchids/create',
  async (orchidData, { rejectWithValue }) => {
    try {
      const data = await orchidsAPI.create(orchidData);
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const updateOrchid = createAsyncThunk(
  'orchids/update',
  async ({ id, data }, { rejectWithValue }) => {
    try {
      const result = await orchidsAPI.update(id, data);
      return result;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const deleteOrchid = createAsyncThunk(
  'orchids/delete',
  async (id, { rejectWithValue }) => {
    try {
      await orchidsAPI.delete(id);
      return id;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// Add Feedback to Orchid - Lab 7
export const addFeedback = createAsyncThunk(
  'orchids/addFeedback',
  async ({ orchidId, feedbackData }, { getState, rejectWithValue }) => {
    try {
      const state = getState();
      const orchid = state.orchids.orchids.find(o => o.id === orchidId);
      
      if (!orchid) {
        throw new Error('Orchid not found');
      }

      // Check if user already submitted feedback
      const existingFeedback = orchid.feedback || [];
      const userAlreadyFeedback = existingFeedback.some(
        fb => fb.author === feedbackData.author
      );

      if (userAlreadyFeedback) {
        throw new Error('You have already submitted feedback for this orchid');
      }

      // Add new feedback to the array
      const updatedFeedback = [...existingFeedback, feedbackData];
      
      // Update orchid with new feedback
      const updatedOrchid = await orchidsAPI.update(orchidId, {
        ...orchid,
        feedback: updatedFeedback
      });

      return updatedOrchid;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// Delete Feedback from Orchid - Lab 7
export const deleteFeedback = createAsyncThunk(
  'orchids/deleteFeedback',
  async ({ orchidId, feedbackIndex }, { getState, rejectWithValue }) => {
    try {
      const state = getState();
      const orchid = state.orchids.orchids.find(o => o.id === orchidId);
      
      if (!orchid) {
        throw new Error('Orchid not found');
      }

      // Remove feedback at index
      const updatedFeedback = orchid.feedback.filter((_, index) => index !== feedbackIndex);
      
      // Update orchid without the feedback
      const updatedOrchid = await orchidsAPI.update(orchidId, {
        ...orchid,
        feedback: updatedFeedback
      });

      return updatedOrchid;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// Initial State
const initialState = {
  orchids: [],
  selectedOrchid: null,
  loading: false,
  error: null,
  success: null,
};

// Orchids Slice
const orchidsSlice = createSlice({
  name: 'orchids',
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
    clearSuccess: (state) => {
      state.success = null;
    },
    setSelectedOrchid: (state, action) => {
      state.selectedOrchid = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch All Orchids
      .addCase(fetchOrchids.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchOrchids.fulfilled, (state, action) => {
        state.loading = false;
        state.orchids = action.payload;
      })
      .addCase(fetchOrchids.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Fetch Single Orchid
      .addCase(fetchOrchidById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchOrchidById.fulfilled, (state, action) => {
        state.loading = false;
        state.selectedOrchid = action.payload;
      })
      .addCase(fetchOrchidById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Create Orchid
      .addCase(createOrchid.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createOrchid.fulfilled, (state, action) => {
        state.loading = false;
        state.orchids.push(action.payload);
        state.success = 'Orchid created successfully!';
      })
      .addCase(createOrchid.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Update Orchid
      .addCase(updateOrchid.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateOrchid.fulfilled, (state, action) => {
        state.loading = false;
        const index = state.orchids.findIndex(o => o.id === action.payload.id);
        if (index !== -1) {
          state.orchids[index] = action.payload;
        }
        state.success = 'Orchid updated successfully!';
      })
      .addCase(updateOrchid.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Delete Orchid
      .addCase(deleteOrchid.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteOrchid.fulfilled, (state, action) => {
        state.loading = false;
        state.orchids = state.orchids.filter(o => o.id !== action.payload);
        state.success = 'Orchid deleted successfully!';
      })
      .addCase(deleteOrchid.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Add Feedback - Lab 7
      .addCase(addFeedback.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addFeedback.fulfilled, (state, action) => {
        state.loading = false;
        const index = state.orchids.findIndex(o => o.id === action.payload.id);
        if (index !== -1) {
          state.orchids[index] = action.payload;
        }
        if (state.selectedOrchid?.id === action.payload.id) {
          state.selectedOrchid = action.payload;
        }
        state.success = 'Feedback submitted successfully!';
      })
      .addCase(addFeedback.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Delete Feedback - Lab 7
      .addCase(deleteFeedback.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteFeedback.fulfilled, (state, action) => {
        state.loading = false;
        const index = state.orchids.findIndex(o => o.id === action.payload.id);
        if (index !== -1) {
          state.orchids[index] = action.payload;
        }
        if (state.selectedOrchid?.id === action.payload.id) {
          state.selectedOrchid = action.payload;
        }
        state.success = 'Feedback deleted successfully!';
      })
      .addCase(deleteFeedback.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { clearError, clearSuccess, setSelectedOrchid } = orchidsSlice.actions;
export default orchidsSlice.reducer;
