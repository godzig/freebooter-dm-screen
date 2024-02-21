import { listItems, mapKeys, roll } from '../app/utils';
import { newMagicItem, newArmorShield, newWeapon } from './MagicItem';

export function newTradeGood(props) {
  const bootyDie = props.bootyDie;
  const weaponOrArmor = (Math.random() < .5) ? newArmorShield() : newWeapon();

  const tradeGoodMap = {
    1: ['grain/raw textile', 2 * roll(bootyDie).result],
    2: ['lumber/stone', 2 * roll(bootyDie).result],
    3: ['preserved food (rations)', roll(bootyDie).result],
    4: ['ore (copper/iron, etc.)', roll(bootyDie).result],
    5: ['furs/hides/fabric/paper', roll(bootyDie).result],
    6: ['pottery/glassware', roll(bootyDie).result],
    7: ['beer/wine/spirits', roll(bootyDie).result],
    8: ['herbs/spices/tea/tobacco', roll(bootyDie).result * .25],
    9: ['monster parts', 2 * roll(bootyDie).result],
    10: ['contraband', roll(bootyDie).result * .25],
    11: [weaponOrArmor, 2 * roll(bootyDie).result],
    12: ['silver/gold/jewels', roll(bootyDie).result],
  };

  const tradeGoodValues = {
    1: 2,
    2: 4,
    3: 6,
    4: roll('2d4').result,
    5: 5 * roll('d4').result,
    6: 5 * roll('d6').result,
    7: 5 * roll('d4').result,
    8: roll('2d105').result,
    9: 0,
    10: 5 * roll('4d10').result,
    11: 0,
    12: 100 * roll(bootyDie).result,
  };

  const tradeGoodRoll = roll(bootyDie).result;
  const [type, weight] = tradeGoodMap[tradeGoodRoll];
  const value = weight * tradeGoodValues[tradeGoodRoll];
  const tradeGood = `${type} weighing ${weight} worth ${value} sp`;

  return (tradeGood);
}

export function newBookScroll(props) {
  const bootyDie = props.bootyDie;

  // [form, baseValue, uses, weight]
  const bookScrollMap = {
    5: ['scroll/chapbook/tract', 5, 1, 0],
    8: ['guide/handbook', 10, roll(bootyDie).result, 0],
    14: ['book/tome/volume', 10, 2 * roll(bootyDie).result, 1],
    18: ['codex/history', 25, 3 * roll(bootyDie).result, 1],
    20: ['saga/epic/grimoire', 50, 4 * roll(bootyDie).result, 2],
  }
  const [form, baseValue, uses, weight] = bookScrollMap[mapKeys(bookScrollMap, roll('d20').result)];
  const bookScroll = `${form} with ${uses} uses, weighing ${weight}, worth ${baseValue * uses} sp`;

  return (bookScroll);
}

export function newArtObject(props) {
  const bootyDie = props.bootyDie;

  // [form, value modifier, weight]]
  const artObjectMap = {
    2: ['pipe/cup/utensil', .25, 0],
    4: ['book/scroll/map', 1, 0],
    6: ['vase/urn/bowl/pot', .5, roll('d2').result - 1],
    8: ['cup/goblet/chalice', .5, roll('d2').result - 1],
    9: ['mirror/hourglass/device', 1.5, roll('d2').result - 1],
    11: ['box/case/coffer/chest', 1, roll('d4').result],
    13: ['painting/mosaic', 1, roll('d2').result],
    14: ['candelabra/brazier', 1, roll('d2').result],
    17: ['statue/idol/bust', 2, roll('d8').result],
    18: ['desk/table/dais/stand', 2, 10],
    19: ['dresser/armoire/', 2, 10],
    20: ['chair/settee/throne', 2, 10],
  };
  const artQuality = {
    6: ['common', roll(`5${bootyDie}`).result * 5],
    9: ['fine', roll(`5${bootyDie}`).result * 10],
    12: ['exquisite', roll(`5${bootyDie}`).result * 20]
  };

  const [form, valueModifier, weight] = artObjectMap[mapKeys(artObjectMap, roll('d20').result)];
  const [quality, baseValue] = artQuality[mapKeys(artQuality, roll(bootyDie).result)];
  const artObject = `${quality} ${form} weighing ${weight} worth ${baseValue * valueModifier} sp`;

  return (artObject);
}

export function newRarity(props) {
  const bootyDie = props.bootyDie;
  const rarityMap = {
    3: newTradeGood,
    5: newBookScroll,
    7: newArtObject,
    12: newMagicItem,
  }
  const rarityRoll = mapKeys(rarityMap, roll(bootyDie).result);
  const bookCount = (rarityRoll == 5) ? roll(bootyDie).result : 1;

  const rarities = [];
  for (let i = 0; i < bookCount; i++) {
    const rarity = rarityMap[rarityRoll](props);
    rarities.push(rarity);
  }
  const rarity = (rarities.length > 1) ? rarities.join('; ') : rarities[0];

  return rarity;
}

export default function rarity(props) {
  return (listItems(props, newRarity));
}

