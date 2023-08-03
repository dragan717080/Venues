'use client';
import Image from 'next/image';
import { Venues } from './(site)/components';
import ToasterContext from './context/ToasterContext';
import AuthContext from './context/AuthContext';
import { Header, HeaderSearchMenu, HeaderDateRange, Footer } from './(site)/components';
import { Provider } from 'react-redux';
import store from '../store';
import travelAgencies from '@/config/travelAgencies';

export default function Home() {
  return (
    <Provider store={store} >
      <Header />
      <div className="flex-1 col-v shadow-md">
        <main className="flex min-h-screen flex-col items-center justify-between">
          <Venues />
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
        </main>
      </div>
      <Footer />
    </Provider>
  )
}
