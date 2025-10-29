import { axe } from 'jest-axe';

const axeTest = async (getComponent, rules = {}) => {
  test('should have no accessibility violations', async () => {
    jest.useRealTimers();

    const { container } = getComponent();
    const results = await axe(container, rules);

    expect(results).toHaveNoViolations();
  });
};

export default axeTest;
