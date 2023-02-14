import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  pinterestApi,
  singlePin,
  createPinApi,
  userPin,
  profilePins
} from "../../api/pinterestApi";

const initialState = {
  pinsApi: [],
  pin: [],
  userPins: [],
  profilePinsData: [],
  isLoading: false,
  isSuccess: false,
};
export const createPins = createAsyncThunk(
  "pin/create",
  async (pinData, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      return await createPinApi(pinData, token);
    } catch (err) {
      const message =
        (err.response && err.response.data && err.response.data.message) ||
        err.message ||
        err.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);
export const getPins = createAsyncThunk("pin/getAll", async (_, thunkAPI) => {
  try {
    return await pinterestApi();
  } catch (err) {
    const message =
      (err.response && err.response.data && err.response.data.message) ||
      err.message ||
      err.toString();
    return thunkAPI.rejectWithValue(message);
  }
});

export const getUserPin = createAsyncThunk(
  "pin/getUserPin",
  async (_, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      return await userPin(token);
    } catch (err) {
      const message =
        (err.response && err.response.data && err.response.data.message) ||
        err.message ||
        err.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const getProfilePin = createAsyncThunk(
  "pin/getProfilePin",
  async (id, thunkAPI) => {
    try {
      return await profilePins(id);
    } catch (err) {
      const message =
        (err.response && err.response.data && err.response.data.message) ||
        err.message ||
        err.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const getSiglePin = createAsyncThunk(
  "pin/getSingle",
  async (id, thunkAPI) => {
    try {
      return await singlePin(id);
    } catch (err) {
      const message =
        (err.response && err.response.data && err.response.data.message) ||
        err.message ||
        err.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

const pinSlice = createSlice({
  name: "pins",
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(createPins.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createPins.fulfilled, (state, action) => {
        state.isSuccess = true;
        state.isLoading = false;
        state.pinsApi.push(action.payload);
      })
      .addCase(createPins.rejected, (state) => {
        state.isLoading = false;
      })
      .addCase(getPins.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getPins.fulfilled, (state, action) => {
        state.isLoading = false;
        state.pinsApi = action.payload;
      })
      .addCase(getPins.rejected, (state) => {
        state.isLoading = false;
      })
      .addCase(getUserPin.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getUserPin.fulfilled, (state, action) => {
        state.isLoading = false;
        state.userPins = action.payload;
      })
      .addCase(getUserPin.rejected, (state) => {
        state.isLoading = false;
      })
      .addCase(getProfilePin.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getProfilePin.fulfilled, (state, action) => {
        state.isLoading = false;
        state.profilePinsData = action.payload;
      })
      .addCase(getProfilePin.rejected, (state) => {
        state.isLoading = false;
      })
      .addCase(getSiglePin.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getSiglePin.fulfilled, (state, action) => {
        state.isLoading = false;
        state.pin = action.payload;
      })
      .addCase(getSiglePin.rejected, (state) => {
        state.isLoading = false;
      });
  },
});

export const { pinsApi, pin, userPins, profilePinsData } = pinSlice.actions;
export default pinSlice.reducer;
