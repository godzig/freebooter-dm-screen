import { useState } from 'react';
import { roll } from '../app/utils';
import bodyPart from './BodyPart';
import personalItem from './PersonalItem';
import trinket from './Trinket';
import gem from './Gem';
import jewelry from './Jewelry';
import rarity from './Rarity';
import magicItem from './MagicItem';

export default function Booty(props) {
  const bootyDie = props.menuOptions.bootyDie;

  const [result, setResult] = useState(0);
  const [booty, setBooty] = useState({ 'Inherent': '', 'Carried': '', 'Stashed': '', 'In Lair': '' });
  const orderedBooty = ['Inherent', 'Carried', 'Stashed', 'In Lair'];

  function reRollResult(bootyDie) {
    const result = roll(bootyDie).result;
    setResult(result);
    updateBooty({bootyDie, result});
  }

  function keepResult() {
    updateBooty({bootyDie, result});
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
        updatedBooty.Stashed = personalItem({ ...dice, count: roll('d4').result });
        updatedBooty['In Lair'] = personalItem({ ...dice, count: roll('d6').result });
      },
      3: () => {
        updatedBooty.Inherent = 'nutriment worth (HP/2) rations';
        updatedBooty.Carried = personalItem({ ...dice });
        updatedBooty.Stashed = trinket({ ...dice, count: roll('d4').result });
        updatedBooty['In Lair'] = trinket({ ...dice, count: roll('d6').result });
      },
      4: () => {
        updatedBooty.Inherent = bodyPart({ ...dice });
        updatedBooty.Carried = trinket({ ...dice });
        updatedBooty.Stashed = `currency worth ${roll('4d10').result} sp`;
        updatedBooty['In Lair'] = `currency worth ${roll('6d10').result} sp`;
      },
      5: () => {
        updatedBooty.Inherent = 'nutriment worth (HP/2) rations';
        updatedBooty.Carried = `currency worth ${roll('4d10').result} sp`;
        updatedBooty.Stashed = gem({ ...dice, count: roll('d4').result });
        updatedBooty['In Lair'] = gem({ ...dice, count: roll('d6').result });
      },
      6: () => {
        updatedBooty.Inherent = bodyPart({ ...dice });
        updatedBooty.Carried = gem({ ...dice });
        updatedBooty.Stashed = jewelry({ ...dice });
        updatedBooty['In Lair'] = jewelry({ ...dice, count: roll('d4').result });
      },
      7: () => {
        updatedBooty.Inherent = 'nutriment worth (HP/2) rations';
        updatedBooty.Carried = `currency worth ${roll('6d10').result} sp`;
        updatedBooty.Stashed = `currency worth ${roll('6d10').result} sp`;
        updatedBooty['In Lair'] = `currency worth ${roll('10d10').result} sp`;
      },
      8: () => {
        updatedBooty.Inherent = bodyPart({ ...dice });
        updatedBooty.Carried = jewelry({ ...dice });
        updatedBooty.Stashed = rarity({ ...dice });
        updatedBooty['In Lair'] = rarity({ ...dice });
      },
      9: () => {
        updatedBooty.Inherent = 'nutriment worth (HP/2) rations';
        updatedBooty.Carried = `currency worth ${roll('8d10').result} sp`;
        updatedBooty.Stashed = `currency worth ${roll('10d10').result} sp`;
        updatedBooty['In Lair'] = `currency worth ${5 * roll('10d10').result} sp`;
      },
      10: () => {
        updatedBooty.Inherent = bodyPart({ ...dice });
        updatedBooty.Carried = rarity({ ...dice });
        updatedBooty.Stashed = rarity({ ...dice });
        updatedBooty['In Lair'] = rarity({ ...dice, count: roll('d4').result });
      },
      11: () => {
        updatedBooty.Inherent = 'none';
        updatedBooty.Carried = `currency worth ${roll('10d10').result} sp`;
        updatedBooty.Stashed = `currency worth ${5 * roll('10d10').result} sp`;
        updatedBooty['In Lair'] = `currency worth ${10 * roll('10d10').result} sp`;
      },
      12: () => {
        updatedBooty.Inherent = 'none';
        updatedBooty.Carried = magicItem({ ...dice });
        updatedBooty.Stashed = magicItem({ ...dice });
        updatedBooty['In Lair'] = magicItem({ ...dice });
      }
    };

    if (bootyTable[dice.result]) {
      bootyTable[dice.result]();
    }
    setBooty(updatedBooty);
  }

  return (
    <div className="px-0">
      <button onClick={() => reRollResult(bootyDie)} className="bg-gray-800 hover:bg-gray-900 p-2 px-6 mb-2 mr-2">ReRoll</button>
      <button onClick={() => keepResult()} className="bg-gray-800 hover:bg-gray-900 p-2 px-6 mb-2 mr-2">ReGenerate</button>
      <p className="mx-4">{bootyDie} roll: {result}</p>
      <ul className="list-disc mx-8">
        {orderedBooty.map((where, i) => (
          <li key={i}>{where}: {booty[where]}</li>
        ))
        }
      </ul>
    </div >
  )
}