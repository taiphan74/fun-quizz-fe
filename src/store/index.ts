import { configureStore } from "@reduxjs/toolkit";

import { authReducer } from "@/features/auth/auth-slice";
import { appReducer } from "./slices/app-slice";

export const store = configureStore({
  reducer: {
    app: appReducer,
    auth: authReducer,
  },
  devTools: process.env.NODE_ENV !== "production",
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
