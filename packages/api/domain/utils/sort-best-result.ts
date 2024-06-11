import { ISortBestResultConfig } from '../../bd';

export type ISortBestResult = (
    arg1: Record<string, number>,
    arg2: Record<string, number>,
    config: ISortBestResultConfig
) => number;

export const sortBestResult: ISortBestResult = (el1, el2, configProp) => {
    if (!configProp) {
        return 0;
    }

    const config = Object.entries(configProp).sort(
        ([key1, value1], [key2, value2]) => value1.order - value2.order
    );

    for (let i = 0; i < config.length; i++) {
        const rule = config[i][1].type;
        const targetKey = config[i][0];
        const targetEquals = config[i][1].equals;

        if (el1[targetKey] === el2[targetKey]) {
            continue;
        }

        if (rule === 'equals' && el1[targetKey] !== targetEquals && el2[targetKey] !== targetEquals) {
            continue;
        }

        if (el1[targetKey] === undefined) {
            return 1;
        }

        if (el2[targetKey] === undefined) {
            return -1;
        }

        if (rule === 'min') {
            return el1[targetKey] - el2[targetKey];
        }

        if (rule === 'max') {
            return el2[targetKey] - el1[targetKey];
        }

        if (rule === 'equals') {
            if (el1[targetKey] === targetEquals) {
                return -1;
            }

            if (el2[targetKey] === targetEquals) {
                return 1;
            }
        }
    }

    return 0;
};
