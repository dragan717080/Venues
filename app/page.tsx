'use client';
import Image from 'next/image';
import { Venues } from './(site)/components';
import ToasterContext from './context/ToasterContext';
import AuthContext from './context/AuthContext';
import { Header, HeaderSearchMenu, Footer } from './(site)/components';
import { Provider } from 'react-redux';
import store from '../store';

export default function Home() {
  return (
    <Provider store={store} >
      <Header />
      <HeaderSearchMenu />
      <div className="flex-1 col-v shadow-md">
        <main className="flex min-h-screen flex-col items-center justify-between p-24">
          <Venues />
          1
        </main>
      </div>
      <Footer />
    </Provider>
  )
}
