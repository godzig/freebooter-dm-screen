

const wizPrefix = ["A", "Ab", "Aga", "Alha", "Appol", "Apu", "Arne", "Asmo", "Baha", "Bal", "Barba", "Bol", "By", "Can", "Cinni", "Cir", "Cyn", "Cyto", "Dar", "Darg", "De", "Des", "Dra", "Dul", "Elez", "Ely", "Ez", "Fal", "Faral", "Flo", "Fol", "Gaili", "Garg", "Gast", "Gil", "Gy", "Haz", "Heca", "Her", "Hog", "Hur", "I", "Ik", "Ilde", "In", "Jas", "Jir", "Ju", "Krak", "Kul", "Laf", "Long", "Ma", "Mer", "Mercu", "Mor", "Mune", "Munno", "Murz", "Naf", "O", "Osh", "Pande", "Pander", "Par", "Per", "Quel", "Ra", "Ragga", "Rhi", "Satan", "Satur", "Semi", "Sera", "She", "Shrue", "Sloo", "Sol", "T’", "Tcha", "Tol", "Tub", "Tur", "U", "Vag", "Val", "Vance", "Ver", "Vish", "Wa", "Win", "Xa", "Yu", "Za", "Zal", "Zan", "Zili", "Zim", "Zuur", "Zza"];
const wizSuffix = ["ak", "alto", "ana", "anti", "aris", "ark", "asta", "balia", "bus", "by", "cas", "ce", "derol", "deus", "din", "dok", "dor", "dred", "driar", "dula", "dun", "dustin", "er", "fant", "fia", "fonse", "gad", "gax", "glana", "goria", "goth", "heer", "houlik", "ia", "iala", "iana", "ingar", "ista", "jan", "jobulon", "kan", "kang", "konn", "lah", "leius", "leo", "leou", "lin", "lonia", "lonius", "loo", "lume", "ma", "mas", "mast", "mia", "miel", "motto", "moulian", "mut", "nak", "nia", "nish", "nob", "o", "ol", "ool", "pa", "pheus", "phim", "por", "quint", "ramis", "rezzin", "ro", "rrak", "ry", "sira", "sta", "te", "teria", "thakk", "thalon", "tine", "toomb", "torr", "troya", "tur", "tuva", "u", "valva", "vance", "vilk", "wink", "xa", "yop", "zant", "zark", "zirian", "zred"];

export function wizardName() {
    return (`${pick(wizPrefix)}${pick(wizSuffix)}`);
}

export function pick(arr) {
    return arr[Math.floor(Math.random() * arr.length)];
}

export function mapKeys(map, input) {
    return Object.keys(map).reduce((prev, curr) => (parseInt(curr) >= input && parseInt(curr) < prev) ? parseInt(curr) : prev, Infinity);
}

export function roll(dice) {
    let updatedDice;
    
    if (typeof dice === 'string') {
        updatedDice = {'str': dice};
    } else {
        updatedDice = dice
    }
    const parts = updatedDice['str'].split('d');

    // currently handles _d_ : d4, 2d6, ndn. No arbitrary additions or penalties
    if (parts.length !== 2) {
        return 'Invalid input';
    }
    let numDice = parseInt(parts[0], 10);
    const diceType = parseInt(parts[1], 10);

    // if NaN for count of dice, just use 1.
    if (!numDice) { numDice = 1 }; 

    let result = 0;
    for (let i = 0; i < numDice; i++) {
        result += Math.floor(Math.random() * diceType) + 1;
    }
    updatedDice = {'str': dice.str, 'result': result};

    return (updatedDice);
}
