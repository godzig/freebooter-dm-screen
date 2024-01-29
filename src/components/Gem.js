import { listItems, mapKeys, pick, roll } from '../app/utils';

function newGem(props) {
    const bootyDie = props.str;

    const generateGems = (bootyDie) => {
        let gemMap = {
            3: [pick(['quartz', 'agate', 'malachite', 'obsidian', 'coral', 'lapis lazuli']), roll('2d10').result],
            5: [pick(['peridot', 'carnelian', 'turquoise', 'jasper', 'moonstone', 'onyx']), 2 * roll('2d10').result],
            7: [pick(['topaz', 'amber', 'citrine', 'spinel', 'garnet', 'opal']), 5 * roll('2d10').result],
            9: [pick(['alexandrite', 'jade', 'tourmaline', 'beryl', 'aquamarine', 'amethyst']), 5 * roll('5d10').result],
            11: [pick(['pearl', 'ruby', 'ruby', 'emerald', 'emerald', 'sapphire']), 15 * roll('5d10').result],
            15: ['diamond', 10 * roll('10d10').result],
        }
        const [type, value] = gemMap[mapKeys(gemMap, 2 + roll(bootyDie).result)];
        gemMap['1'] = [`flawed ${type}`, .25 * value];
        gemMap['2'] = [`uncut ${type}`, .5 * value];

        return gemMap;
    }
    const gems = generateGems(bootyDie);

    const [form, value] = gems[mapKeys(gems, roll(bootyDie).result)];
    const gem = `${form} worth ${value} sp`;

    return (gem);
}

export default function gem(props) {
    return (listItems(props, newGem));
}
