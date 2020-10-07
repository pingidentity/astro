import { focus } from './colors';

export const focusOutlineCSS = `
    outline: none;
    .ui-library-focus-visible &:focus {
        box-shadow: 0 0 5px ${focus};
    }
`;
