import { booleanArg, funcArg } from '../../../utils/docUtils/docArgTypes';

export const listViewOnyxDarkArgTypes = {
  selectionMode: {
    control: { type: 'select' },
    options: ['expansion', 'single', 'multiple', 'none'],
    description: 'The type of selection that is allowed in the list view.',
  },
  isHoverable: {
    ...booleanArg,
    description: 'Whether list items display a hover state.',
  },
  loadingState: {
    control: { type: 'text' },
    description: 'The current loading state of the list view (e.g. loading, loadingMore, filtering).',
  },
  'aria-label': {
    control: { type: 'text' },
    description: 'Defines a string value that labels the list view for accessibility.',
  },
  onFocus: {
    ...funcArg,
    description: 'Handler that is called when the list view receives focus.',
  },
  onLoadMore: {
    ...funcArg,
    description: 'Handler that is called when more items should be loaded from the data source.',
  },
  onLoadPrev: {
    ...funcArg,
    description: 'Handler that is called when previous items should be loaded from the data source.',
  },
  containerProps: {
    control: { type: null },
    description: 'Props to pass to the outer container element of the list view.',
  },
};
