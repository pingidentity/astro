import React from 'react';
import Prism from 'prismjs';
import { withDesign } from 'storybook-addon-designs';

import 'prismjs/components/prism-powershell';

import DocsLayout from '../../../.storybook/storybookDocsLayout';
import { CodeView } from '../../index';
import { FIGMA_LINKS } from '../../utils/designUtils/figmaLinks.js';

import CodeViewReadme from './CodeView.mdx';

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
  title: 'Components/CodeView',
  component: CodeView,
  decorators: [withDesign],
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
    Prism: {
      control: 'none',
    },
  },
  parameters: {
    docs: {
      page: () => (
        <>
          <CodeViewReadme />
          <DocsLayout />
        </>
      ),
    },
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
  <CodeView {...args} />
);

Default.parameters = {
  design: {
    type: 'figma',
    url: FIGMA_LINKS.codeView.default,
  },
};

export const WithLineNumbers = () => (
  <CodeView hasLineNumbers>
    {/* const code =  `{
        "_links": {
          "self": {
            "href": "https://api.pingone.com/v1/environments/94e3268d-847d-47aa-a45e-1ef8dd8f4df0/users/5a5d4c0c-8383-4796-9cdc-16b5a22f45ad"
          }, ... */}
    {code}
  </CodeView>
);

WithLineNumbers.parameters = {
  docs: {
    storyDescription: 'Please note that with adding line numbers, line wrapping does not work.',
  },
};

export const WithCustomSize = () => (
  <CodeView language="jsx" sx={{ width: '100%', height: 300 }} hasNoCopyButton>
    {`
const BadgeWithIcon = () => (
  <>
    <Badge label="Badge with Icon Button" bg="navy">
      <IconButton aria-label="Clear Badge with Icon Button" variant="inverted">
        <Icon icon={Clear} ml="xs" size="14px" title={{ name: 'Clear Icon' }} />
      </IconButton>
    </Badge>

    <div style={{ padding: '5px' }} />

    <Badge label="Badge with Icon Button">
      <IconButton aria-label="Clear Badge with Icon Button" variant="inverted">
        <Icon icon={Earth} ml="xs" size="14px" title={{ name: 'Earth Icon' }} />
      </IconButton>
    </Badge>

    <div style={{ padding: '5px' }} />

    <Badge label="Badge with Icon" bg="green">
      <Icon icon={ContentCopy} ml="xs" size="14px" color="white" title={{ name: 'Copy Icon' }} />
    </Badge>
  </>
);
    `}
  </CodeView>
);

export const WithAdditionalLanguage = () => {
  /**
   * import { CodeView } from "@pingux/astro";
   * import Prism from 'prismjs';
   * import 'prismjs/components/prism-powershell';
   */

  const powershellCode = `
   Get-WinEvent -FilterHashtable @{
     LogName='Application'
     ProviderName='*defrag'
   }
 `.trim();

  return (
    <CodeView language="powershell" Prism={Prism}>
      {powershellCode}
    </CodeView>
  );
};

WithAdditionalLanguage.parameters = {
  docs: {
    storyDescription: 'All available languages are listed [here](https://github.com/PrismJS/prism/tree/master/components).',
  },
};
