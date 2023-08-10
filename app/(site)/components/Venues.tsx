'use client';
import { FC, useState, useEffect, MouseEvent } from 'react';
import Image from 'next/image';
import { useDispatch, useSelector } from 'react-redux';
import { Pagination, LargestCities } from '.';
import { RootState } from '@/store';
import { sanitize } from 'dompurify';
import Venue from '@/app/interfaces/Venue';
import Venues from '@/app/interfaces/Venues';
import axios from 'axios';

const Venues: FC = () => {

  const userInput = useSelector((state: RootState) => state.input.userInput);
  const cityNames = useSelector((state: RootState) => state.city.cityNames);
  const selectedCity = useSelector((state: RootState) => state.city.selectedCity);

  const [venues, setVenues] = useState<Venues>({} as Venues);
  const [selectedVenue, setSelectedVenue] = useState<Venue>({} as Venue);
  const findSelectedCity = (cityName: string) => cityNames.find((city) => city.ascii_name === cityName);

  const selectVenue = (e: MouseEvent<HTMLLIElement>, index: number) => {
    const eTarget = e.target as HTMLLIElement;
    setSelectedVenue(venues.details[index]);
  }

  const [currentPage, setCurrentPage] = useState<number>(1);
  const venuesPerPage: number = 10;


  useEffect(() => {
    (async () => {
      console.log('selectedCity', selectedCity)
      if (!selectedCity) return;
      const response = await axios.get(`/api/cities/${selectedCity}/venues`)
      const venuesInCity = await response.data;

      setVenues(venuesInCity);
      setSelectedVenue(venuesInCity.details[0]);
    })()
  }, [selectedCity, Object.keys(venues).length]);

  if (!(selectedCity && Object.keys(venues).length > 0)) {
    return (
      <LargestCities />
    )
  }

  const startIndex = (currentPage - 1) * venuesPerPage;
  const venuesToShow = venues.details.slice(startIndex, startIndex + venuesPerPage);

  const handlePageChange = (newPage: number) => {
    setCurrentPage(newPage);
  };

  return venues.details.length > 0
    ? (
      <section className='w-full pt-0'>
        <div className="relative h-[12rem] sm:h-[16.25rem] md:h-[20rem] lg:h-[25rem] w-full">
          <Image layout='fill' alt={`${selectedCity} Image`} src={venues.cityImg} objectFit='cover' />
        </div>
        <div className='px-4 sm:px-24 py-10 mr-auto'>
          <div className='text-4xl semibold pb-5 pl-4'>
            {venues.details.length} venues in a 1km radius from {selectedCity} center
          </div>
          <div className='mx-1 sm:mx-4 w-full sm:w-[fit-content] inline-flex roboto my-10 venues'>
            <ul className="inline-flex flex-col glow-list w-[150px] sm:w-[200px] md:w-[250px] lg:w-[300px] xl:w-[350px]">
              {venues.details.map((venue: Venue, index: number) => (
                <li className='pointer text-ellipsis whitespace-nowrap overflow-hidden' onClick={(e) => selectVenue(e, index)} key={index} >
                  {venue.name}
                </li>
              ))}
            </ul>
            <div className="w-auto md:w-[18.75rem] lg:w-[37.5rem] xl:w-[43.75rem] col-h py-5 px-2 sm:px-4 lg:px-7 bg-gray-200 ml-auto">
              <div className='relative h-[8rem] lg:h-[12rem] w-[12rem] lg:w-[25rem] mt-7 mb-5'>
                <img alt={`${selectedVenue.name} Image`} src={selectedVenue.image!} className='rounded-xl h-full w-full' />
              </div>
              <div className='px-3 sm:px-6 lg:px-10'>
                <p className='bold py-4 text-center'>{selectedVenue.name}</p>
                <div dangerouslySetInnerHTML={{ __html: selectedVenue.wikipedia_extract_html }} />
              </div>
            </div>
          </div>
        </div>
{/*         <Pagination
          currentPage={currentPage}
          totalPages={Math.ceil(venues.details.length / venuesPerPage)}
          onPageChange={handlePageChange}
        /> */}
      </section>
    ) : <div>This city has no known landmarks.</div>
}

export default Venues;
