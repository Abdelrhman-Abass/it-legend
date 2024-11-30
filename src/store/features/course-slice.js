import { courseUSerData } from "@/hooks/courseHandler";
import { CoursePlayerVideo } from "@/hooks/PlayerHandler";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const initialState = {
  courses: [], // Assuming courses are an array
  course: [], // Assuming course is an array (if you want a single course, modify this accordingly)
  status: "idle", // 'idle' | 'loading' | 'succeeded' | 'failed'
  statusV: "idle", // 'idle' | 'loading' | 'succeeded' | 'failed'
  error: null,
  errorV: null,
  video:null
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

// Async action to fetch courses
export const UserCourses = createAsyncThunk(
  "user/courses",
  async (_, { rejectWithValue }) => {
    try {
      const response = await courseUSerData();

      // Handle the response to safely access `data`
      const { data } = response; // Get data from the response (either null or actual data)

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
export const UserCoursePlayerNode = createAsyncThunk(
  "user/courses/player",
  async (courseId ,nodeId, { rejectWithValue }) => {
    try {
      const response = await CoursePlayerVideo(courseId, nodeId);

      // Handle the response to safely access `data`
      // const { data } = response; // Get data from the response (either null or actual data)

      // if (data === null) {
      //   console.log("No data found.");
      //   return {}; // Return an empty object or handle this case appropriately
      // }
      console.log(response)

      return response; // Return the actual data if it's not null

    } catch (error) {
      console.error(error);
      return rejectWithValue(error.message); // Return error if any
    }
  }
);

// Create the slice
export const courseSlice = createSlice({
  name: "courses",
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
        state.courses = action.payload; // Store the fetched courses
      })
      .addCase(UserCourses.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload; // Store the error message
      })
      
      .addCase(UserCoursePlayerNode.pending, (state) => {
        state.statusV = "loading";
      })
      .addCase(UserCoursePlayerNode.fulfilled, (state, action) => {
        state.statusV = "succeeded";
        state.video = action.payload; // Store the fetched courses
      })
      .addCase(UserCoursePlayerNode.rejected, (state, action) => {
        state.statusV = "failed";
        state.errorV = action.payload; // Store the error message
      });
  },
});

export const { single_product } = courseSlice.actions;
export const selectCourses = (state) => state.courses.courses; // Use the correct slice path
export const selectCoursesPlayerVideo = (state) => state.courses.courses; // Use the correct slice path
export const selectCourseStatus = (state) => state.courses.status;
export const selectCourseError = (state) => state.courses.error;

export default courseSlice.reducer;
