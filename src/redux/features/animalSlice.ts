import { createSlice } from "@reduxjs/toolkit";
import IAnimal from "../../models/IAnimal";
import { getList, save } from "../../services/StorageService";
import { IAction } from "../models/IAction";

let defaultValue: IAnimal[] = getList<IAnimal>();

const animalSlice = createSlice({
  name: "animal",
  initialState: { value: defaultValue },
  reducers: {
    setAll: (state, action: IAction<IAnimal[]>) => {
      state.value = action.payload;
      save(state.value);
    },
    feedAnimal: (state, action: IAction<IAnimal>) => {
      const animal = state.value.find((a) => a.id === action.payload.id);
      if (animal) {
        save(state.value);
        animal.isFed = true;
        animal.lastFed = new Date().toISOString();
      }
    },
    animalBecomesHungry: (state, action: IAction<IAnimal>) => {
      const animal = state.value.find((a) => a.id === action.payload.id);
      if (animal) {
        save(state.value);
        animal.isFed = false;
      }
    },
  },
});

export const { setAll, animalBecomesHungry, feedAnimal } = animalSlice.actions;

export default animalSlice.reducer;
