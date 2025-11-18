import { create } from '@storybook/theming/create';
import pkg from '../package.json';

export default create({
  base: 'light',
  brandTitle: `${pkg.name} ${pkg.version}`,
});
