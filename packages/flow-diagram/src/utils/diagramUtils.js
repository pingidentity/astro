import { v4 as uuidV4 } from 'uuid';

export const generateKey = (m, data) => {
    const key = `${data.key}_${uuidV4()}`;

    // eslint-disable-next-line
    data.key = key;
    return key;
};
