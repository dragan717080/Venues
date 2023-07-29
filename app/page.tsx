import Image from 'next/image';
import { Venues } from './(site)/components';


export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <Venues />
      1
    </main>
  )
}
