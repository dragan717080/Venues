'use client';
import { FC, useState, useEffect, MouseEvent } from 'react';
import Image from 'next/image';
import { useDispatch, useSelector } from 'react-redux';
import { LargestCities } from '.';
import { RootState } from '@/store';
import { sanitize } from 'dompurify';
import axios from 'axios';

const Venues: FC = () => {

  const userInput = useSelector((state: RootState) => state.input.userInput);
  const cityNames = useSelector((state: RootState) => state.city.cityNames);
  const selectedCity = useSelector((state: RootState) => state.city.selectedCity);

  const [venues, setVenues] = useState({});
  const [selectedVenue, setSelectedVenue] = useState({});
  const findSelectedCity = (cityName: string) => cityNames.find((city) => city.ascii_name === cityName);

  const selectVenue = (e: MouseEvent<HTMLDivElement>, index: number) => {
    console.log(e.target.innerText);
    console.log(venues.details[index].img)
    setSelectedVenue(venues.details[index]);
  }

  useEffect(() => {
    (async () => {
      if (!selectedCity) return;
      console.log(1);
      const response = await axios.get(`/api/cities/opentripmap/${selectedCity}`)
      const venuesInCity = await response.data;
      setVenues(venuesInCity);
      setSelectedVenue(venuesInCity.details[0]);
      console.log('venuesInCity', venuesInCity)
    })()
  }, [selectedCity, Object.keys(venues).length]);

  return selectedCity && Object.keys(venues).length > 0
    ? (
      <section className='w-full pt-0'>
        <div className="relative h-[25rem] w-full">
          <Image layout='fill' alt={`${selectedCity} Image`} src={venues.cityImg} objectFit='cover' />
        </div>
        <div className='px-24 py-10 mr-auto'>
          <div className='text-4xl semibold pb-5 pl-2 md:pl-0'>
            {venues.num} venues in a 1km radius from {selectedCity} center
          </div>
          <div className='inline-flex roboto my-10 venues'>
            <ul className="inline-flex flex-col glow-list max-w-[200px] md:max-w-[350px] lg:max-w-[500px] xl:max-w-[600px]">
              {venues.details.map((details: any, index: number) => (
                <li className='pointer text-ellipsis whitespace-nowrap overflow-hidden' onClick={(e) => selectVenue(e, index)} key={index} >
                  {details.name}
                </li>
              ))}
            </ul>
            <div className="w-[12.5rem] md:w-[18.75rem] lg:w-[37.5rem] xl:w-[43.75rem] col-h py-5 px-7 bg-gray-200 ml-auto">
              <div className='relative h-[8rem] w-[12rem] lg:w-[25rem] mt-7 mb-5'>
                <Image layout='fill' alt={`${venues.firstImage} Image`} src={selectedVenue.img} className='rounded-xl' />
              </div>
              <div className='px-10'>
                  <p className='bold py-4 text-center'>{selectedVenue.name}</p>
                  <div dangerouslySetInnerHTML={{ __html: selectedVenue.wikipedia_extract_html }} />
              </div>
            </div>
          </div>
        </div>
      </section>
    )
    : (
      <LargestCities />
    )
}

export default Venues;
