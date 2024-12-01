import { CoursePlayerLinks, CoursePlayerVideo } from "@/hooks/PlayerHandler";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const initialState = {
  playerLinks: [], // Assuming courses are an array
  course: [], // Assuming course is an array (if you want a single course, modify this accordingly)
  status: "idle", // 'idle' | 'loading' | 'succeeded' | 'failed'
  error: null,
};

// Async action to fetch courses
export const UserCoursePlayerLinks = createAsyncThunk(
  "user/courses",
  async (courseId , nodeId, { rejectWithValue }) => {
    try {
      const response = await CoursePlayerVideo(courseId ,nodeId);

      // Handle the response to safely access `data`
      // const { data } = response; // Get data from the response (either null or actual data)

      // if (data === null) {
      //   console.log("No data found.");
      //   return {}; // Return an empty object or handle this case appropriately
      // }

      return response; // Return the actual data if it's not null
    } catch (error) {
      console.error(error);
      return rejectWithValue(error.message); // Return error if any
    }
  }
);

// Create the slice
export const courseSlicePlayer = createSlice({
  name: "player",
  initialState,
  reducers: {
    single_product: (state, { payload }) => {
      // Handle single product logic if needed
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(UserCoursePlayerLinks.pending, (state) => {
        state.status = "loading";
      })
      .addCase(UserCoursePlayerLinks.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.playerLinks = action.payload; // Store the fetched courses
      })
      .addCase(UserCoursePlayerLinks.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload; // Store the error message
      });
  },
});

export const selectCourseLinks = (state) => state.player.playerLinks; // Use the correct slice path
export const selectCourseStatus = (state) => state.player.status;
export const selectCourseError = (state) => state.player.error;

export default courseSlicePlayer.reducer;
