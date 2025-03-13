import React from 'react';
import { Meta, StoryFn } from '@storybook/react';
import Prism from 'prismjs';
import { withDesign } from 'storybook-addon-designs';

import DocsLayout from '../../../.storybook/storybookDocsLayout';
import { CodeView } from '../../index';
import { CodeViewProps } from '../../types/codeView';
import { FIGMA_LINKS } from '../../utils/designUtils/figmaLinks';

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
  args: {
    children: code,
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
} as Meta;

export const Default: StoryFn<CodeViewProps> = (args: CodeViewProps) => {
  return (
    <CodeView {...args} iconButtonProps={{ 'data-testid': 'custom_data_id' }} />
  );
};

Default.parameters = {
  design: {
    type: 'figma',
    url: FIGMA_LINKS.codeView.default,
  },
  a11y: {
    config: {
      rules: [{ id: 'color-contrast', enabled: false }],
    },
  },
};

export const WithLineNumbers: StoryFn = () => (
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
  a11y: {
    config: {
      rules: [{ id: 'color-contrast', enabled: false }],
    },
  },
};

export const WithCustomSize: StoryFn = () => (
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

WithCustomSize.parameters = {
  docs: {
    storyDescription: 'All available languages are listed [here](https://github.com/PrismJS/prism/tree/master/components).',
  },
  a11y: {
    config: {
      rules: [{ id: 'color-contrast', enabled: false }],
    },
  },
};

export const WithAdditionalLanguage: StoryFn = () => {
  const cssCode = `
  body {
    margin: 0;
    font-family: Roboto, sans-serif;
  }
  
  h1 {
    color: red;
    margin-left: 40px;
  }
 `.trim();

  return (
    <CodeView language="css" Prism={Prism}>
      {cssCode}
    </CodeView>
  );
};

WithAdditionalLanguage.parameters = {
  docs: {
    storyDescription: 'All available languages are listed [here](https://github.com/PrismJS/prism/tree/master/components).',
  },
  a11y: {
    config: {
      rules: [{ id: 'color-contrast', enabled: false }],
    },
  },
};

export const WithChangedCopiedValue: StoryFn<CodeViewProps> = (args: CodeViewProps) => (
  <CodeView textToCopy="Sed ut perspiciatis" {...args} />
);

WithChangedCopiedValue.parameters = {
  a11y: {
    config: {
      rules: [{ id: 'color-contrast', enabled: false }],
    },
  },
};

export const WithCustomLanguage: StoryFn = () => {
  const javaCode = `
  public class Factorial {
  public static void main(String[] args) {
    int num = 5;
    int factorial = 1;
    for (int i = 1; i <= num; i++) {
      factorial *= i;
    }
    System.out.println("Factorial of " + num + " is: " + factorial);
  }
}
 `.trim();

  const powershellCode = `
  Get-Process
  Get-Process -Name "notepad"
  Stop-Process -Name "notepad"
  Get-Service
  Start-Service -Name "service_name"
  Get-Date
  Get-Date -Format "yyyy-MM-dd HH:mm:ss"
  Get-WmiObject -Class Win32_OperatingSystem
  $env:COMPUTERNAME
 `.trim();

  return (
    <>
      <CodeView language="java" Prism={Prism}>
        {javaCode}
      </CodeView>
      <CodeView language="powershell" Prism={Prism}>
        {powershellCode}
      </CodeView>
    </>
  );
};

WithCustomLanguage.parameters = {
  a11y: {
    config: {
      rules: [{ id: 'color-contrast', enabled: false }],
    },
  },
};
