import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { getCharacters, getOneCharacter } from "./appActions";
import { ICharacterItem } from "@/models";

export interface AppState {
  totalAttempts: number;
  successAttempts: number;
  failedAttempts: number;
  characters: ICharacterItem[] | null | undefined;
  currentCharacter: ICharacterItem | null | undefined;
  selectedCharacter: ICharacterItem | null | undefined;
  answeredCharacters: ICharacterItem[];
}

const initialState: AppState = {
  totalAttempts: 0,
  successAttempts: 0,
  failedAttempts: 0,
  characters: [],
  currentCharacter: null,
  answeredCharacters: [],
  selectedCharacter: null,
};

export const appSlice = createSlice({
  name: "app",
  initialState,
  reducers: {
    incrementTotalAttempts: (state) => {
      state.totalAttempts += 1;
      const increasedAttempts = {
        ...state.currentCharacter,
        attempts: state.currentCharacter?.attempts + 1,
      };
      state.currentCharacter = increasedAttempts;
    },
    incrementSuccessAttempts: (state) => {
      state.successAttempts += 1;
      const successedAttemptCharacter = {
        ...state.currentCharacter,
        isHasSuccessAttempt: true,
      };
      state.currentCharacter = successedAttemptCharacter;
    },
    incrementFailedAttempts: (state) => {
      state.failedAttempts += 1;
    },
    resetAttempts: (state) => {
      state.failedAttempts = 0;
      state.successAttempts = 0;
      state.totalAttempts = 0;
      state.answeredCharacters = [];
    },
    getRandomCharacter: (state) => {
      const characters = state.characters;
      const randomIndex = Math.floor(Math.random() * characters!.length);
      const filteredCharacters = characters?.filter(
        (character) => character.id !== randomCharacter?.id
      );
      const randomCharacter = characters?.[randomIndex];
      const newRandomCharacter = {
        ...randomCharacter,
        attempts: 0,
        isHasSuccessAttempt: false,
      };
      state.characters = filteredCharacters;
      state.currentCharacter = newRandomCharacter;
    },
    addAnsweredCharacter: (state) => {
      const findCharacter = state.answeredCharacters.find(
        (character) => character.id === state.currentCharacter.id
      );
      state.answeredCharacters = state.answeredCharacters.map((character) => {
        if (character.id === state.currentCharacter?.id) {
          return (character = state.currentCharacter);
        } else {
          return character;
        }
      });
      if (findCharacter) return;
      state.answeredCharacters.push(state.currentCharacter);
    },
    setCurrentCharacter: (state, action) => {
      state.currentCharacter = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getCharacters.fulfilled, (state, action) => {
      state.characters = action.payload;
      const randomIndex = Math.floor(Math.random() * action.payload.length);
      const randomCharacter = action.payload[randomIndex];
      const newRandomCharacter = {
        ...randomCharacter,
        attempts: 0,
        isHasSuccessAttempt: false,
      };
      state.characters = action.payload.filter(
        (_, index) => index !== randomIndex
      );
      state.currentCharacter = newRandomCharacter;
    }),
      builder.addCase(getOneCharacter.fulfilled, (state, action) => {
        state.selectedCharacter = action.payload;
      });
  },
});

export const {
  incrementTotalAttempts,
  incrementSuccessAttempts,
  incrementFailedAttempts,
  resetAttempts,
  getRandomCharacter,
  addAnsweredCharacter,
  setCurrentCharacter,
} = appSlice.actions;

export default appSlice.reducer;
