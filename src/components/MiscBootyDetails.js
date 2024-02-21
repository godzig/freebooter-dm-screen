import { mapKeys, roll } from '../app/utils';


export function newSpecialtyKit(props) {
  const specialtyKitMap = {
    1: 'cookery / brewing kit',
    3: 'poison / alchemy kit',
    4: 'stealth / espionage kit',
    5: 'cartography / navigation',
    6: 'travel / transportation kit',
    7: 'architecture kit',
    8: 'smithing / forging kit',
    9: 'engineering kit',
    10: 'healing / apothecary kit',
    11: 'divination kit',
    12: 'invention/wizardry kit',
  }
  const specialtyKit = specialtyKitMap[mapKeys(specialtyKitMap, roll('d12').result)]
  return specialtyKit;
}

export function newMagicType(props) {
  const magicTypeMap = {
    1: 'necromancy',
    3: 'evocation/destruction',
    4: 'conjuration/summoning',
    5: 'illusion/glamour',
    6: 'enchantment/artifice',
    7: 'transformation',
    8: 'warding/binding',
    10: 'based on element',
    11: 'restoration/healing',
    12: 'divination/scrying',
  }
  const magicType = magicTypeMap[mapKeys(magicTypeMap, roll('d12').result)];
  return magicType;
}
