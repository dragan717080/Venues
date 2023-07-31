import { Prisma } from "@prisma/client";

export interface BaseCity {
  ascii_name: string;
  img?: string;
}

export default interface City extends BaseCity {
  coordinates: string[] | number [];
  timezone: string;
  name: string;
  label_en: string;
  country_code: string;
  alternate_names: string | string[];
  population: string[];
  digital_elevation_model: number;
  img: string;
}

export interface FamousCity extends BaseCity {
  name?: string;
  year_founded: number | string;
  description: string;
}

export type CitySelect = Prisma.CitySelect;
