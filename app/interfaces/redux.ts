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

export interface VisitState {
  daysDuration: number;
  agency: string;
  adults: number;
  children: number;
}

export interface DateRangeState {
  isDateRangeOpen: boolean;
}
