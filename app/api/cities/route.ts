import { NextResponse } from "next/server";
import { getCollection, getItem } from "@/prisma/PrismaCollections";
import City, { FamousCity, CitySelect } from "@/app/interfaces/City";
import client from "@/app/libs/prismadb";
import { Prisma } from '@prisma/client';
import { StringObject } from "@/app/interfaces/types";

async function getCityNames(): Promise<NextResponse<string[]>> {
  try {
    const cities: StringObject[] = await client.city.findMany({
      select: {
        ascii_name: true,
      }
    });

    // Extract the ascii_name property from each City object
    const cityNames: string[] = cities.map((city: StringObject) => city.ascii_name);

    return NextResponse.json(cityNames);
  } catch (error) {
    console.error('Error fetching city names:', error);
    throw error;
  }
}

export { getCityNames as GET };
