import { courseUSerData } from "@/hooks/courseHandler";
import { diplomaUSerData ,getCoursesByCategory } from "@/hooks/diplomaHandler";
import { CoursePlayerLatestNode, CoursePlayerVideoType } from "@/hooks/PlayerHandler";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const initialState = {
  diploma: [], // Assuming courses are an array
  courses: [], // Assuming course is an array (if you want a single course, modify this accordingly)
  latest: {}, // Assuming course is an array (if you want a single course, modify this accordingly)
  status: "idle", // 'idle' | 'loading' | 'succeeded' | 'failed'
  error: null,
  errorCourse:null,
  statusCourses:"idle",
  errorLatest:null,
  statuLatest:"idle",
};

// Async action to fetch courses
export const UserDiploma = createAsyncThunk(
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

export const fetchCoursesByCategory = createAsyncThunk(
  ".user/diploma/fetchCoursesByCategory",
  async (categoryId, { rejectWithValue }) => {
    try {
      const response = await getCoursesByCategory(categoryId);
      const { data } = response;

      if (!data) {
        return rejectWithValue("No courses found for the category.");
      }

      return data;
    } catch (error) {
      console.error(error);
      return rejectWithValue(error.message);
    }
  }
);
export const LatestVideoNode = createAsyncThunk(
  ".user/diploma/latestVideoNode",
  async (courseId, { rejectWithValue }) => {
    try {
      const response = await CoursePlayerVideoType(courseId);
      // const {data}  = response;
      
      // if (!data) {
      //   return rejectWithValue("No latest found for the category.");
      // }
      return response;
    } catch (error) {
      console.error(error);
      return rejectWithValue(error.message);
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
      .addCase(UserDiploma.pending, (state) => {
        state.status = "loading";
      })
      .addCase(UserDiploma.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.diploma = action.payload; // Store the fetched courses
      })
      .addCase(UserDiploma.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload; // Store the error message
      })
      .addCase(fetchCoursesByCategory.pending, (state) => {
        state.statusCourses = "loading";
      })
      .addCase(fetchCoursesByCategory.fulfilled, (state, action) => {
        state.statusCourses = "succeeded";
        state.courses = action.payload;
      })
      .addCase(fetchCoursesByCategory.rejected, (state, action) => {
        state.statusCourses = "failed";
        state.errorCourse = action.payload;
      })

      .addCase(LatestVideoNode.pending, (state) => {
        state.statuLatest = "loading";
      })
      .addCase(LatestVideoNode.fulfilled, (state, action) => {
        state.statuLatest = "succeeded";
        state.latest = action.payload;
      })
      .addCase(LatestVideoNode.rejected, (state, action) => {
        state.statuLatest = "failed";
        state.errorLatest = action.payload;
      });
  },
});

export const { single_product } = diplomaSlice.actions;
export const selectDiploma = (state) => state.diploma.diploma; // Use the correct slice path
export const selectDiplomaStatus = (state) => state.diploma.status;
export const selectDiplomaCourses = (state) => state.diploma.courses;
export const selectDiplomaCoursesStatus = (state) => state.diploma.statusCourses;
export const selectDiplomaCoursesError = (state) => state.diploma.errorCourse;
export const selectLatestStatus = (state) => state.diploma.statuLatest;
export const selectLatestVideo = (state) => state.diploma.latest;
export const selectLatestError = (state) => state.diploma.errorLatest;

export const selectDiplomaError = (state) => state.diploma.error;

export default diplomaSlice.reducer;
