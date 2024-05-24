//['page','limit','sortBy','sortOrder']

const pick = <T extends Record<string, unknown>, k extends keyof T>(
    obj: T,
    keys: k[]
): Partial<T> => {
    const resultAsObj: Partial<T> = {};

    for (const key of keys) {
        if (obj && Object.hasOwnProperty.call(obj, key)) {
            resultAsObj[key] = obj[key];
        }
    }
    return resultAsObj;
};

export default pick;