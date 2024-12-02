import { configureStore } from "@reduxjs/toolkit";
import markersReducer from "./slices/markersSlice";
import settingsReducer from "./slices/settingsSlice";
import filterReducer from "./slices/filterSlice";

export const store = configureStore({
  reducer: {
    markers: markersReducer,
    settings: settingsReducer,
    filters: filterReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
