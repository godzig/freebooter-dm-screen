import { mapKeys, roll } from '../app/utils'

export default function bodyPart(bootyDie) {
    const propertyFullText = {
        augmentation: 'augmentation/enhancement',
        charm: 'charm/ward/talisman',
        curative: 'curative/restorative/antidote',
        decorative: 'decorative/functional',
        ingredient: 'ingredient/component/comestible',
        perfume: 'perfume/aphrodisiac',
        poison: 'poison/toxin',
        protection: 'protection/defense',
    }
    const bodyPartMap = {
        4: {
            type: 'hide/fur/shell', property: {
                2: [propertyFullText.ingredient, `with HP/5 uses, ${bootyDie} per use`],
                6: [propertyFullText.decorative, `worth HP/5 * ${roll(bootyDie).result} sp`],
                12: [propertyFullText.protection, `worth HP/5 * ${roll(bootyDie).result} sp`],
            }
        },
        8: {
            type: 'blood/ichor/juice', property: {
                4: [propertyFullText.ingredient, `with HP/5 uses, ${bootyDie} per use`],
                8: [propertyFullText.poison, `with HP/5 uses, 3${bootyDie} per use`],
                12: [propertyFullText.curative, `with HP/5 uses, 5${bootyDie} per use`],
            }
        },
        12: {
            type: 'an organ/gland/sac/node', property: {
                3: [propertyFullText.ingredient, `with ${roll(bootyDie).result} uses, ${bootyDie} per use`],
                5: [propertyFullText.perfume, `with ${roll(bootyDie).result} uses, 2${bootyDie} per use`],
                7: [propertyFullText.augmentation, `with ${roll(bootyDie).result} uses, 2${bootyDie} per use`],
                10: [propertyFullText.poison, `with ${roll(bootyDie).result} uses, 2${bootyDie} per use`],
                12: [propertyFullText.curative, `with ${roll(bootyDie).result} uses, 3${bootyDie} per use`],
            }
        },
        14: {
            type: 'sinew/muscle/bone', property: {
                10: [propertyFullText.ingredient, `with HP/5 uses, ${bootyDie} per use`],
                12: [propertyFullText.charm, `with HP/5 uses, ${bootyDie} per use`],
            }
        },
        16: {
            type: 'teeth/claws/horns', property: {
                6: [propertyFullText.ingredient,`with ${roll(bootyDie).result} uses, ${bootyDie} per use`],
                10: [propertyFullText.decorative,`with ${roll(bootyDie).result} uses, ${bootyDie} per use`],
                12: [propertyFullText.curative,`with ${roll(bootyDie).result} uses, ${bootyDie} per use`],
            }
        },
        18: {
            type: 'eyes/sensory organ', property: {
                6: [propertyFullText.ingredient, `with ${roll(bootyDie).result} uses, ${bootyDie} per use`],
                9: [propertyFullText.augmentation, `with ${roll(bootyDie).result} uses, 2${bootyDie} per use`],
                12: [propertyFullText.curative, `with ${roll(bootyDie).result} uses, 3${bootyDie} per use`],
            }
        },
        20: {
            type: 'brain', property: {
                6: [propertyFullText.ingredient, `with ${roll(bootyDie).result} uses, 2${bootyDie} per use`],
                9: [propertyFullText.augmentation, `with ${roll(bootyDie).result} uses, 3${bootyDie} per use`],
                12: [propertyFullText.curative, `with ${roll(bootyDie).result} uses, 3${bootyDie} per use`],
            }
        },
    }

    const rollPart = roll('d20').result;
    const part = bodyPartMap[mapKeys(bodyPartMap, rollPart)];

    const rollProperty = roll('d12').result;
    const property = part.property[mapKeys(part.property, rollProperty)];

    const result = {
        type: part.type,
        property: property[0],
        use: property[1]
    }

    return (
        <span>
            {result.type} for {result.property} {result.use}.
        </span>
    )
}
