import { roll } from '../app/utils';
import { useState } from 'react';

export default function Booty() {
    const [dice, setDice] = useState(NaN);

    function bootyRoll(dice) {
        const result = roll(dice);
        setDice(result);
        console.log(result);
    }

    return (
        <div className="px-0">
            <button onClick={() => bootyRoll('d4')} className="bg-gray-800 hover:bg-gray-900 p-2 px-6 mb-2 mr-2 rounded-tl-3xl">d4 tiny poor</button>
            {[['d6 sm mediocres', 'd6'],
            ['d8 md comfortable', 'd8'],
            ['d10 lg wealthy', 'd10'],
            ['d12 xl fabulous', 'd12']
            ].map(([text, dice]) => (
                <button onClick={() => bootyRoll(dice)} className="bg-gray-800 hover:bg-gray-900 p-2 px-6 mb-2 mr-2">{text}</button>
            ))
            }
            <p>{dice}</p>
        </div >
    )
}