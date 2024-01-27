// Generates spell names per Freebooter tables
import { pick, wizardName } from "../app/utils";
import { useState } from 'react'

const form = ["Armor", "Arrow", "Aura", "Bane", "Beast", "Blade", "Blast", "Blessing", "Blob", "Blood", "Bolt", "Bond", "Boon", "Brain", "Burst", "Call", "Charm", "Circle", "Claw", "Cloak", "Cone", "Crown", "Cube", "Cup", "Curse", "Dagger", "Dart", "Demon", "Disturbance", "Door", "Eye", "Eyes", "Face", "Fang", "Feast", "Finger", "Fissure", "Fist", "Gate", "Gaze", "Glamour", "Globe", "Golem", "Guard", "Guide", "Guise", "Halo", "Hammer", "Hand", "Heart", "Helm", "Horn", "Jar", "Lock", "Mantle", "Mark", "Memory", "Mind", "Mouth", "Oath", "Oracle", "Pattern", "Pet", "Pillar", "Pocket", "Portal", "Pyramid", "Ray", "Rune", "Scream", "Seal", "Sentinel", "Servant", "Shaft", "Shield", "Sigil", "Sign", "Song", "Spear", "Sphere", "Spray", "Staff", "Storm", "Strike", "Sword", "Tendril", "Tongue", "Tooth", "Trap", "Veil", "Voice", "Wall", "Ward", "Wave", "Weapon", "Weave", "Whisper", "Wings", "Word"];
const property = ["Acid", "Aether", "Air", "Anger", "Ash", "Avarice", "Balance", "Battle", "Blight", "Blood", "Bone", "Brimstone", "Clay", "Cloud", "Copper", "Cosmos", "Dark", "Death", "Deceit", "Despair", "Destiny", "Dimension", "Doom", "Dust", "Earth", "Ember", "Energy", "Envy", "Fear", "Fire", "Fog", "Force", "Fury", "Glory", "Gluttony", "Gold", "Greed", "Hate", "Hatred", "Health", "Heat", "History", "Hope", "Ice", "Iron", "Justice", "Knowledge", "Lead", "Lies", "Life", "Light", "Lightning", "Lore", "Love", "Lust", "Metal", "Might", "Mist", "Moon", "Mud", "Nature", "Oil", "Pain", "Perception", "Plane", "Plant", "Poison", "Quicksilver", "Revulsion", "Rot", "Salt", "Shadow", "Sight", "Silver", "Smoke", "Soil", "Soul", "Sound", "Spirit", "Stars", "Steam", "Steel", "Stone", "Storm", "Strength", "Sun", "Terror", "Time", "Treasure", "Truth", "Vanity", "Venom", "Vermin", "Void", "Water", "Will", "Wind", "Wisdom", "Wood", "Youth"];
const adjective = ["All-Knowing", "All-Seeing", "Arcane", "Befuddling", "Binding", "Black", "Blazing", "Blinding", "Bloody", "Bright", "Cacophonous", "Cerulean", "Concealing", "Confusing", "Consuming", "Crimson", "Damnable", "Dark", "Deflecting", "Delicate", "Demonic", "Devastating", "Devilish", "Diminishing", "Draining", "Eldritch", "Empowering", "Enlightening", "Ensorcelling", "Entangling", "Enveloping", "Erratic", "Evil", "Excruciating", "Expanding", "Extra-Planar", "Fearsome", "Flaming", "Floating", "Freezing", "Glittering", "Gyrating", "Helpful", "Hindering", "Icy", "Illusory", "Incredible", "Inescapable", "Ingenious", "Instant", "Invigorating", "Invisible", "Invulnerable", "Liberating", "Maddening", "Magnificent", "Many-Colored", "Mighty", "Most Excellent", "Omnipotent", "Oozing", "Penultimate", "Pestilential", "Piercing", "Poisonous", "Prismatic", "Raging", "Rejuvenating", "Restorative", "Screaming", "Sensitive", "Shimmering", "Shining", "Silent", "Sleeping", "Slow", "Smoking", "Sorcerer’s", "Strange", "Stupefying", "Terrible", "Thirsty", "Thundering", "Trans-dimensional", "Transmuting", "Ultimate", "Uncontrollable", "Unseen", "Unstoppable", "Untiring", "Vengeful", "Vexing", "Violent", "Violet", "Viridian", "Voracious", "Weakening", "White", "Wondrous", "Yellow"];

function newSpellName() {
    const roll = Math.floor(Math.random() * 12) + 1;
    let spellName;

    if (roll <= 2) {
        spellName = `${pick(property)} ${pick(form)}`;
    } else if (roll <= 4) {
        spellName = `${pick(adjective)} ${pick(form)}`;
    } else if (roll <= 6) {
        spellName = `${pick(adjective)} ${pick(property)}`;
    } else if (roll == 7) {
        spellName = `${pick(form)} of ${pick(property)}`;
    } else if (roll == 8) {
        spellName = `${pick(form)} of ${pick(adjective)} ${pick(property)}`;
    } else if (roll == 9) {
        spellName = `${wizardName()}'s ${pick(adjective)} ${pick(form)}`;
    } else if (roll == 10) {
        spellName = `${wizardName()}'s ${pick(adjective)} ${pick(property)}`;
    } else if (roll == 11) {
        spellName = `${wizardName()}'s ${pick(form)} of ${pick(property)}`;
    } else if (roll == 12) {
        spellName = `${wizardName()}'s ${pick(property)} ${pick(form)}`;
    }

    return spellName;
}

export default function SpellName(props) {
    const spells = []
    const [spellKey, setSpellKey] = useState(1);

    function updateSpell() {
        setSpellKey(Math.random());
    }

    for (let i = 0; i < props.count; i++) {
        spells.push(<li key={i}>{newSpellName()}</li>);
    }

    return (
        <>
            <button onClick={updateSpell} className="bg-gray-800 hover:bg-gray-900 rounded-full p-2 m-2">New Spells</button>
            <ul className="list-disc">{spells}</ul>
        </>
    );
}
