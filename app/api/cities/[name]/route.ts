import { getCollection, getItem } from "@/prisma/PrismaCollections";
import { NextRequest, NextResponse } from "next/server";
import ApiRequestProps from "@/app/interfaces/props/ApiRequestProps";
import { ApiHandler } from "@/app/interfaces/types";

const getCityByName: ApiHandler = async (req, res) => {

    const name = req.url.split('/')[req.url.split('/').length - 1];

    try {
        const city = await getItem('city', [], {'ascii_name': name});
        return NextResponse.json(city);
      } catch (error) {
        console.error('Error:', error);
    }
}

export { getCityByName as GET };
