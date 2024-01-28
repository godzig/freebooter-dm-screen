// still need to build out book/scroll [21], specialty kit / tools [31], and trade good [20] under miscellaneous

import { mapKeys, roll } from '../app/utils';

function newPersonalItem(props) {
    let bootyDie = props.str || 'd4';

    const generateClothing = () => {
        let clothing = {
            1: 'notable shoes/boots',
            2: 'notable trousers/skirt',
            3: 'notable dress/robe',
            4: 'notable tunic/blouse',
            5: 'notable belt/girdle',
            6: 'notable gloves/gauntlets',
            7: 'notable cape/cloak',
            8: 'notable scarf/wrap'
        };
        clothing['11'] = `fine ${clothing[roll('d8').result]}`;
        clothing['12'] = `exquisite ${clothing[roll('d8').result]}`;
        return clothing;
    }
    const clothing = generateClothing();

    const gear = {
        1: 'bedroll/bedding',
        2: 'pouch/bag/quiver/vial',
        3: 'rope/cord/chain',
        4: 'tools/prybar/shovel',
        5: `spirits/wine (${roll('d6').result} uses)`,
        7: `rations (${roll('d6').result} uses)`,
        8: 'torches/candles/lamp',
        9: 'healing supplies',
        10: 'healing potion',
        12: 'weapon',
    }

    const miscellaneous = {
        1: 'instrument',
        2: 'soap/musk/perfume',
        4: `fuel/ammo (${roll(bootyDie).result} uses)`,
        5: 'trap/snare/net',
        6: 'lockpicks/key',
        8: 'note/map/deed',
        9: 'poison/antitoxin',
        10: 'book/scroll [21]',
        11: 'specialty [31] kit/tools',
        12: 'trade good [20]',
    }

    const personalItemMap = {
        4: `${clothing[mapKeys(clothing, roll('d12').result)]}`,
        15: `${gear[mapKeys(gear, roll('d12').result)]}`,
        20: `${miscellaneous[mapKeys(miscellaneous, roll('d12').result)]}`,
    }

    const personalItem = personalItemMap[mapKeys(personalItemMap, roll('d20').result)];
    return personalItem; 
}

export default function personalItem(props) {
    const items = []

    let count = props.count ? props.count : 1;
    for (let i = 0; i < count; i++) {
        items.push(<li key={i}>{newPersonalItem(props)}</li>);
    }

    return (
        <ul className="list-disc mx-8">{items}</ul>
    );
}
