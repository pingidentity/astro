import React from 'react';

const renderLink = (props) => {
  return (
      <a
          href={props.href}
          rel="nofollow noreferrer noopener"
          target="_blank"
      >
          {props.children}
      </a>
  );
};

export default {
    link: renderLink,
};
