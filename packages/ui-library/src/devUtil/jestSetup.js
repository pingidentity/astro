global.getSelection = jest.fn();
global.getSelection.mockReturnValue({
    toString: () => "",
});
