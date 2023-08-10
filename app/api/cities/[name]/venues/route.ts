import { getCollection, getItem } from "@/prisma/PrismaCollections";
import { NextRequest, NextResponse } from "next/server";
import ApiRequestProps from "@/app/interfaces/props/ApiRequestProps";
import { ApiHandler } from "@/app/interfaces/types";
import ImageUtils from '@/app/utils/ImageUtils';

const getVenues: ApiHandler = async (req, res) => {

    const name = req.url.split('/').at(-2);

    try {
        const city = await getItem('city', [], {'ascii_name': name});
        const cityId = city?.id;
        const venues = await getCollection('venue', [], {'cityId': cityId});
        await Promise.all(venues.map(async (venue) => {
          venue.image = await ImageUtils.getImageFromFile(venue.image);
      }));
        return NextResponse.json({'cityImg': city?.img, 'details': venues});
      } catch (error) {
        console.error('Error:', error);
        return NextResponse.json({ error: 'Could not fetch venues' }, { status: 500 })
    }
}

export { getVenues as GET };
