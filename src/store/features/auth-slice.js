// import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
// import { authHandler } from "@/app/[local]/auth/authHandler";

// const initialState = {
//   allUsers: [],
//   user: null,
//   accessToken: null,
//   refreshToken: null,
//   loading: false,
//   error: null,
//   isAuthenticated: false,
// };

// // Register User
// export const signupUser = createAsyncThunk(
//   "auth/signupUser",
//   async (userData, { rejectWithValue }) => {
//     try {
//       const response = await authHandler("Auth/email-login", userData);
      
//       if (response.data.data.id) {
//         const { accessToken, refreshToken, user } = response.data.data;
//         sessionStorage.setItem("accessToken", accessToken);
//         sessionStorage.setItem("refreshToken", refreshToken);
//         sessionStorage.setItem("user", JSON.stringify(user));
//         return { user, accessToken, refreshToken };
//       } else {
//         return rejectWithValue(response.data.message.title);
//       }
//     } catch (error) {
//       return rejectWithValue(error.response?.data?.message || "Registration failed");
//     }
//   }
// );

// // Login User
// export const loginUser = createAsyncThunk(
//   "auth/loginUser",
//   async (userData, { rejectWithValue }) => {
//     try {
//       const response = await authHandler("/api/account/login", userData);
      
//       if (response.data.data.id) {
//         const { accessToken, refreshToken, user } = response.data.data;
//         sessionStorage.setItem("accessToken", accessToken);
//         sessionStorage.setItem("refreshToken", refreshToken);
//         sessionStorage.setItem("user", JSON.stringify(user));
//         return { user, accessToken, refreshToken };
//       } else {
//         return rejectWithValue(response.data.message.title);
//       }
//     } catch (error) {
//       return rejectWithValue(error.response?.data?.message || "Login failed");
//     }
//   }
// );

// // Logout User
// export const logoutUser = createAsyncThunk(
//   "auth/logoutUser",
//   async (_, { rejectWithValue }) => {
//     try {
//       sessionStorage.removeItem("accessToken");
//       sessionStorage.removeItem("refreshToken");
//       sessionStorage.removeItem("user");
//       return true;
//     } catch (error) {
//       return rejectWithValue("Logout failed");
//     }
//   }
// );

// export const authSlice = createSlice({
//   name: "auth",
//   initialState,
//   reducers: {
//     clearError: (state) => {
//       state.error = null;
//     },
//     setUser: (state, action) => {
//       state.user = action.payload;
//       state.isAuthenticated = !!action.payload;
//     },
//   },
//   extraReducers: (builder) => {
//     builder
//       // Register cases
//       .addCase(signupUser.pending, (state) => {
//         state.loading = true;
//         state.error = null;
//       })
//       .addCase(signupUser.fulfilled, (state, action) => {
//         state.loading = false;
//         state.user = action.payload.user;
//         state.accessToken = action.payload.accessToken;
//         state.refreshToken = action.payload.refreshToken;
//         state.isAuthenticated = true;
//         state.error = null;
//       })
//       .addCase(signupUser.rejected, (state, action) => {
//         state.loading = false;
//         state.error = action.payload || "Registration failed";
//       })
//       // Login cases
//       .addCase(loginUser.pending, (state) => {
//         state.loading = true;
//         state.error = null;
//       })
//       .addCase(loginUser.fulfilled, (state, action) => {
//         state.loading = false;
//         state.user = action.payload.user;
//         state.accessToken = action.payload.accessToken;
//         state.refreshToken = action.payload.refreshToken;
//         state.isAuthenticated = true;
//         state.error = null;
//       })
//       .addCase(loginUser.rejected, (state, action) => {
//         state.loading = false;
//         state.error = action.payload || "Login failed";
//         state.isAuthenticated = false;
//       })
//       // Logout cases
//       .addCase(logoutUser.pending, (state) => {
//         state.loading = true;
//       })
//       .addCase(logoutUser.fulfilled, (state) => {
//         state.loading = false;
//         state.user = null;
//         state.accessToken = null;
//         state.refreshToken = null;
//         state.isAuthenticated = false;
//         state.error = null;
//       })
//       .addCase(logoutUser.rejected, (state, action) => {
//         state.loading = false;
//         state.error = action.payload;
//       });
//   },
// });

// export const { clearError, setUser } = authSlice.actions;

// export default authSlice.reducer;


import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { authHandler } from "@/app/[local]/auth/authHandler";

const initialState = {
  user: null,
  accessToken: null,
  refreshToken: null,
  loading: false,
  error: null,
  isAuthenticated: false,
  message: "",
  errors: [],
};

// Login User
export const loginUser = createAsyncThunk(
  "auth/loginUser",
  async (userData, { rejectWithValue }) => {
    try {
      const response = await authHandler("Auth/email-login", userData);
      if (response) {
        const { user, accessToken, refreshToken } = response;
        return { user, accessToken, refreshToken };
      } else {
        return rejectWithValue("Login failed");
      }
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || "Login failed");
    }
  }
);

// Logout User
export const logoutUser = createAsyncThunk(
  "auth/logoutUser",
  async (_, { rejectWithValue }) => {
    try {
      cookies().set("token", "", { maxAge: 0 });
      cookies().set("refreshToken", "", { maxAge: 0 });
      cookies().set("user_id", "", { maxAge: 0 });
      cookies().set("user", "", { maxAge: 0 });
      return true;
    } catch (error) {
      return rejectWithValue("Logout failed");
    }
  }
);

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
    setUser: (state, action) => {
      state.user = action.payload;
      state.isAuthenticated = !!action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload.user;
        state.accessToken = action.payload.accessToken;
        state.refreshToken = action.payload.refreshToken;
        state.isAuthenticated = true;
        state.error = null;
        state.message = "Login successful";
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Login failed";
        state.isAuthenticated = false;
      })
      .addCase(logoutUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(logoutUser.fulfilled, (state) => {
        state.loading = false;
        state.user = null;
        state.accessToken = null;
        state.refreshToken = null;
        state.isAuthenticated = false;
        state.error = null;
      })
      .addCase(logoutUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { clearError, setUser } = authSlice.actions;
export const Auth = (state) => state.auth.auth;

export default authSlice.reducer;
