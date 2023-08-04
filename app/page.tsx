'use client';
import Image from 'next/image';
import { Venues } from './(site)/components';
import ToasterContext from './context/ToasterContext';
import AuthContext from './context/AuthContext';
import { Header, HeaderSearchMenu, HeaderDateRange, TravelAgencies, Footer } from './(site)/components';
import { Provider } from 'react-redux';
import store from '../store';

export default function Home() {
  return (
    <Provider store={store} >
      <Header />
      <div className="flex-1 col-v shadow-md">
        <main className="col-h min-h-screen justify-between min-w-[100vw]">
          <Venues />
          <TravelAgencies />
        </main>
      </div>
      <Footer />
    </Provider>
  )
}
