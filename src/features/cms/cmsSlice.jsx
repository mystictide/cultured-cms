import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getWithDate } from "../../assets/js/helpers";
import cmsService from "./cmsService";

const filteredData = JSON.parse(getWithDate("filteredCharacters"));
const filteredBG = JSON.parse(getWithDate("filteredBackgrounds"));
const categories = JSON.parse(getWithDate("categories"));

const initialState = {
  filteredData: filteredData ? filteredData : null,
  filteredBG: filteredBG ? filteredBG : null,
  cats: categories ? categories : null,
  character: null,
  bg: null,
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: null,
};

export const getCategories = createAsyncThunk(
  "cms/getCategories",
  async (thunkAPI) => {
    try {
      const response = await cmsService.getCategories();
      if (response.status === 500) {
        return thunkAPI.rejectWithValue(response);
      }
      return response;
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const filterCharacters = createAsyncThunk(
  "cms/filterCharacters",
  async (reqData, thunkAPI) => {
    try {
      const response = await cmsService.filterCharacters(reqData);
      if (response.status === 500) {
        return thunkAPI.rejectWithValue(response);
      }
      return response;
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const filterBackgrounds = createAsyncThunk(
  "cms/filterBackgrounds",
  async (reqData, thunkAPI) => {
    try {
      const response = await cmsService.filterBackgrounds(reqData);
      if (response.status === 500) {
        return thunkAPI.rejectWithValue(response);
      }
      return response;
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const manageCharacter = createAsyncThunk(
  "cms/manageCharacter",
  async (reqData, thunkAPI) => {
    try {
      const response = await cmsService.manageCharacter(reqData);
      if (response.status === 500) {
        return thunkAPI.rejectWithValue(response);
      }
      return response;
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const manageCategory = createAsyncThunk(
  "cms/manageCategory",
  async (reqData, thunkAPI) => {
    try {
      const response = await cmsService.manageCategory(reqData);
      if (response.status === 500) {
        return thunkAPI.rejectWithValue(response);
      }
      return response;
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const manageBackground = createAsyncThunk(
  "cms/manageBackground",
  async (reqData, thunkAPI) => {
    try {
      const response = await cmsService.manageBackground(reqData);
      if (response.status === 500) {
        return thunkAPI.rejectWithValue(response);
      }
      return response;
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const cmsSlice = createSlice({
  name: "cms",
  initialState,
  reducers: {
    reset: (state) => {
      state.cats = null;
      state.filteredData = null;
      state.filteredBG = null;
      state.isLoading = false;
      state.isSuccess = false;
      state.isError = false;
      state.message = null;
      localStorage.removeItem("filteredCharacters");
      localStorage.removeItem("filteredBackgrounds");
      localStorage.removeItem("categories");
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getCategories.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getCategories.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.cats = action.payload;
      })
      .addCase(getCategories.rejected, (state, action) => {
        state.isLoading = false;
        state.isSuccess = false;
        state.isError = true;
        state.cats = null;
      })
      .addCase(filterCharacters.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(filterCharacters.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.filteredData = action.payload;
      })
      .addCase(filterCharacters.rejected, (state, action) => {
        state.isLoading = false;
        state.isSuccess = false;
        state.isError = true;
        state.filteredData = null;
      })
      .addCase(filterBackgrounds.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(filterBackgrounds.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.filteredBG = action.payload;
      })
      .addCase(filterBackgrounds.rejected, (state, action) => {
        state.isLoading = false;
        state.isSuccess = false;
        state.isError = true;
        state.filteredBG = null;
      })
      .addCase(manageCharacter.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(manageCharacter.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.character = action.payload;
      })
      .addCase(manageCharacter.rejected, (state, action) => {
        state.isLoading = false;
        state.isSuccess = false;
        state.isError = true;
        state.character = null;
      })
      .addCase(manageCategory.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(manageCategory.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.cats = action.payload;
      })
      .addCase(manageCategory.rejected, (state, action) => {
        state.isLoading = false;
        state.isSuccess = false;
        state.isError = true;
        state.message = null;
      })
      .addCase(manageBackground.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(manageBackground.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.bg = action.payload;
      })
      .addCase(manageBackground.rejected, (state, action) => {
        state.isLoading = false;
        state.isSuccess = false;
        state.isError = true;
        state.message = null;
      });
  },
});

export const { reset } = cmsSlice.actions;
export default cmsSlice.reducer;
