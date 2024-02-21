import { listItems, mapKeys, pick, roll } from '../app/utils';
import { newGem } from './Gem';
import { newWeapon, newArmorShield, newWandStaffRod } from './MagicItem';

export function newJewelry(props) {
  const bootyDie = props.bootyDie;
  const weapon = newWeapon();
  const armor = newArmorShield();
  const staff = newWandStaffRod();

  const jewelryForm = {
    2: ['earrings/studs', .5],
    4: ['locket/charm/brooch/pin', .5],
    8: ['ring', .5],
    10: ['bracelet/anklet/armband', 1],
    13: ['necklace/amulet/periapt', 1],
    14: ['box/case/canister', 1],
    15: ['belt/girdle/harness', 1],
    16: ['idol/icon/symbol/insignia', 1],
    17: [staff, 2],
    18: [weapon, 3],
    19: [armor, 3],
    20: ['circlet/tiara/crown/diadem', 4]
  }

  const generateJewelryMaterial = (bootyDie) => {
    let jewelryMaterialMap = {
      2: ['copper', roll('2d4').result],
      3: ['silver', 2 * roll('2d10').result],
      4: ['gold', 5 * roll('4d10').result],
      5: ['silver', 2 * roll('2d10').result], // gets encrusted
      6: ['gold', 5 * roll('4d10').result] // gets encrusted
    }
    const [type, value] = jewelryMaterialMap[mapKeys(jewelryMaterialMap, roll('d6').result)];
    jewelryMaterialMap['9'] = [`fine ${type}`, 2 * value];
    jewelryMaterialMap['12'] = [`exquisite ${type}`, 4 * value];

    return (jewelryMaterialMap);
  }
  const jewelryMaterial = generateJewelryMaterial(bootyDie);

  const materialRoll = roll(bootyDie).result;
  const isEncrusted = materialRoll == 5 || materialRoll == 6;
  const [material, baseValue] = jewelryMaterial[mapKeys(jewelryMaterial, materialRoll)];
  const [form, multiplier] = jewelryForm[mapKeys(jewelryForm, roll('d20').result)];
  const encrustedPart = isEncrusted ? ` encrusted with ${newGem(props)}` : '';
  const jewelry = `${form} of ${material} worth ${baseValue * multiplier} sp${encrustedPart}`;

  return (jewelry);
}

export default function jewelry(props) {
  return (listItems(props, newJewelry));
}

