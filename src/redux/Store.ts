import { configureStore } from "@reduxjs/toolkit";
import animalReducer from "./features/animalSlice";

export default configureStore({
  reducer: {
    animal: animalReducer,
  },
});
