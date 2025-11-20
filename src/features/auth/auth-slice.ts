import axios from "axios";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import { api } from "@/lib/axios";
import type { StandardResponse } from "@/lib/api-types";
import type { LoginInput, RegisterInput } from "./schemas";

type AuthUser = {
  id: string;
  username: string;
  email: string;
  role: string;
};

type AuthResponse = {
  user: AuthUser;
  accessToken: string;
  refreshToken: string;
};

type AuthState = {
  user: AuthUser | null;
  accessToken: string | null;
  refreshToken: string | null;
  loading: boolean;
  error: string | null;
};

type RejectValue = {
  rejectValue: string;
};

const initialState: AuthState = {
  user: null,
  accessToken: null,
  refreshToken: null,
  loading: false,
  error: null,
};

const getErrorMessage = (error: unknown): string => {
  if (axios.isAxiosError<{ message?: string | string[] }>(error)) {
    const messageFromApi = error.response?.data?.message;

    if (typeof messageFromApi === "string") {
      return messageFromApi;
    }

    if (Array.isArray(messageFromApi) && messageFromApi.length > 0) {
      return messageFromApi[0];
    }
  }

  if (error instanceof Error && error.message) {
    return error.message;
  }

  return "Đã xảy ra lỗi, vui lòng thử lại.";
};

export const loginThunk = createAsyncThunk<AuthResponse, LoginInput, RejectValue>(
  "auth/login",
  async (credentials, { rejectWithValue }) => {
    try {
      const { data } = await api.post<StandardResponse<AuthResponse>>(
        "/auth/login",
        credentials
      );

      const payload = data.data as AuthResponse | null;

      if (!payload) {
        throw new Error("Đăng nhập thất bại.");
      }

      return payload;
    } catch (error) {
      return rejectWithValue(getErrorMessage(error));
    }
  }
);

export const registerThunk = createAsyncThunk<
  AuthResponse,
  RegisterInput,
  RejectValue
>("auth/register", async (payload, { rejectWithValue }) => {
  try {
    const { data } = await api.post<StandardResponse<AuthResponse>>(
      "/auth/register",
      payload
    );

    const responsePayload = data.data as AuthResponse | null;

    if (!responsePayload) {
      throw new Error("Đăng ký thất bại.");
    }

    return responsePayload;
  } catch (error) {
    return rejectWithValue(getErrorMessage(error));
  }
});

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    clearAuthError(state) {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload.user;
        state.accessToken = action.payload.accessToken;
        state.refreshToken = action.payload.refreshToken;
      })
      .addCase(loginThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload ?? "Không thể đăng nhập. Vui lòng thử lại.";
      })
      .addCase(registerThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(registerThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload.user;
        state.accessToken = action.payload.accessToken;
        state.refreshToken = action.payload.refreshToken;
      })
      .addCase(registerThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload ?? "Không thể đăng ký. Vui lòng thử lại.";
      });
  },
});

export const { clearAuthError } = authSlice.actions;
export const authReducer = authSlice.reducer;
