import { StringObject } from "./types";
import { BaseCity } from "./City";

export interface CityState {
  selectedCity: string;
  cityNames: BaseCity[];
  citiesMatchingInput: BaseCity[];
}

export interface InputState {
  userInput: string;
}
