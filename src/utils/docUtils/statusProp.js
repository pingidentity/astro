import PropTypes from 'prop-types';

import statuses from '../devUtils/constants/statuses';

const descriptions = {
  status: 'Determines any status related styling.',
};

export const statusBaseDocSettings = {
  control: {
    type: 'radio',
    options: Object.values(statuses),
  },
  defaultValue: statuses.DEFAULT,
  table: {
    type: {
      summary: Object.values(statuses).map(status => `'${status}'`).join('|'),
    },
  },
};

export const statusArgTypes = {
  'status': {
    description: descriptions.status,
    ...statusBaseDocSettings,
  },
};

export const statusPropTypes = {
  status: PropTypes.oneOf(Object.values(statuses)),
};

export const statusDefaultProp = {
  status: statuses.DEFAULT,
};
