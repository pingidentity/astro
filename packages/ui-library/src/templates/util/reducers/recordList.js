export const actions = {
    UPDATE: "UPDATE",
    DELETE: "DELETE",
};

export const updateRecord = record => ({ type: actions.UPDATE, record });
export const deleteRecord = id => ({ type: actions.DELETE, id });

const recordList = (state, { type, record, id }) => {
    switch (type) {
        case actions.UPDATE:
            if (state.find(({ id: recordId }) => (record.id === recordId))) {
                return state.map(eachRecord => (
                    record.id === eachRecord.id ? { ...eachRecord, ...record } : eachRecord
                ));
            }
            return [...state, record];
        case actions.DELETE:
            return state.filter(({ id: eachId }) => (id !== eachId));
        default: return state;
    }
};

export default recordList;