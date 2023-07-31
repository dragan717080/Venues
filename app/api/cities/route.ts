import { NextResponse } from "next/server";
import { getCollection, getItem } from "@/prisma/PrismaCollections";
import City, { FamousCity, CitySelect } from "@/app/interfaces/City";
import client from "@/app/libs/prismadb";
import { Prisma } from '@prisma/client';
import { StringObject } from "@/app/interfaces/types";
import { BaseCity } from "@/app/interfaces/City";

async function getCityNames(): Promise<NextResponse<BaseCity[]>> {
  try {
    const cities: StringObject[] = await client.city.findMany({
      select: {
        ascii_name: true,
        img: true,
      }
    });

    const cityNames: BaseCity[] = cities.map((city: StringObject) => (
      {'ascii_name': city.ascii_name, 'img': city.img}));

    return NextResponse.json(cityNames);
  } catch (error) {
    console.error('Error fetching city names:', error);
    throw error;
  }
}

export { getCityNames as GET };
