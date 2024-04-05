import { useState } from 'react'
import { Menu } from '@headlessui/react'
import { ChevronDownIcon } from '@heroicons/react/20/solid'

import { enchantedJewelry, enchantedScroll, newPotion, newMiscellaneous, newGarb, newWandStaffRod, newWeapon, newArmorShield } from './MagicItem'
import { newBookName } from './Book'
import { newSpecialtyKit } from './MiscBootyDetails'
import { newSpellName } from './SpellName'
import { newBodyPart } from './BodyPart';
import { newPersonalItem } from './PersonalItem';
import { newTrinket } from './Trinket';
import { newGem } from './Gem';
import { newJewelry } from './Jewelry';
import { newTradeGood, newBookScroll, newArtObject, newRarity } from './Rarity';
import { newMagicItem } from './MagicItem';
import { listItems } from '../app/utils'


export default function ItemRoller(props) {
  const bootyDie = props.menuOptions.bootyDie;

  const [table, setTable] = useState({ tableTitle: '<Select a Table>', tableFunction: '', bootyDie, result: 12, count: 10 });

  function updateTable(tableOption = null) {
    if (tableOption) {
      const [tableTitle, tableFunction] = tableOption;
      setTable({ ...table, tableTitle, tableFunction });
    } else {
      setTable((prevTable) => ({ ...prevTable }));
    }
  }

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
  
  return (
    <>
      <div className="flex items-start">
        <div className="mr-2">
          <Menu as="div" className="text-left">
            <Menu.Button className="inline-flex gap-x-2 bg-gray-800 px-6 py-2 hover:bg-gray-900">
              {table.tableTitle}
              <ChevronDownIcon className="h-5 w-5" aria-hidden="true" />
            </Menu.Button>
            <Menu.Items className="absolute z-10 mt-2 w-40 origin-top-right bg-gray-800 focus:outline-none">
              {menuMap.map((tableOption, i) => (
                <Menu.Item key={i}>
                  <button key={i} onClick={() => updateTable(tableOption)} className="w-full text-left py-2 px-4 bg-gray-800 hover:bg-gray-700">
                    {tableOption[0]}
                  </button>
                </Menu.Item>
              ))}
            </Menu.Items>
          </Menu>
        </div>
        <div className="flex items-start">
          <button onClick={() => updateTable()} className="bg-gray-800 hover:bg-gray-900 p-2 px-6">Reroll</button>
        </div>
      </div>
      <div className="py-4">
        {listItems(table, table.tableFunction)}
      </div>
    </>
  )
}