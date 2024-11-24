import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { course_data } from "../../data";

// Define an async thunk for fetching data
export const fetchCourses = createAsyncThunk(
  'courses/fetchCourses',
  async () => {
    const response = await fetch('https://api.example.com/courses'); // Replace with your API URL
    if (!response.ok) {
      throw new Error('Failed to fetch courses');
    }
    const data = await response.json();
    return data; // Return the fetched data
  }
);

const initialState = {
  courses: course_data,
  course: {},
  status: 'idle', // 'idle' | 'loading' | 'succeeded' | 'failed'
  error: null,
};

export const courseSlice = createSlice({
  name: "course",
  initialState,
  reducers: {
    single_product: (state, { payload }) => {},
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCourses.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchCourses.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.courses = action.payload; // Store the fetched courses
      })
      .addCase(fetchCourses.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message; // Store the error message
      });
  },
});

export const { single_product } = courseSlice.actions;
export const selectCourses = (state) => state.courses.courses;
export const selectCourseStatus = (state) => state.courses.status;
export const selectCourseError = (state) => state.courses.error;
export default courseSlice.reducer;
