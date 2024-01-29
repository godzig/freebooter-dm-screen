import { roll } from '../app/utils';
import { useState } from 'react';
import bodyPart from './BodyPart';
import personalItem from './PersonalItem';
import trinket from './Trinket';
import gem from './Gem';
import jewelry from './Jewelry';
import rarity from './Rarity';

export default function Booty() {
    const [dice, setDice] = useState({ 'result': 0, 'str': 'd4' });
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
                updatedBooty.Stashed = personalItem({...dice, count: roll('d4').result});
                updatedBooty['In Lair'] = personalItem({...dice, count: roll('d6').result});
            },
            3: () => {
                updatedBooty.Inherent = 'nutriment worth (HP/2) rations';
                updatedBooty.Carried = personalItem({...dice});
                updatedBooty.Stashed = trinket({...dice, count: roll('d4').result});
                updatedBooty['In Lair'] = trinket({...dice, count: roll('d6').result});
            },
            4: () => {
                updatedBooty.Inherent = bodyPart(dice.str);
                updatedBooty.Carried = trinket({...dice});
                updatedBooty.Stashed = `currency worth ${roll('4d10').result} sp`;
                updatedBooty['In Lair'] = `currency worth ${roll('6d10').result} sp`;
            },
            5: () => {
                updatedBooty.Inherent = 'nutriment worth (HP/2) rations';
                updatedBooty.Carried = `currency worth ${roll('4d10').result} sp`;
                updatedBooty.Stashed = gem({...dice, count: roll('d4').result});
                updatedBooty['In Lair'] = gem({...dice, count: roll('d6').result});
            },
            6: () => {
                updatedBooty.Inherent = bodyPart(dice.str);
                updatedBooty.Carried = gem({...dice});
                updatedBooty.Stashed = jewelry({...dice});
                updatedBooty['In Lair'] = jewelry({...dice, count: roll('d4').result});
            },
            7: () => {
                updatedBooty.Inherent = 'nutriment worth (HP/2) rations';
                updatedBooty.Carried = `currency worth ${roll('6d10').result} sp`;
                updatedBooty.Stashed = `currency worth ${roll('6d10').result} sp`;
                updatedBooty['In Lair'] = `currency worth ${roll('10d10').result} sp`;
            },
            8: () => {
                updatedBooty.Inherent = bodyPart(dice.str);
                updatedBooty.Carried = jewelry({...dice});
                updatedBooty.Stashed = rarity({...dice});
                updatedBooty['In Lair'] = rarity({...dice});
            },
            9: () => {
                updatedBooty.Inherent = 'nutriment worth (HP/2) rations';
                updatedBooty.Carried = `currency worth ${roll('8d10').result} sp`;
                updatedBooty.Stashed = `currency worth ${roll('10d10').result} sp`;
                updatedBooty['In Lair'] = `currency worth ${5 * roll('10d10').result} sp`;
            },
            10: () => {
                updatedBooty.Inherent = bodyPart(dice.str);
                updatedBooty.Carried = rarity({...dice});
                updatedBooty.Stashed = rarity({...dice});
                updatedBooty['In Lair'] = rarity({...dice, count: roll('d4').result});
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