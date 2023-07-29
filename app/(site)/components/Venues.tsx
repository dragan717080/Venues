'use client';
import { FC, useCallback } from 'react';
import Image from 'next/image';
import { useDispatch, useSelector } from 'react-redux';
import { LargestCities } from '.';

const Venues: FC = () => {

  const userInput = useSelector((state) => state.input.userInput);
  const cityNames = useSelector((state) => state.input.cityNames);
  const asd = useCallback((node) => {
    if (node !== null) node.classList.add('show');
  })

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
