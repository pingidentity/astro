import { ThemeUICSSObject } from 'theme-ui';

// Legacy Astro renders the delete control outside the input, absolutely
// positioned to the right of the field row.
const deleteButton: ThemeUICSSObject = {
  position: 'absolute',
  right: -35,
  width: 32,
  height: 32,
  top: 5,
  cursor: 'pointer',
};

export const arrayFieldDeleteButton = {
  deleteButton,
};

export default arrayFieldDeleteButton;
