import React from 'react';

import { Link } from '../../../index';
import WithUiLibraryCss from '../withUiLibraryCss';

export default {
  title: 'Chromatic Only Link',
  component: Link,
  decorators: [WithUiLibraryCss],
};

export const Default = () => (
  <div>
    <Link href="https://uilibrary.ping-eng.com">A link</Link> to your favorite website.
  </div>
);
