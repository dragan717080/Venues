import { getCollection, getItem } from "@/prisma/PrismaCollections";
import { NextRequest, NextResponse } from "next/server";
import ApiRequestProps from "@/app/interfaces/props/ApiRequestProps";

type ApiHandler<T = any> = (req: NextRequest | Request, res: NextResponse<T>) => Promise<void>;

const getCityByName: ApiHandler = async (req, res) => {

    const name = req.url.split('/')[req.url.split('/').length - 1];

    try {
        const cities = await getItem('city', [], {'ascii_name': name});
        NextResponse.json(cities)
      } catch (error) {
        console.error('Error:', error);
    }
}

export { getCityByName as GET };
