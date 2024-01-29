import { listItems, mapKeys, pick, roll } from '../app/utils';

function newTradeGood(props) {
    const bootyDie = props.str;
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
        11: ['weapons/armor [31]', 2 * roll(bootyDie).result],
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
    const bootyDie = props.str;

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

function newArtObject (props) {
    // 1-2 pipe/cup/utensil .25 0 1-6 common (5bd×5)×m
    // 3-4 book/scroll/map 1 0 7-9 fine (5bd×10)×m
    // 5-6 vase/urn/bowl/pot .5 1d2-1 10-12 exquisite (5bd×20)×m
    // 7-8 cup/goblet/chalice .5 1d2-1
    // 9 mirror/hourglass/device 1.5 1d2-1
    // 10-11 box/case/coffer/chest 1 1d4
    // 12-13 painting/mosaic 1 1d2
    // 14 candelabra/brazier 1 1d2
    // 15-17 statue/idol/bust 2 1d8
    // 18 desk/table/dais/stand 2 unwieldy
    // 19 dresser/armoire/ 2 unwieldy
    // 20 chair/settee/throne 2 unwieldy    
    return ('art object');
}


// this is unfinished
function newRarity(props) {
    // return newTradeGood(props);
    return newBookScroll(props); // don't forget that these come in sets of 1bd for rarities
}

export default function rarity(props) {
    return (listItems(props, newRarity));
}

