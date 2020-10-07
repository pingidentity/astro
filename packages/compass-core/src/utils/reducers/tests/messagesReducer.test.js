import messagesReducer, {
    removeMessage,
} from '../messagesReducer';

it('should remove a message without an id', () => {
    const state = messagesReducer([
        { message: 'uno' },
        { message: 'dos' },
        { message: 'tres' },
    ], removeMessage({ message: 'dos' }));

    expect(state.length).toBe(2);
});

it('should create an empty state', () => {
    const state = messagesReducer();
    expect(state.length).toBe(0);
});
