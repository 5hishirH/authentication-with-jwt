import { privateAxios } from "@/lib/axios";
import { AppDispatch, RootState } from "@/store";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

interface UserState {
  loading: "idle" | "pending" | "succeeded" | "failed";
  userData: any | null;
  accessToken: string;
}

interface ThrunkApiConfig {
  state: RootState;
  dispatch: AppDispatch;
}

const initialState: UserState = {
  loading: "idle",
  userData: null,
  accessToken: "",
};

export const fetchUserData = createAsyncThunk<any, void, ThrunkApiConfig>(
  "data/user-data",
  async () => {
    const res = await privateAxios.get("/user/current-user");
    return res.data;
  }
);

export const accessTokenSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    updateAccessToken: (state, action) => {
      state.accessToken = action.payload;
    },
    updateUserData: (state, action) => {
      state.userData = action.payload;
    },
    updateLoading: (state, action) => {
      state.loading = action.payload;
    },
    updateAuth: (state, action) => {
      state.loading = action.payload.loading;
      state.userData = action.payload.userData;
      state.accessToken = action.payload.accessToken;
    },
    resetAuth: (state) => {
      state.loading = initialState.loading;
      state.userData = initialState.userData;
      state.accessToken = initialState.accessToken;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchUserData.pending, (state, _) => {
      state.loading = "pending";
    });
    builder.addCase(fetchUserData.fulfilled, (state, action) => {
      state.loading = "succeeded";
      console.log(action.payload);
      state.userData = action.payload;
    });
    builder.addCase(fetchUserData.rejected, (state, action) => {
      console.log(action.error);
      state.loading = "failed";
    });
  },
});

export const {
  updateAccessToken,
  updateUserData,
  updateLoading,
  updateAuth,
  resetAuth,
} = accessTokenSlice.actions;

export default accessTokenSlice.reducer;
