import React from 'react';

import { Link, Text } from '../..';
import statuses from '../../utils/devUtils/constants/statuses';
import Bulletin from './Bulletin';

export default {
  title: 'Bulletin',
  component: Bulletin,
  argTypes: {
    status: {
      control: {
        type: 'select',
        options: Object.values(statuses),
      },
    },
  },
};

// main
export const Default = args => (
  <Bulletin {...args}>
    <Text>
      You should be aware of this. It might be good or bad, I don’t know.
      You may already be aware of it, but I want to be sure
      <Link
        href="https://pingidentity.com"
        target="_blank"
        aria-label={`${statuses.DEFAULT}-bulletin`}
        variant="app"
      > Read More
      </Link>
    </Text>
  </Bulletin>
);

export const ErrorStatus = () => (
  <Bulletin status={statuses.ERROR}>
    <Text>
      You’ve got problems. Allow me to tell you about them in some
      detail so that you can address them
      <Link
        href="https://pingidentity.com"
        target="_blank"
        aria-label={`${statuses.ERROR}-bulletin`}
        variant="app"
      > Read More
      </Link>
    </Text>
  </Bulletin>
);

// Avoiding using Error as the function name due to it being a JS built-in method
ErrorStatus.storyName = 'Error';

export const Success = () => (
  <Bulletin status={statuses.SUCCESS}>
    <Text>
      It Worked! Maybe there is something else related to it
      working that I need to explain
      <Link
        href="https://pingidentity.com"
        target="_blank"
        aria-label={`${statuses.SUCCESS}-bulletin`}
        variant="app"
      > Read More
      </Link>
    </Text>
  </Bulletin>
);

export const Warning = () => (
  <Bulletin status={statuses.WARNING}>
    <Text>
      You’ve got issues. Allow me to tell you about them in some
      detail so that you can address them. I’ll continue to type
      enough text to demonstrate that the Bulletin box will grow in
      height with the content
      <Link
        href="https://pingidentity.com"
        target="_blank"
        aria-label={`${statuses.WARNING}-bulletin`}
        variant="app"
      > Read More
      </Link>
    </Text>
  </Bulletin>
);
