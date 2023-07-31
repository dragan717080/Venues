'use client';
import { FC, useEffect, ChangeEvent, useRef } from 'react';
import Image from 'next/image';
import { useSession } from 'next-auth/react';
import { MagnifyingGlassIcon, GlobeAltIcon, UserCircleIcon, UsersIcon } from '@heroicons/react/24/outline';
import { useRouter } from 'next/navigation';
import { signOut } from 'next-auth/react';
import Link from 'next/link';
import { useDispatch, useSelector } from 'react-redux';
import { setUserInput } from '@/store/inputSlice';
import { setCityNames, setCitiesMatchingInput } from '@/store/citySlice';
import { RootState } from '@/store';
import { HeaderSearchMenu } from './HeaderSearchMenu';
import axios from 'axios';

const Header: FC = () => {

  const session = useSession();
  const router = useRouter();
  const searchRef = useRef(null);

  const dispatch = useDispatch();
  const userInput = useSelector((state: RootState) => state.input.userInput);
  const cities = useSelector((state: RootState) => state.city.cityNames)
  const selectedCity = useSelector((state: RootState) => state.city.selectedCity);
  const citiesMatchingInput = useSelector((state: RootState) => state.city.citiesMatchingInput);

  const setCitiesThatMatch = (cities) => {
    const inputLimit: number = 10;

    const input = searchRef.current.value.toLowerCase();
    console.log(cities.length)
    console.log(searchRef.current.value);
    if (searchRef.current.value === '') {
      dispatch(setCitiesMatchingInput([]));
      return;
    }

    const citiesThatMatch = cities.reduce((result, city) => {
      if (result.length >= inputLimit) {
        return result;
      }
    
      if (city.ascii_name.toLowerCase().includes(input)) {
        result.push(city);
      }
    
      return result;
    }, []);
    console.log('citiesThatMatch', citiesThatMatch)
    dispatch(setCitiesMatchingInput(citiesThatMatch));
  }

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setCitiesThatMatch(cities);
    dispatch(setUserInput(searchRef.current.value));
  };

  useEffect(() => {
    (async () => {
      try {
        const response = await axios.get('/api/cities');
        const result = response.data;
        dispatch(setCityNames(result));
        setCitiesThatMatch(result);
      } catch (error) {
        console.error('Error fetching cities:', error);
      }
    })();
  }, []);

  return (
    <header className='sticky top-0 z-20 grid grid-cols-3 bg-white py-5 px-7 md:px-10'>
      <div onClick={() => router.push('/')} className="relative flex items-center h-17 pointer -my-3">
        <Image
          layout='fill'
          src='/assets/images/logo-full-t-black.png'
          objectFit='contain'
          objectPosition='left'
          alt={`logo`}
        />
      </div>
      <div className='flex items-center pt-2.5 pb-2 md: py-2 md:border-2 rounded-full md:shadow-sm'>
        <input
          type="text"
          placeholder='Start your search'
          className='ml-1 pl-4 border-none outline-none bg-transparent flex-grow text-sm text-gray-600 placeholder-gray-300'
          onChange={handleInputChange}
          ref={searchRef}
        />
        <MagnifyingGlassIcon className='h-8 mr-2 p-2 bg-red-400 text-white rounded-full pointer hidden md:inline-flex md:mx-2' />
      </div>
      <div className='flex just row-end items-center space-x-4 text-gray-500'>
        {session.status === 'authenticated'
          ? <div className='inline-flex'>
            <div className='t-red'>{session.data!.user!.name}</div>
            <button className='t-cornflowerblue ml-3' onClick={async () => await signOut()} >Logout</button>
          </div>
          : <a href='auth'>Login</a>
        }
      </div>
    </header>
  );
};

export default Header;
