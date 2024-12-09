import { courseGlobalData, courseUSerData } from "@/hooks/courseHandler";
import { CoursePlayerVideo } from "@/hooks/PlayerHandler";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const initialState = {
  courses: [], // Assuming courses are an array
  course: [], // Assuming course is an array (if you want a single course, modify this accordingly)
  status: "idle", // 'idle' | 'loading' | 'succeeded' | 'failed'
  statusV: "idle", // 'idle' | 'loading' | 'succeeded' | 'failed'
  error: null,
  errorV: null,
  video:null,
  gloabCourse : [],
  globalCourseStatus:"idle",
  globalCourseError:null
};

// Async action to fetch courses
export const Courses = createAsyncThunk(
  "user/courses/global", // Thunk action type
  async (_, { rejectWithValue }) => {
    try {
      const response = await courseGlobalData()
      console.log(response)

      // if (!response.ok) {
      //   throw new Error("Failed to fetch data");
      // }

      return response;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

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
  async ({courseId ,nodeId }, { rejectWithValue }) => {
    try {
      // const nodeId="8f6f7c08-ed89-4c9e-85aa-a35f744a578d"

      console.log(courseId , nodeId)
      const response = await CoursePlayerVideo(courseId, nodeId);

      // Handle the response to safely access `data`
      // const { data } = response; // Get data from the response (either null or actual data)

      // if (data === null) {
      //   console.log("No data found.");
      //   return {}; // Return an empty object or handle this case appropriately
      // }
      console.log("res from slice " +response)

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
        state.courses = action.payload; // Store the fetched courses https://it-legend-rrkg.vercel.app/ar/course-player/c7f5bfef-8117-4021-b83e-448051bced9a?type=0&no=8f6f7c08-ed89-4c9e-85aa-a35f744a578d
      })
      .addCase(UserCourses.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload; // Store the error message
      })
      
      .addCase(UserCoursePlayerNode.pending, (state) => {
        state.status = "loading";
      })
      .addCase(UserCoursePlayerNode.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.video = action.payload; // Store the fetched courses
      })
      .addCase(UserCoursePlayerNode.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload; // Store the error message
      })
      .addCase(Courses.pending, (state) => {
        state.globalCourseStatus = "loading";
      })
      .addCase(Courses.fulfilled, (state, action) => {
        state.globalCourseStatus = "succeeded";
        state.gloabCourse = action.payload; // Store the fetched courses
      })
      .addCase(Courses.rejected, (state, action) => {
        state.globalCourseStatus = "failed";
        state.globalCourseError = action.payload; // Store the error message
      });
  },
});

export const { single_product } = courseSlice.actions;
export const selectCourses = (state) => state.courses.courses; // Use the correct slice path
export const selectCoursesPlayerVideo = (state) => state.courses.video; // Use the correct slice path
export const selectCourseStatus = (state) => state.courses.status;
export const selectCourseError = (state) => state.courses.error;
export const selectGlobalCourseError = (state) => state.courses.globalCourseError;
export const selectGlobalCourseStatus = (state) => state.courses.globalCourseStatus;
export const selectGlobalCourses = (state) => state.courses.gloabCourse;

export default courseSlice.reducer;
