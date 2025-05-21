import React from 'react';
import { render, screen } from '@testing-library/react';

import { Link } from '../..';
import { FooterProps } from '../../types';
import { universalComponentTests } from '../../utils/testUtils/universalComponentTest';

import Footer, { CopyrightText, FooterNav, FooterNavItem } from '.';

const legalLinks = [
  {
    key: 'Legal',
    text: 'Legal',
    linkProps: {
      href: 'https://www.pingidentity.com/en/legal.html',
      'aria-label': 'Legal',
    },
  },
  {
    key: 'Privacy',
    text: 'Privacy',
    linkProps: {
      href: 'https://www.pingidentity.com/en-us/docs/legal/privacy',
      'aria-label': 'Privacy',
    },
  },
  {
    key: 'Security',
    text: 'Security',
    linkProps: {
      href: 'https://www.pingidentity.com/en/company/security-at-ping-identity.html',
      'aria-label': 'Security',
    },
  },
  {
    key: 'SMS Campaigns',
    text: 'SMS Campaigns',
    linkProps: {
      href: 'https://www.pingidentity.com/en/legal/pingmfa-campaign-terms-of-service.html',
      'aria-label': 'SMS Campaigns',
    },
  },
];

const testId = 'test-footer';
const org = 'Ping Identity';
const year = new Date().getFullYear();

const defaultProps = {
  'data-testid': testId,
};

const getComponent = (props: FooterProps = {}) => render(
  <Footer {...props} {...defaultProps}>
    <CopyrightText linkProps={{ href: '#', children: org }} />

    <FooterNav>
      {legalLinks.map(link => (
        <FooterNavItem key={link.key}>
          <Link variant="footerLink" {...link.linkProps}>{link.text}</Link>
        </FooterNavItem>
      ))}
    </FooterNav>
  </Footer>,
);

// Needs to be added to each components test file
universalComponentTests({ renderComponent: props => (
  <Footer {...props}>
    <CopyrightText linkProps={{ href: '#', children: org }} />

    <FooterNav>
      {legalLinks.map(link => (
        <FooterNavItem key={link.key}>
          <Link variant="footerLink" {...link.linkProps}>{link.text}</Link>
        </FooterNavItem>
      ))}
    </FooterNav>
  </Footer>
) });

test('default Footer', () => {
  getComponent();
  const footer = screen.getByTestId(testId);
  expect(footer).toBeInTheDocument();
  expect(footer).toBeInstanceOf(HTMLElement);
  expect(footer.tagName).toBe('FOOTER');
});

test('Footer have copyright text and year', () => {
  getComponent();
  const copyRightText = screen.getByText(org);
  expect(copyRightText).toBeInstanceOf(HTMLAnchorElement);
  expect(copyRightText).toHaveAttribute('href', '#');

  const footer = screen.getByTestId(testId);
  expect(footer).toHaveTextContent(`${year}`);
});

test('Footer have legal links', () => {
  getComponent();
  legalLinks.forEach(link => {
    const legalLink = screen.getByText(link.text);
    expect(legalLink).toBeInstanceOf(HTMLAnchorElement);
    expect(legalLink).toHaveAttribute('href', link.linkProps.href);
  });
});
