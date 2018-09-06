const splitData = ({ id, data }) => data.map(point => ({ [id]: point }));

// Takes data from the format of [{ id: [data] }, { id2: [data2] }] and converts
// it to the format of [[{ id: dataPoint }, { id2: dataPoint to }]]
// All incoming arrays of data must be of the same length
export const toRechartsDataFormat = dataSet => dataSet.reduce((acc, data) => {
    const split = splitData(data);
    return acc.length > 0
        ? acc.map((frame, index) => ({ ...frame, ...split[index] }))
        : split
    ;
}, []);

const addToExisting = (index, data, acc) => {
    const { id, data: currentData } = acc[index];
    return {
        data: [
            ...currentData,
            data,
        ],
        id
    };
};

// Takes data from the format of [[{ id: dataPoint }, { id2: dataPoint to }]] and converts
// it to the format of [{ id: [data] }, { id2: [data2] }]
export const fromRechartsDataFormat = dataSet => dataSet.reduce((acc, frame) =>
    Object.entries(frame).reduce((frameAcc, [id, data]) => {
        const idIndex = frameAcc.findIndex(entry => entry.id === id);
        return idIndex > -1
            ? [
                ...idIndex > 0 ? frameAcc.slice(0, idIndex) : [],
                addToExisting(idIndex, data, frameAcc),
                ...idIndex < frameAcc.length ? frameAcc.slice(idIndex + 1, frameAcc.length) : []
            ]
            : [...frameAcc, { id, data: [data] }];
    }, acc)
, []);
