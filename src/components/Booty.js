import { roll } from '../app/utils';
import { useState } from 'react';
import bodyPart from './BodyPart';
import personalItem from './PersonalItem';

export default function Booty() {
    const [dice, setDice] = useState({ 'result': 1, 'str': 'd4' });
    const [booty, setBooty] = useState({ 'Inherent': '', 'Carried': '', 'Stashed': '', 'In Lair': '' });
    const orderedBooty = ['Inherent', 'Carried', 'Stashed', 'In Lair'];

    function bootyRoll(dice) {
        const updatedDice = roll(dice);
        setDice(updatedDice);
        updateBooty(updatedDice);
    }

    function updateBooty(dice) {
        const updatedBooty = {};
        const bootyTable = {
            1: () => {
                updatedBooty.Inherent = 'nothing of note';
                updatedBooty.Carried = 'nothing of note';
                updatedBooty.Stashed = `currency worth ${roll('2d10').result} sp`;
                updatedBooty['In Lair'] = `currency worth ${roll('4d10').result} sp`;
            },
            2: () => {
                updatedBooty.Inherent = 'nothing of note';
                updatedBooty.Carried = `currency worth ${roll('2d10').result} sp`;
                updatedBooty.Stashed = personalItem({count: roll('d4').result, str: dice.str});
                updatedBooty['In Lair'] = personalItem({count: roll('d6').result, str: dice.str});
            },
            3: () => {
                updatedBooty.Inherent = 'nutriment worth (HP/2) rations';
                updatedBooty.Carried = personalItem({str: dice.str});
                updatedBooty.Stashed = trinket(roll('d4').result);
                updatedBooty['In Lair'] = trinket(roll('d6').result);
            },
            4: () => {
                updatedBooty.Inherent = bodyPart(dice.str);
                updatedBooty.Carried = trinket();
                updatedBooty.Stashed = `currency worth ${roll('4d10').result} sp`;
                updatedBooty['In Lair'] = `currency worth ${roll('6d10').result} sp`;
            },
            5: () => {
                updatedBooty.Inherent = 'nutriment worth (HP/2) rations';
                updatedBooty.Carried = `currency worth ${roll('4d10').result} sp`;
                updatedBooty.Stashed = gem(roll('d4').result);
                updatedBooty['In Lair'] = gem(roll('d6').result);    
            },
            6: () => {
                updatedBooty.Inherent = bodyPart(dice.str);
                updatedBooty.Carried = gem();
                updatedBooty.Stashed = jewelry();
                updatedBooty['In Lair'] = jewelry(roll('d4').result);
            },
            7: () => {
                updatedBooty.Inherent = 'nutriment worth (HP/2) rations';
                updatedBooty.Carried = `currency worth ${roll('6d10').result} sp`;
                updatedBooty.Stashed = `currency worth ${roll('6d10').result} sp`;
                updatedBooty['In Lair'] = `currency worth ${roll('10d10').result} sp`;
            },
            8: () => {
                updatedBooty.Inherent = bodyPart(dice.str);
                updatedBooty.Carried = jewelry();
                updatedBooty.Stashed = rarity();
                updatedBooty['In Lair'] = rarity();
            },
            9: () => {
                updatedBooty.Inherent = 'nutriment worth (HP/2) rations';
                updatedBooty.Carried = `currency worth ${roll('8d10').result} sp`;
                updatedBooty.Stashed = `currency worth ${roll('10d10').result} sp`;
                updatedBooty['In Lair'] = `currency worth ${5 * roll('10d10').result} sp`;
            },
            10: () => {
                updatedBooty.Inherent = bodyPart(dice.str);
                updatedBooty.Carried = rarity();
                updatedBooty.Stashed = rarity();
                updatedBooty['In Lair'] = rarity(roll('d4').result);
            },
            11: () => {
                updatedBooty.Inherent = 'none';
                updatedBooty.Carried = `currency worth ${roll('10d10').result} sp`;
                updatedBooty.Stashed = `currency worth ${5 * roll('10d10').result} sp`;
                updatedBooty['In Lair'] = `currency worth ${10 * roll('10d10').result} sp`;
            },
            12: () => {
                updatedBooty.Inherent = 'none';
                updatedBooty.Carried = magicItem();
                updatedBooty.Stashed = magicItem();
                updatedBooty['In Lair'] = magicItem();
            }
        };

        if (bootyTable[dice.result]) {
            bootyTable[dice.result]();
        }
        setBooty(updatedBooty);
    }

    function trinket(count = 1) {
        // probably this returns a semi-colon delimited string of multiple items. but readability?
        return `${count} trinkets`;
    }

    function gem(count = 1) {
        // probably this returns a semi-colon delimited string of multiple items. but readability?
        return `${count} gems`;
    }

    function jewelry(count = 1) {
        // probably this returns a semi-colon delimited string of multiple items. but readability?
        return `${count} jewelry`;
    }

    function rarity(count = 1) {
        // probably this returns a semi-colon delimited string of multiple items. but readability?
        return `${count} rarities`;
    }

    function magicItem() {
        // probably this returns a semi-colon delimited string of multiple items. but readability?
        return `a magic item`;
    }

    return (
        <div className="px-0">
            <button onClick={() => bootyRoll({ 'str': 'd4' })} className="bg-gray-800 hover:bg-gray-900 p-2 px-6 mb-2 mr-2 rounded-tl-3xl">d4 tiny poor</button>
            {[['d6 sm mediocre', 'd6'],
            ['d8 md comfortable', 'd8'],
            ['d10 lg wealthy', 'd10'],
            ['d12 xl fabulous', 'd12']
            ].map(([text, dieRoll], i) => (
                <button key={i} onClick={() => bootyRoll({ 'str': dieRoll })} className="bg-gray-800 hover:bg-gray-900 p-2 px-6 mb-2 mr-2">{text}</button>
            ))
            }
            <button onClick={() => updateBooty(dice)} className="bg-gray-600 hover:bg-gray-700 p-2 px-6 mb-2 mr-2">same roll, new goodies</button>
            <p className="mx-4">{dice.str}: {dice.result}</p>
            <ul className="list-disc mx-8">
                {orderedBooty.map((where, i) => (
                    <li key={i}>{where}: {booty[where]}</li>
                ))
                }
            </ul>
        </div >
    )
}