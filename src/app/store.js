import { configureStore } from "@reduxjs/toolkit";
import cmsReducer from "../features/cms/cmsSlice";
import modalReducer from "../features/helpers/modalSlice";

export const store = configureStore({
  reducer: {
    cms: cmsReducer,
    modals: modalReducer,
  },
});
