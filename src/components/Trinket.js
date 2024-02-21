import { listItems, mapKeys, roll } from '../app/utils';

export function newTrinket(props) {
  const generateMaterials = () => {
    let materialMap = {
      1: ['wood/stone/cloth/shell/bone/horn/feather', 1],
      2: ['ceramic/leather/crystal', roll('d4').result],
      3: ['brass/bronze/iron/tin', roll('d6').result],
      4: ['copper', roll('2d4').result],
      5: ['quartz/lapis lazuli/malachite/obsidian', roll('2d6').result],
      6: ['silver/glass/citrine/jasper', roll('2d10').result]
    };
    const bonus = materialMap[roll('d6').result];
    materialMap['9'] = [`fine ${bonus[0]}`, 2 * parseInt(bonus[1])];
    materialMap['12'] = [`exquisite ${bonus[0]}`, 4 * parseInt(bonus[1])];
    return materialMap;
  }
  const materials = generateMaterials();

  const formMap = {
    2: ['oddment/fragment/shard', .5],
    4: ['tooth/claw/scale/horn', .5],
    6: ['ring/loop/hoop', .5],
    8: ['charm/keepsake/ornament', .5],
    9: ['key/utensil/tool', 1],
    10: ['figurine/doll/miniature', 1],
    11: ['toy/game/puzzle', 1],
    12: ['cameo/likeness', 1],
    14: ['locket/brooch/pin', 1],
    15: ['box/case/canister', 2],
    16: ['sphere/orb/egg/disc', 2],
    17: ['pipe/whistle/drum/bell', 2],
    19: ['idol/icon/symbol/insignia', 2],
    20: ['necklace/amulet/bracelet', 2],
  }
  const [material, materialValue] = materials[mapKeys(materials, roll('d12').result)];
  const [form, formValue] = formMap[mapKeys(formMap, roll('d20').result)];
  const value = materialValue * formValue;
  const trinket = `${form} made of ${material} worth ${value} sp`;

  return (trinket);
}

export default function trinket(props) {
  return (listItems(props, newTrinket));
}