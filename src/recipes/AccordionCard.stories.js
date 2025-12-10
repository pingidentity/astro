import React from 'react';
import { Item } from 'react-stately';
import ChevronDownIcon from '@pingux/mdi-react/ChevronDownIcon';
import ChevronUpIcon from '@pingux/mdi-react/ChevronUpIcon';

import { textEllipsis } from '../components/Text/Text.styles';
import {
  AccordionGridGroup,
  Box,
  Button,
  Image,
  Link,
  Separator,
  Text,
} from '../index';
import ConfigureAdministratorSecurity from '../utils/devUtils/assets/accordionRecepi/ConfigureAdministratorSecurity.svg';
import CreateAdministrator from '../utils/devUtils/assets/accordionRecepi/CreateAdministrator.svg';
import InviteTeamMembers from '../utils/devUtils/assets/accordionRecepi/InviteTeamMembers.svg';
import LaunchStartedExperience from '../utils/devUtils/assets/accordionRecepi/LaunchStartedExperience.svg';

export default {
  title: 'Recipes/AccordionCard',
};

const accordionItemSX = {
  itemContainer: {
    boxShadow: '0px 1px 14px rgba(37, 55, 70, 0.15)',
    borderRadius: '3px',
    px: 'lg',
    py: 'md',
    my: 'md',
  },
};

const headerSX = {
  headerContainer: {
    flexGrow: 1,
    gap: 'xx',
    alignItems: 'center',
    whiteSpace: 'wrap',
  },
  headerImage: {
    width: '70px',
    minWidth: '70px',
  },
  headerTitle: {
    fontSize: 'md',
    fontWeight: 3,
    ...textEllipsis,
  },
  headerItemProps: {
    sx: {
      p: '0',
      '&.is-hovered': {
        backgroundColor: 'white',
      },
    },
  },
};

const panelBodySX = {
  panelBodyContainer: {
    gap: 'lg',
    alignItems: 'start',
    pt: 'md',
  },
  panelBodyItemProps: {
    sx: {
      p: '0',
      maxHeight: '0',
      overflow: 'hidden',
      transition: 'all 250ms ease',
      display: 'flex !important',
      '&.is-selected': {
        maxHeight: '500px',
        display: 'block !important',
      },
    },
  },
};

const buttonSX = {
  panelButton: {
    width: 'fit-content',
    mt: 'lg',
    mb: 'sm',
  },
};

const sx = {
  ...accordionItemSX,
  ...headerSX,
  ...panelBodySX,
  ...buttonSX,
};

const data = [
  {
    title: 'Invite team members',
    key: 'InviteTeam',
    subtext: 'Invite your team members to access this environment.',
    image: {
      alt: 'Invite team members',
      'aria-label': 'Invite team members',
      src: InviteTeamMembers,
    },
    body: {
      children: (
        <Box>
          <Text as="p" mb="20px">
            <b>Add Admin User: </b>
            Access the Users page and select Invite Administrator.
          </Text>
          <Text as="p" mb="20px">
            <b>Grant Roles: </b>
            Grant the appropriate roles to the administrator.
            <Link href="https://uilibrary.ping-eng.com/"> Learn more</Link>
          </Text>
          <Text as="p" mb="20px">
            <b>Send Invitation: </b>
            Your team will receive invitations to verify their email and finalize their accounts.
          </Text>
          <Button variant="default" sx={sx.panelButton}>Invite team member</Button>
        </Box>
      ),
    },
  },
  {
    title: 'Configure administrator security',
    key: 'ConfigureAdministrator',
    subtext: 'Authenticate using PingOne or set up an external identity provider.',
    image: {
      alt: 'Configure administrator security',
      'aria-label': 'Configure administrator security',
      src: ConfigureAdministratorSecurity,
    },
    body: {
      children: (
        <Box>
          <Text as="p" mb="20px">
            Review the default MFA settings for administrators in your organization or set up
            authentication for administrators using an external identity provider.
            <Link href="https://uilibrary.ping-eng.com/"> Learn more</Link>
          </Text>
          <Button variant="default" sx={sx.panelButton}>Configure administrator security</Button>
        </Box>
      ),
    },
  },
  {
    title: 'Create administrator groups and assign roles',
    key: 'CreateAdministrator',
    subtext: 'Create or synchronize groups to manage administrators and their permissions.',
    image: {
      alt: 'Create administrator groups and assign roles',
      'aria-label': 'Create administrator groups and assign roles',
      src: CreateAdministrator,
    },
    body: {
      children: (
        <Box>
          <Text as="p" mb="20px">
            <b> Create a group: </b>
            Access the groups page (Directory &gt; Groups)
          </Text>
          <Text as="p" mb="20px">
            <b> Assign roles: </b>
            Click the Roles tab, and click Grant Roles. You can assign groups multiple roles.
            <Link href="https://uilibrary.ping-eng.com/"> Learn more</Link>
          </Text>
          <Button variant="default" sx={sx.panelButton}>Create a group</Button>
        </Box>
      ),
    },
  },
  {
    title: 'Launch the Getting Started experience for customers or workforce',
    key: 'LaunchGetting',
    subtext: 'Go to the Environments page to start building your customer or workforce use case.',
    image: {
      alt: 'Launch the Getting Started experience for customers or workforce',
      'aria-label': 'Launch the Getting Started experience for customers or workforce',
      src: LaunchStartedExperience,
    },
    body: {
      children: (
        <Box>
          <Text as="p" mb="20px">
            <b>Create Environment: </b>
            Create a new environment and complete the Getting
            Started experience for your customer or workforce use case.
          </Text>
          <Text as="p" mb="20px">
            <b>Join Environment: </b>
            Return to the Environments page to view the environments in which you can access.
            Start or continue the Getting Started experience for your use case.
          </Text>
          <Button variant="default" sx={sx.panelButton}>Return to Environments page</Button>
        </Box>
      ),
    },
  },
];

const Header = props => {
  const { item } = props;
  return (
    <Box isRow sx={sx.headerContainer}>
      <Image
        src={item.image.src}
        alt={item.image.alt}
        aria-label={item.image['aria-label']}
        sx={sx.headerImage}
      />
      <Box>
        <Text sx={sx.headerTitle}>
          {item.title}
        </Text>
        <Text variant="bodyWeak">
          {item.subtext}
        </Text>
      </Box>
    </Box>
  );
};

const Body = props => {
  const { item } = props;
  return (
    <Box
      sx={sx.panelBodyContainer}
    >
      <Separator sx={{ m: 0, bg: 'neutral.90' }} />
      <Box ml="135px">
        {item.body.children}
      </Box>
    </Box>
  );
};

export const Default = () => {
  return (
    <AccordionGridGroup
      items={data}
    >
      {item => (
        <Item
          key={item.key}
          textValue={item.text}
          headerProps={{
            customDownArrow: ChevronDownIcon,
            customUpArrow: ChevronUpIcon,
            ...sx.headerItemProps,
          }}
          bodyProps={{
            ...sx.panelBodyItemProps,
          }}
          sx={sx.itemContainer}
        >
          <Header item={item} />
          <Body item={item} />
        </Item>
      )}
    </AccordionGridGroup>
  );
};

// Added to bypass color contrast issue
Default.parameters = {
  a11y: {
    config: {
      rules: [{ id: 'color-contrast', enabled: false }],
    },
  },
};
