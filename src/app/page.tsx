'use client'

import dynamic from 'next/dynamic'
import { useState } from 'react'
import { roll } from '../app/utils'
import { enchantedJewelry, enchantedScroll, newPotion, newMiscellaneous, newGarb, newWandStaffRod, newWeapon, newArmorShield } from '../components/MagicItem'
import { newBookName } from '../components/Book'
import { newSpecialtyKit } from '../components/MiscBootyDetails'
import { newSpellName } from '../components/SpellName'
import { newBodyPart } from '../components/BodyPart'
import { newPersonalItem } from '../components/PersonalItem'
import { newTrinket } from '../components/Trinket'
import { newGem } from '../components/Gem'
import { newJewelry } from '../components/Jewelry'
import { newTradeGood, newBookScroll, newArtObject, newRarity } from '../components/Rarity'
import { newMagicItem } from '../components/MagicItem'

const Booty = dynamic(() => import('../components/Booty'), { ssr: false });
const ItemRoller = dynamic(() => import('../components/ItemRoller'), { ssr: false });

export default function Home() {
  const menuMap = [
    ['Armor / Shield', newArmorShield],
    ['Art Object', newArtObject],
    ['Body part', newBodyPart],
    ['Book Names', newBookName],
    ['Book Types', newBookScroll],
    ['Garb', newGarb],
    ['Gem', newGem],
    ['Jewelry', newJewelry],
    ['Jewelry (magic)', enchantedJewelry],
    ['Magic Item', newMagicItem],
    ['Miscellaneous', newMiscellaneous],
    ['Personal Item', newPersonalItem],
    ['Potion', newPotion],
    ['Rarity', newRarity],
    ['Spell Scroll', enchantedScroll],
    ['Specialty Kit', newSpecialtyKit],
    ['Spell', newSpellName],
    ['Trade Good', newTradeGood],
    ['Trinket', newTrinket],
    ['Wand, Staff, Rod', newWandStaffRod],
    ['Weapon', newWeapon],
  ];
  const bootyDieMap = [
    ['d4 tiny poor', 'd4'],
    ['d6 sm mediocre', 'd6'],
    ['d8 md comfortable', 'd8'],
    ['d10 lg wealthy', 'd10'],
    ['d12 xl fabulous', 'd12']
  ];

  const [menuOptions, setMenuOptions] = useState({ bootyDie: 'd4'});

  function setBootyDie(bootyDie: string) {
    setMenuOptions({...menuOptions, bootyDie});
  }

  return (
    <main>
      <div className="p-2 lg:p-24 lg:pb-12">{
        bootyDieMap.map(([text, bootyDie], i) => (
          <button key={i} onClick={() => setBootyDie(bootyDie)} className="bg-gray-800 hover:bg-gray-900 p-2 px-6 mb-2 mr-2">{text}</button>
        ))
      }
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 px-2 lg:px-24 gap-4">
        <div className="border border-gray-800 pt-0 pb-4">
          <Booty menuOptions={menuOptions} />
        </div>
        <div className="border border-gray-800 pt-0 pb-4">
          <ItemRoller menuOptions={menuOptions} />
        </div>
      </div>
    </main>
  );
}
