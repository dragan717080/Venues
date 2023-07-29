'use client';
import './globals.css';
import './styles/animations.css';
import { ReactNode } from 'react';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import ToasterContext from './context/ToasterContext';
import AuthContext from './context/AuthContext';
import { Header, HeaderSearchMenu, Footer } from './(site)/components';
import { Provider as Provider } from 'react-redux';
import store from '../store';

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Venues App',
  description: 'App built with Next.js, TypeScript, Tailwind, MongoDB, NextAuth and Prisma',
}

export default function RootLayout({
  children,
}: {
  children: ReactNode
}) {

  // For default font: <body className={inter.className}>

  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" />
        <link href="https://fonts.googleapis.com/css2?family=Asap&display=swap" rel="stylesheet" />
      </head>
      
      <body>
        <div className="col-v min-h-screen">
          <Provider store={store} >
            <AuthContext>
              <ToasterContext />
              <Header />
              <HeaderSearchMenu />
              <div className="flex-1 col-v shadow-md">
                {children}
              </div>
              <Footer />
            </AuthContext>
          </Provider>
        </div>
      </body>
    </html>
  )
}
