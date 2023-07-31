import { FC } from 'react';
import Image from 'next/image';
import famousCities from '@/config/famousCities';
import { useDispatch, useSelector } from 'react-redux';
import { setSelectedCity } from '@/store/citySlice';

const LargestCities: FC = () => {

  const dispatch = useDispatch();
  const selectedCity = useSelector((state: RootState) => state.city.selectedCity);

  return (
    <section className='mr-auto'>
      <h2 className='text-4xl semibold pb-5 pl-2 md:pl-0'>Largest Cities</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-4 gap-y-10">
        {famousCities.map((city, index: number) => (
          <div className='overlay-container relative h-[10rem] w-[18rem] pointer z-0' key={index} onClick={() => { console.log(1); dispatch(setSelectedCity(city.ascii_name)) }}>
            <div className="flex">
              <div className="relative h-[10rem] w-[18rem] ">
                <Image layout='fill' alt={`${city.ascii_name} Image`} src={city.img} className='rounded-lg' />
              </div>
              <div className='overlay'>
                <div className="overlay-description p-0 py-4">
                  <div className="overlay-content py-4">
                    <p className='-mx-10'>{city.description}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}

export default LargestCities;
