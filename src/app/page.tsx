'use client'

// import Image from "next/image";
import dynamic from 'next/dynamic'

const Book = dynamic(() => import('../components/Book'), { ssr: false })
const SpellName = dynamic(() => import('../components/SpellName'), { ssr: false })

export default function Home() {

  return (
    <main className="flex flex-col p-24 max-w-3xl">
      <div className="flex flex-col">
        <Book count="3" />
      </div>
      <div className="flex flex-col">
        <SpellName count="3" />
      </div>
    </main>
  );
}
