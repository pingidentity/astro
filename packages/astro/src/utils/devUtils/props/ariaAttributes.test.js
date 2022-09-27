import { getAriaAttributeProps } from './ariaAttributes';

describe('getAriaAttributeProps', () => {
  const subject = props => getAriaAttributeProps(props);

  const propsWithNoAriaAttributes = {
    propOne: 'prop1',
    propTwo: 'prop2',
  };

  describe('when there are 2 props and no aria attributes', () => {
    it('returns an object with empty ariaProps and 2 nonAriaProps', () => {
      const { ariaProps, nonAriaProps } = subject(propsWithNoAriaAttributes);

      expect(Object.keys(nonAriaProps).length).toBe(2);
      expect(Object.keys(ariaProps).length).toBe(0);
    });
  });

  describe('when there is an aria-label and an aria-labelledby in the props', () => {
    it('returns an object with ariaProps containing aria-label and aria-labelledby', () => {
      const propsWithAriaAttributes = {
        'aria-labelledby': 'test labelledby',
        'aria-label': 'test label',
        ...propsWithNoAriaAttributes,
      };
      const { ariaProps, nonAriaProps } = subject(propsWithAriaAttributes);

      expect(Object.keys(nonAriaProps).length).toBe(2);
      expect(Object.keys(ariaProps).length).toBe(2);
    });
  });
});
