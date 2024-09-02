import { privateAxios } from "@/lib/axios";
import { AppDispatch, RootState } from "@/store";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

interface UserState {
  loading: "pending" | "loggedIn" | "failed" | "loggedOut";
  userData: any | null;
}

interface ThrunkApiConfig {
  state: RootState;
  dispatch: AppDispatch;
}

const initialState: UserState = {
  loading: "pending",
  userData: null,
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
    updateUserData: (state, action) => {
      state.userData = action.payload;
    },
    updateLoading: (state, action) => {
      state.loading = action.payload;
    },
    updateAuth: (state, action) => {
      state.loading = action.payload.loading;
      state.userData = action.payload.userData;
    },
    logout: (state) => {
      state.loading = "loggedOut";
      state.userData = initialState.userData;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchUserData.pending, (state, _) => {
      state.loading = "pending";
    });
    builder.addCase(fetchUserData.fulfilled, (state, action) => {
      state.loading = "loggedIn";
      console.log(action.payload);
      state.userData = action.payload;
    });
    builder.addCase(fetchUserData.rejected, (state, action) => {
      console.log(action.error);
      state.loading = "failed";
    });
  },
});

export const { updateUserData, updateLoading, updateAuth, logout } =
  accessTokenSlice.actions;

export default accessTokenSlice.reducer;
