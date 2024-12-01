import { CoursePlayerVideoComments, CoursePlayerVideo } from "@/hooks/PlayerHandler";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

// Initial state
const initialState = {
  playerLinks: [], // Assuming courses are an array
  course: [], // Assuming course is an array (if you want a single course, modify this accordingly)
  status: "idle", // 'idle' | 'loading' | 'succeeded' | 'failed'
  error: null,
  comments: [] // Comments will be stored here
};

// Async action to fetch course player links
export const UserCoursePlayerLinks = createAsyncThunk(
  "user/courses", // Action type
  async ({ courseId, nodeId }, { rejectWithValue }) => {
    try {
      console.log(courseId, nodeId);
      const response = await CoursePlayerVideo(courseId, nodeId);
      return response; // Return the actual data
    } catch (error) {
      console.error(error);
      return rejectWithValue(error.message); // Return error message if any
    }
  }
);

// Async action to fetch course comments
export const UserCoursePlayerComments = createAsyncThunk(
  "user/courses/comments", // Action type
  async ({ nodeId }, { rejectWithValue }) => {
    try {
      console.log(nodeId);
      const response = await CoursePlayerVideoComments(nodeId);
      return response; // Return the actual data
    } catch (error) {
      console.error(error);
      return rejectWithValue(error.message); // Return error message if any
    }
  }
);

// Create the slice
export const courseSlicePlayer = createSlice({
  name: "player",
  initialState,
  reducers: {
    // Additional reducers if needed
    single_product: (state, { payload }) => {
      // Handle single product logic if needed
    },
  },
  extraReducers: (builder) => {
    builder
      // Handling UserCoursePlayerLinks async action
      .addCase(UserCoursePlayerLinks.pending, (state) => {
        state.status = "loading";
      })
      .addCase(UserCoursePlayerLinks.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.playerLinks = action.payload; // Store the fetched player links
      })
      .addCase(UserCoursePlayerLinks.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload; // Store the error message
      })
      
      // Handling UserCoursePlayerComments async action
      .addCase(UserCoursePlayerComments.pending, (state) => {
        state.status = "loading";
      })
      .addCase(UserCoursePlayerComments.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.comments = action.payload; // Store the fetched comments
      })
      .addCase(UserCoursePlayerComments.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload; // Store the error message
      });
  },
});

// Selectors to retrieve data from the store
export const selectCourseLinks = (state) => state.player.playerLinks;
export const selectCourseComments = (state) => state.player.comments;
export const selectCourseStatus = (state) => state.player.status;
export const selectCourseError = (state) => state.player.error;

export default courseSlicePlayer.reducer;
