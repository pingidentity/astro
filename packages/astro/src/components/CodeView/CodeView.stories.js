import React from 'react';
import CodeView from './CodeView';
import { Text } from '../..';

const code = `{
  "_links": {
    "self": {
      "href": "https://api.pingone.com/v1/environments/94e3268d-847d-47aa-a45e-1ef8dd8f4df0/users/5a5d4c0c-8383-4796-9cdc-16b5a22f45ad"
    },
    "password": {
      "href": "https://api.pingone.com/v1/environments/94e3268d-847d-47aa-a45e-1ef8dd8f4df0/users/5a5d4c0c-8383-4796-9cdc-16b5a22f45ad/password"
    },
    "password.set": {
      "href": "https://api.pingone.com/v1/environments/94e3268d-847d-47aa-a45e-1ef8dd8f4df0/users/5a5d4c0c-8383-4796-9cdc-16b5a22f45ad/password"
    },
    "password.reset": {
      "href": "https://api.pingone.com/v1/environments/94e3268d-847d-47aa-a45e-1ef8dd8f4df0/users/5a5d4c0c-8383-4796-9cdc-16b5a22f45ad/password"
    },
    "password.check": {
      "href": "https://api.pingone.com/v1/environments/94e3268d-847d-47aa-a45e-1ef8dd8f4df0/users/5a5d4c0c-8383-4796-9cdc-16b5a22f45ad/password"
    },
    "password.recover": {
      "href": "https://api.pingone.com/v1/environments/94e3268d-847d-47aa-a45e-1ef8dd8f4df0/users/5a5d4c0c-8383-4796-9cdc-16b5a22f45ad/password"
    },
    "account.sendVerificationCode": {
      "href": "https://api.pingone.com/v1/environments/94e3268d-847d-47aa-a45e-1ef8dd8f4df0/users/5a5d4c0c-8383-4796-9cdc-16b5a22f45ad"
    },
    "linkedAccounts": {
      "href": "https://api.pingone.com/v1/environments/94e3268d-847d-47aa-a45e-1ef8dd8f4df0/users/5a5d4c0c-8383-4796-9cdc-16b5a22f45ad/linkedAccounts"
    }
  },
  "id": "5a5d4c0c-8383-4796-9cdc-16b5a22f45ad",
  "environment": {
    "id": "94e3268d-847d-47aa-a45e-1ef8dd8f4df0"
  },
  "account": {
    "canAuthenticate": true,
    "status": "OK"
  },
  "createdAt": "2021-09-03T15:01:43.555Z",
  "email": "allegraweldon@pingidentity.com",
  "enabled": true,
  "identityProvider": {
    "type": "PING_ONE"
  },
  "lifecycle": {
    "status": "ACCOUNT_OK"
  },
  "mfaEnabled": false,
  "population": {
    "id": "c1adbc29-f188-4ea6-a015-49bddd74bc84"
  },
  "updatedAt": "2021-09-03T15:01:43.555Z",
  "username": "allegraweldon@pingidentity.com",
  "verifyStatus": "NOT_INITIATED"
}`;

export default {
  title: 'CodeView',
  component: CodeView,
  argTypes: {
    children: {
      defaultValue: code,
      table: {
        type: {
        },
      },
      control: {
        type: 'text',
      },
    },
  },
  parameters: {
    a11y: {
      config: {
        rules: [
          /* Turned off since rule conflicts with the way how `prism-react-renderer` works
           * and design specs */
          {
            id: 'scrollable-region-focusable',
            enabled: false,
            selector: '.prism-code',
          },
        ],
      },
    },
  },
};


export const Default = args => (
  <>
    <Text sx={{ fontWeight: 2 }}>JSON</Text>
    <CodeView {...args} />
  </>
);

export const WithLineNumbers = () => (
  <>
    <Text sx={{ fontWeight: 2 }}>JSON</Text>
    <CodeView hasLineNumbers>
      {/* const code =  `{
        "_links": {
          "self": {
            "href": "https://api.pingone.com/v1/environments/94e3268d-847d-47aa-a45e-1ef8dd8f4df0/users/5a5d4c0c-8383-4796-9cdc-16b5a22f45ad"
          }, ... */}
      {code}
    </CodeView>
  </>
);

WithLineNumbers.story = {
  parameters: {
    docs: {
      storyDescription: 'Please note that with adding line numbers, line wrapping does not work.',
    },
  },
};

export const WithCustomSize = () => (
  <>
    <CodeView language="javascript" sx={{ width: '100%', height: 300 }} hasNoCopyButton>
      {`
export const ChipWithIcon = () => (
  <>
    <Chip label="Chip with Icon Button" bg="navy">
      <IconButton aria-label="Clear Chip with Icon Button" variant="inverted">
        <Icon icon={Clear} ml="xs" size="14px" />
      </IconButton>
    </Chip>

    <div style={{ padding: '5px' }} />

    <Chip label="Chip with Icon Button">
      <IconButton aria-label="Clear Chip with Icon Button" variant="inverted">
        <Icon icon={Earth} ml="xs" size="14px" />
      </IconButton>
    </Chip>

    <div style={{ padding: '5px' }} />

    <Chip label="Chip with Icon" bg="green">
      <Icon icon={ContentCopy} ml="xs" size="14px" color="white" />
    </Chip>
  </>
);
    `}
    </CodeView>
  </>
);
