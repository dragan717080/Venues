import { Prisma } from "@prisma/client";

export default interface City {
  id: string;
  coordinates: string[] | number [];
  ascii_name: string;
  timezone: string;
  name: string;
  label_en: string;
  country_code: string;
  alternate_names: string | string[];
  population: string[];
  digital_elevation_model: number;
  img?: string;
}

export interface FamousCity {
  ascii_name: string;
  name?: string;
  year_founded: number | string;
  description: string;
  img: string;
}

export type CitySelect = Prisma.CitySelect;
