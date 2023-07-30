'use client';
import { FC } from 'react';
import Image from 'next/image';
import { useDispatch, useSelector } from 'react-redux';
import { LargestCities } from '.';
import { RootState } from '@/store';

const Venues: FC = () => {

  const userInput = useSelector((state: RootState) => state.input.userInput);
  const cityNames = useSelector((state: RootState) => state.city.cityNames);

  return userInput !== ''
  ? (
    <div className=''>
      { userInput }
    </div>
  )
  : (
    <LargestCities />
  ) 
}

export default Venues;
