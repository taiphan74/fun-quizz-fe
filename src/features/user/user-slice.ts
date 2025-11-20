import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import { api } from "@/lib/axios";
import type { StandardResponse } from "@/lib/api-types";

type UserProfile = {
  id: string;
  username: string;
  email: string;
  role: string;
};

type UserState = {
  profile: UserProfile | null;
  loading: boolean;
  error: string | null;
};

const initialState: UserState = {
  profile: null,
  loading: false,
  error: null,
};

export const fetchUserProfileThunk = createAsyncThunk<UserProfile>(
  "user/fetchProfile",
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await api.get<StandardResponse<UserProfile>>("/users/me");

      const payload = data.data as UserProfile | null;

      if (!payload) {
        throw new Error("Không tìm thấy thông tin người dùng.");
      }

      return payload;
    } catch (error) {
      if (error instanceof Error && error.message) {
        return rejectWithValue(error.message);
      }
      return rejectWithValue("Không thể lấy thông tin người dùng.");
    }
  }
);

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    clearUserError(state) {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUserProfileThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchUserProfileThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.profile = action.payload;
      })
      .addCase(fetchUserProfileThunk.rejected, (state, action) => {
        state.loading = false;
        state.error =
          (action.payload as string | undefined) ??
          "Không thể lấy thông tin người dùng.";
      });
  },
});

export const { clearUserError } = userSlice.actions;
export const userReducer = userSlice.reducer;
