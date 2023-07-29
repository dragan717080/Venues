import { NextResponse } from "next/server";
import { getCollection, getItem } from "@/prisma/PrismaCollections";
import City, { CitySelect } from "@/app/interfaces/City";
import client from "@/app/libs/prismadb";
import { Prisma } from '@prisma/client';
import { StringObject } from "@/app/interfaces/types";

async function getCityNames(): Promise<string[]> {
  try {
    const cities: City[] = await prisma.city.findMany({
      select: {
        ascii_name: true,
      } as CitySelect,
    });

    return NextResponse.json(cities.map((city: StringObject) => city.ascii_name));
  } catch (error) {
    console.error('Error fetching city names:', error);
    throw error;
  }
}

export { getCityNames as GET };
