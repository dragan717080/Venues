import { getCollection, getItem } from "@/prisma/PrismaCollections";
import { NextRequest, NextResponse } from "next/server";
import ApiRequestProps from "@/app/interfaces/props/ApiRequestProps";
import client from "@/app/libs/prismadb";
import { ApiHandler } from "@/app/interfaces/types";
import StringUtils from "@/app/utils/StringUtils";
import City from "@/app/interfaces/City";
import cheerio from 'cheerio';
import axios from "axios";

const getVenue = async (xid: string) => {
  const URL = `${process.env.OPENTRIPMAPAPI_BASE_URL}/places/xid/${xid}`;
  const params = {
    'apikey': process.env.OPENTRIPMAPAPI_API_KEY
  }

  const response = await axios.get(URL, { params });
  const venue = await response.data;

  if (!Object.keys(venue).includes('image') || !Object.keys(venue).includes('wikipedia_extracts')) return null;

  const getImage = (imgLink: string) => {

    const params = {
      'action': 'query',
      'titles': imgLink.split('wiki/')[1],
      'prop': 'imageinfo',
      'iiprop': 'url',
      'format': 'json'
    }
    return axios.get('https://commons.wikimedia.org/w/api.php', { params })
      .then(response => {
        const data = response.data;
        const pages = data.query.pages;
        console.log('pages', pages)
        const pageId = Object.keys(pages)[0];
        console.log('pageId', pageId)
        const imageUrl = pages[pageId].imageinfo[0].url;

        console.log('imageUrl', imageUrl)
        return decodeURIComponent(imageUrl);
      })
      .catch(error => {
        console.error('Error fetching image URL:', error.message);
      });
  }

  console.log('venuimg1', venue.image);

  console.log('name', venue.name);

  venue.img = await getImage(decodeURIComponent(venue.image));
  console.log('venuimg', venue.img);

  const venueData = {
    'xid': venue.xid,
    'name': venue.name,
    'img': venue.img,
    'state': venue.address.state,
    'country': venue.address.country,
    'country_code': venue.address.country_code,
    'coordinates': Object.values(venue.point),
    'neighbourhood': venue.address.neighbourhood,
    'wikidata': venue.wikidata,
    'rate': typeof venue.rate === 'string' ? parseInt(venue.rate[0]) : venue.rate,
    'kinds': StringUtils.snakeCaseStrToCapitalizedArray(venue.kinds),
    'wikipedia': venue.wikipedia,
    'wikipedia_extract': venue.wikipedia_extracts.text,
    'wikipedia_extract_html': venue.wikipedia_extracts.html,
  };

  return venueData;
}

const getVenuesForCity: ApiHandler = async (req, res) => {

  const name = decodeURIComponent(req.url.split('/')[req.url.split('/').length - 1]);

  try {
    const cityItem: String[] = await client.city.findFirst({
      where: {
        ascii_name: name
      },
      select: {
        coordinates: true,
        img: true,
      }
    })

    console.log('cityItem', cityItem)
    const { coordinates, img } = cityItem;
    console.log('coordinates', coordinates)

    const coordinatesNum = coordinates.map((coordinate: string) =>
      StringUtils.getNumericCoordinate(coordinate));

    const URL = `${process.env.OPENTRIPMAPAPI_BASE_URL}/places/radius`;
    const params = {
      'radius': 1000,
      'lat': coordinatesNum[0],
      'lon': coordinatesNum[1],
      'apikey': process.env.OPENTRIPMAPAPI_API_KEY
    }

    // For first visit only first number of venues and first venue image are 
    const response = await axios.get(URL, { params });
    const data = await response.data;
    const allVenuesInCity = data.features.filter((item) =>
      item.properties.rate > 2);
    const venuesNum = allVenuesInCity.length;
    const allVenuesNames = allVenuesInCity.map((item) => item.properties.name);

    const allVenuesDetails: Promise<any>[] = allVenuesInCity.slice(0, 9).map(async (venue) => {
      const venueData = await getVenue(venue.properties.xid);
      return venueData;
    });

    // Exclude null values
    let venuesDetails = await Promise.all(allVenuesDetails);
    venuesDetails = venuesDetails.filter((venue) => venue);;

    const venues = { 'num': venuesNum, 'details': venuesDetails, 'cityImg': img };

    return NextResponse.json(venues);
  } catch (error) {
    console.error('Error:', error);
    return NextResponse.json({ error: 'Could not fetch city' }, { status: 500 })
  }
}

export { getVenuesForCity as GET };
