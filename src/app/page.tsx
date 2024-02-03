'use client'

// import Image from "next/image";
import dynamic from 'next/dynamic';

const Book = dynamic(() => import('../components/Book'), { ssr: false });
const Booty = dynamic(() => import('../components/Booty'), { ssr: false });
const ItemRoller = dynamic(() => import('../components/ItemRoller'), { ssr: false });
const SpellName = dynamic(() => import('../components/SpellName'), { ssr: false });

export default function Home() {

  return (
    <main className="grid grid-cols-2 p-2 lg:p-24 ">
      <div className="border border-gray-800 pt-0 pb-4 m-4">
        <ItemRoller />
      </div>
      <div className="border border-gray-800 pt-0 pb-4 m-4">
        <Booty />
      </div>
    </main>
  );
}
