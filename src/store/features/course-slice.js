import { courseUSerData } from "@/hooks/courseHandler";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const initialState = {
  courses: [], // Assuming courses are an array
  course: [], // Assuming course is an array (if you want a single course, modify this accordingly)
  status: "idle", // 'idle' | 'loading' | 'succeeded' | 'failed'
  error: null,
};

// Async action to fetch courses
// export const UserCourses = createAsyncThunk(
//   "user/courses", // Thunk action type
//   async (_, { rejectWithValue }) => {
//     try {
//       const token = cookies().get('token')?.value;
//       if (!token) throw new Error("Token is not available");

//       const response = await fetch(`http://49.13.77.125:1118/Endpoint/api/MemberCourse`, {
//         method: "GET",
//         headers: {
//           Authorization: `Bearer ${token}`,
//           "Content-Type": "application/json",
//         },
//       });

//       if (!response.ok) {
//         throw new Error("Failed to fetch data");
//       }

//       const data = await response.json();
//       return data;
//     } catch (error) {
//       return rejectWithValue(error.message);
//     }
//   }
// );
export const UserCourses = createAsyncThunk(
  "user/courses",
  async (_, { rejectWithValue }) => {
    try {
      const response = await courseUSerData();
      const { data } = response;
      console.log(data)
      return data ;

      
    } catch (error) {
      console.log(error)
    }
  }
);
// Create the slice
export const courseSlice = createSlice({
  name: "courses", // Ensure this is "courses"
  initialState,
  reducers: {
    single_product: (state, { payload }) => {},
  },
  extraReducers: (builder) => {
    builder
      .addCase(UserCourses.pending, (state) => {
        state.status = "loading";
      })
      .addCase(UserCourses.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.courses = action.payload; // Store the fetched courses
      })
      .addCase(UserCourses.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload; // Store the error message
      });
  },
});

export const { single_product } = courseSlice.actions;
export const selectCourses = (state) => state.courses.courses; // Make sure to use state.courses
export const selectCourseStatus = (state) => state.courses.status; // Adjust for consistency
export const selectCourseError = (state) => state.courses.error; // Adjust for consistency
export default courseSlice.reducer;
