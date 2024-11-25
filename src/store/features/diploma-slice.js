import { courseUSerData } from "@/hooks/courseHandler";
import { diplomaUSerData } from "@/hooks/diplomaHanler";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const initialState = {
  diploma: [], // Assuming courses are an array
  course: [], // Assuming course is an array (if you want a single course, modify this accordingly)
  status: "idle", // 'idle' | 'loading' | 'succeeded' | 'failed'
  error: null,
};

// Async action to fetch courses
export const UserCourses = createAsyncThunk(
  "user/diploma",
  async (_, { rejectWithValue }) => {
    try {
      const response = await diplomaUSerData();

      // Handle the response to safely access `data`
      const { data } = response; // Get data from the response (either null or actual data)

      if (data === null) {
        console.log("No data found.");
        return {}; // Return an empty object or handle this case appropriately
      }

      return data; // Return the actual data if it's not null
    } catch (error) {
      console.error(error);
      return rejectWithValue(error.message); // Return error if any
    }
  }
);

// Create the slice
export const diplomaSlice = createSlice({
  name: "diploma",
  initialState,
  reducers: {
    single_product: (state, { payload }) => {
      // Handle single product logic if needed
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(UserCourses.pending, (state) => {
        state.status = "loading";
      })
      .addCase(UserCourses.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.diploma = action.payload; // Store the fetched courses
      })
      .addCase(UserCourses.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload; // Store the error message
      });
  },
});

export const { single_product } = courseSlice.actions;
export const selectDiploma = (state) => state.diploma.diploma; // Use the correct slice path
export const selectDiplomaStatus = (state) => state.diploma.status;
export const selectDiplomaError = (state) => state.diploma.error;

export default diplomaSlice.reducer;
