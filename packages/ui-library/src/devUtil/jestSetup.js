
// This is needed for testing the modal and DetailsTooltip component.
global.getSelection = jest.fn();
global.getSelection.mockReturnValue({
    toString: () => "",
});
global.document.createRange = () => ({
    setStart: () => {},
    setEnd: () => {},
    commonAncestorContainer: {
        nodeName: "BODY",
        ownerDocument: document,
    },
});
