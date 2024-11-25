import { combineReducers, configureStore } from "@reduxjs/toolkit";
import courseSlice from "./features/course-slice"; // Path to your courseSlice
import cartSlice from "./features/cart-slice"; // Path to your cartSlice
import wishlistSlice from "./features/wishlist-slice"; // Path to your wishlistSlice
import eventSlice from "./features/event-slice"; // Path to your eventSlice
import filterSlice from "./features/filter-slice"; // Path to your filterSlice
import authSlice from "./features/auth-slice"; // Path to your authSlice

// Combine the reducers
const rootReducer = combineReducers({
  auth: authSlice,
  courses: courseSlice, // Ensure this matches the slice name
  cart: cartSlice,
  wishlist: wishlistSlice,
  event: eventSlice,
  filter: filterSlice,
});

// Create the store with combined reducers
export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});
