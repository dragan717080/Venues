import { FC, useState } from 'react';
import Image from 'next/image';
import { useDispatch, useSelector } from 'react-redux';
import { InputState } from '@/app/interfaces/redux';
import { RootState } from '@/store';
import { BaseCity } from '@/app/interfaces/City';

const HeaderSearchMenu: FC = () => {

  const wait = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

  const userInput = useSelector((state: RootState) => state.input.userInput);
  const citiesMatchingInput = useSelector((state: RootState) => state.city.citiesMatchingInput);
  console.log('citiesMatchingInput', citiesMatchingInput)

  return (
    <div className={`${citiesMatchingInput.length === 0 ? 'hidden' : ''}`}>
      <div className="">
        {citiesMatchingInput.map((city: BaseCity, index: number) => (
          <div className="w-1/3 mx-auto py-2 row space-x-4 hover:bg-gray-200 hover:scale-105 transition transform duration-200 ease-out pointer" key={index} >
            <div className='relative h-16 w-24' >
              <Image layout='fill' alt={`${city.ascii_name} Image`} src={city.img} className='rounded-xl' />
            </div>
            <div className='w-[10rem] overflow-hidden text-ellipsis whitespace-nowrap space-y-0'>
              {city.ascii_name}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default HeaderSearchMenu;
