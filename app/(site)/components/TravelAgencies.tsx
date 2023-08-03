import { FC } from 'react';
import Image from 'next/image';
import travelAgencies from '@/config/travelAgencies';

const TravelAgencies: FC = () => {
  return (
    <section className='col-h'>
      <div className='grid mx-auto grid-cols-10 gap-4 mb-6'>
        {travelAgencies.map((agency: string, index: number) => (
          <div className="relative h-8 w-20" key={index} >
            <Image
              layout='fill'
              alt={`${agency} Image`}
              src={`/assets/images/travel-agencies/${agency.replace(/^./, agency[0].toLowerCase())}-logo.png`}
              objectFit='contain'
              className='h-full'
            />
          </div>
        ))}
      </div>
      <p className='mb-10'>More features will be added in the future</p>
    </section>
  )
}

export default TravelAgencies;
