'use client';
import { FC, useEffect } from 'react';
import Image from 'next/image';
import { useSession } from 'next-auth/react';
import { MagnifyingGlassIcon, GlobeAltIcon, UserCircleIcon, UsersIcon } from '@heroicons/react/24/outline';
import { signOut } from 'next-auth/react';

const Navbar: FC = () => {

  const session = useSession();

  return (
    <header  className='sticky top-0 z-20 grid grid-cols-3 bg-white shadow-md py-5 px-7 md:px-10'>
      <nav className="bg-main t-main text-gray-500 h-30 px-14 flex">
        <div className="flex items-center w-full ">
          <button className="">☰</button>
          <a href="/" className="inline-h flex items-center">
            <Image height="28" width="32" alt="Logo" className="h-7 mx-auto" src="/assets/logo-full.png" />
            <div className="t-main u text-white text-2xl leading-10 tracking-wide mx-2">App</div>
          </a>
          <div className="ml-auto">
            {session.status === 'authenticated'
              ? <div className='inline-flex'>
                <div className='t-red'>{session.data!.user!.name}</div>
                <button className='t-cornflowerblue ml-3' onClick={async () => await signOut()} >Logout</button>
              </div>
              : <a href='auth u'>Login</a>
            }
          </div>
        </div>
      </nav >
    </header>
  );
};

export default Navbar;
