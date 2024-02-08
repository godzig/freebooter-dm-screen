'use client'

import dynamic from 'next/dynamic';
import { enchantedJewelry, enchantedScroll, newPotion, newMiscellaneous, newGarb, newWandStaffRod, newWeapon, newArmorShield } from '../components/MagicItem'
import { newBookName } from '../components/Book'
import { newSpecialtyKit } from '../components/MiscBootyDetails'
import { newSpellName } from '../components/SpellName'
import { newBodyPart } from '../components/BodyPart';
import { newPersonalItem } from '../components/PersonalItem';
import { newTrinket } from '../components/Trinket';
import { newGem } from '../components/Gem';
import { newJewelry } from '../components/Jewelry';
import { newTradeGood, newBookScroll, newArtObject, newRarity } from '../components/Rarity';
import { newMagicItem } from '../components/MagicItem';

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

  const menuOptions = { str: 'd4', count: 5, result: 0, tableTitle: 'select a table', tableFunction: '' }

  return (
    <main className="grid grid-cols-1 md:grid-cols-2 p-2 lg:p-24 ">
      <div className="border border-gray-800 pt-0 pb-4 m-4">
        <ItemRoller menu={menuOptions} />
      </div>
      <div className="border border-gray-800 pt-0 pb-4 m-4">
        <Booty menu={menuOptions} />
      </div>
    </main>
  );
}
