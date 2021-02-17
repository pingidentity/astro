import React from 'react';
import PropTypes from 'prop-types';
import { PageHeader } from '@pingux/astro';

export default function SectionTitle({ children }) {
  return <PageHeader title={children} />;
}

SectionTitle.propTypes = {
  children: PropTypes.node.isRequired,
};
