import React from 'react';

import { render, screen } from '../../../utils/testUtils/testWrapper';

import Attachment from './Attachment';

const mockFileName = 'sampleFile';

const defaultProps = {
  key: 'file_key',
  title: mockFileName,
  fileType: 'PPT',
  removeFile: () => { return false; },
  id: 'Example Title',

};

const getComponent = (props = {}) => render(
  <Attachment {...defaultProps} {...props} />,
);

describe('Attachment', () => {
  test('renders with PPT file format ', () => {
    getComponent();
    screen.getByRole('img', {
      name: /ppt file icon/i,
    });
    screen.getByRole('heading', {
      name: mockFileName,
    });
    screen.getAllByText(/ppt/i);
    screen.getByRole('button', {
      name: /remove attachment/i,
    });
  });

  test('renders with PDF file format', () => {
    getComponent({ fileType: 'pdf' });
    screen.getByRole('img', {
      name: /pdf file icon/i,
    });
    screen.getByRole('heading', {
      name: mockFileName,
    });
    screen.getAllByText(/pdf/i);
  });

  test('renders with CSV file format', () => {
    getComponent({ fileType: 'csv' });
    screen.getAllByText(/csv/i);
  });

  test('renders with JS file format', () => {
    getComponent({ fileType: 'js' });
    screen.getAllByText(/js/i);
  });

  test('renders with ZIP file format', () => {
    getComponent({ fileType: 'zip' });
    screen.getAllByText(/zip/i);
  });
});
