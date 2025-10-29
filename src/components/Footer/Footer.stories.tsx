import React from 'react';
import { fab } from '@fortawesome/free-brands-svg-icons';
import { far } from '@fortawesome/free-regular-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Meta, StoryFn } from '@storybook/react';
import { withDesign } from 'storybook-addon-designs';

import DocsLayout from '../../../.storybook/storybookDocsLayout';
import { Box, CopyrightText, Footer, FooterNav, FooterNavItem, Image, Link } from '../..';
import { FooterProps } from '../../types';
import { eAIcon } from '../../utils/devUtils/constants/images';

import FooterReadme from './Footer.mdx';

export default {
  title: 'Experimental/Footer',
  component: Footer,
  decorators: [withDesign],
  parameters: {
    layout: 'fullscreen',
    docs: {
      page: () => (
        <>
          <FooterReadme />
          <DocsLayout />
        </>
      ),
    },
  },
} as Meta;

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
];

const socialLinks = [
  {
    key: 'twitter',
    iconClass: fab.faXTwitter,
    linkProps: {
      href: 'https://twitter.com/pingidentity',
      'aria-label': 'Connect with us via X Social Media',
    },
  },
  {
    key: 'linkedin',
    iconClass: fab.faLinkedinIn,
    linkProps: {
      href: 'https://www.linkedin.com/company/ping-identity',
      'aria-label': 'Connect with us via LinkedIn',
    },
  },
  {
    key: 'facebook',
    iconClass: fab.faFacebookF,
    linkProps: {
      href: 'https://www.facebook.com/pingidentitypage',
      'aria-label': 'Connect with us via Facebook',
    },
  },
  {
    key: 'youtube',
    iconClass: fab.faYoutube,
    linkProps: {
      href: 'https://www.youtube.com/user/pingidentitytv',
      'aria-label': 'Connect with us via YouTube',
    },
  },
  {
    key: 'github',
    iconClass: fab.faGithub,
    linkProps: {
      href: 'https://github.com/pingidentity',
      'aria-label': 'Connect with us via Github',
    },
  },
  {
    key: 'mail',
    iconClass: far.faEnvelope,
    linkProps: {
      href: 'https://4.pingidentity.com/PreferenceCenter.html',
      'aria-label': 'Connect with us via Mail',
    },
  },
  {
    key: 'instagram',
    iconClass: fab.faInstagram,
    linkProps: {
      href: 'https://www.instagram.com/pingidentity',
      'aria-label': 'Connect with us via Instagram',
    },
  },
];

export const Default: StoryFn<FooterProps> = (args: FooterProps) => {
  return (
    // This Box is used to prevent the Footer from being cut off in the Storybook preview
    <Box overflow="hidden">
      <Footer {...args}>
        <Box
          alignItems="center"
          justifyContent="flex-start"
          variant="footer.footerLeftSection"
          flex="1 0 auto"
        >
          <CopyrightText linkProps={{ href: 'https://www.pingidentity.com', children: 'Ping Identity' }} />

          <Link
            variant="footerEALink"
            href="https://www.levelaccess.com/a/pingidentity"
          >
            <Image
              src={eAIcon}
              alt="Essential Accessibility Icon"
            />
          </Link>

          <FooterNav>
            {legalLinks.map(link => (
              <FooterNavItem key={link.key}>
                <Link variant="footerLink" {...link.linkProps}>{link.text}</Link>
              </FooterNavItem>
            ))}
          </FooterNav>
        </Box>

        <Box flex="1 0 auto">
          <FooterNav>
            {socialLinks.map(link => (
              <FooterNavItem key={link.key}>
                <Link variant="footerLink" {...link.linkProps}>
                  <FontAwesomeIcon icon={link.iconClass} size="lg" />
                </Link>
              </FooterNavItem>
            ))}
          </FooterNav>
        </Box>
      </Footer>
    </Box>
  );
};
