module.exports = {
  ...jest.requireActual('@react-aria/focus'),
  useFocusRing: jest.fn(() => ({
    isFocusVisible: false,
    focusProps: {},
  })),
};
