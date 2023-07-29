import { NextResponse } from "next/server";
import { getCollection, getItem } from "@/prisma/PrismaCollections";

const getCityByName = async (req, res) => {

    const name = req.url.split('/')[req.url.split('/').length - 1];

    try {
        const city = await getItem('city', [], {'ascii_name': name});
        return NextResponse.json(city)
      } catch (error) {
        console.error('Error:', error);
    }
}

export { getCityByName as GET };
