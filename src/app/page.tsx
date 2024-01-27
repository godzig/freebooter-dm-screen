'use client'

// import Image from "next/image";
import dynamic from 'next/dynamic'

const Book = dynamic(() => import('../components/Book'), { ssr: false })
const Booty = dynamic(() => import('../components/Booty'), { ssr: false })
const SpellName = dynamic(() => import('../components/SpellName'), { ssr: false })

export default function Home() {

  return (
    <main className="flex flex-col p-24 max-w-3xl">
      <div className="flex flex-col border rounded-3xl border-gray-800 pt-0 pb-4 mb-4">
        <Book count="3" />
      </div>
      <div className="flex flex-col border rounded-3xl border-gray-800 pt-0 pb-4 mb-4">
        <SpellName count="3" />
      </div>
      <div className="flex flex-col border rounded-3xl border-gray-800 pt-0 pb-4 mb-4">
        <Booty />
      </div>
    </main>
  );
}
