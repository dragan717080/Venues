import { FC, useState, MouseEvent } from 'react';
import Image from 'next/image';
import { useDispatch, useSelector } from 'react-redux';
import { InputState } from '@/app/interfaces/redux';
import { RootState } from '@/store';
import { BaseCity } from '@/app/interfaces/City';
import { setSelectedCity, setCitiesMatchingInput } from '@/store/citySlice';

const HeaderSearchMenu: FC = () => {

  const userInput = useSelector((state: RootState) => state.input.userInput);
  const citiesMatchingInput = useSelector((state: RootState) => state.city.citiesMatchingInput);
  const dispatch = useDispatch();

  const handleSelectCity = (e: MouseEvent<HTMLElement>, city: BaseCity) => {
    dispatch(setSelectedCity(city.ascii_name));
    dispatch(setCitiesMatchingInput([]));
  }

  return (
    <div className={`${citiesMatchingInput.length === 0 ? 'hidden' : ''} mt-4`}>
      <div className="grid grid-cols-4 gap-x-4 gap-y-5 mx-auto w-[fit-content]">
        {citiesMatchingInput.map((city: BaseCity, index: number) => (
          <div
            className="mx-auto py-2 pl-2 row space-x-4 hover:bg-gray-200 hover:scale-105 active:scale-95 transition transform duration-200 ease-out pointer"
            onClick={(e) => handleSelectCity(e, city)}
            key={index} 
          >
            <div className='relative h-16 w-24' >
              <Image fill alt={`${city.ascii_name} Image`} src={city.img ?? ''} className='rounded-xl' sizes='6rem' />
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
