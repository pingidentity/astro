import React, { useState } from 'react';
import Filter from '@pingux/mdi-react/FilterIcon';
import ShuffleVariant from '@pingux/mdi-react/ShuffleVariantIcon';

import { tab } from '../components/Tabs/Tabs.style';
import {
  Box,
  Icon,
  Separator,
  Tab,
  Tabs,
  Text,
} from '../index';


export default {
  title: 'Recipes/Logo Tabs',
};

const P14CLogo = props => (
  <svg id="Layer_1" data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" aria-labelledby="p14c-logo-icon-title" {...props}>
    <title id="p14c-logo-icon-title">P14C Logo Icon</title>
    <defs />
    <path className="cls-1" d="M2.63,54.68a13.63,13.63,0,0,1,2.63-4.54,12.08,12.08,0,0,1,4.2-3,13.72,13.72,0,0,1,5.6-1.1,13.71,13.71,0,0,1,5.62,1.1,12.09,12.09,0,0,1,4.18,3,13.63,13.63,0,0,1,2.63,4.54,17.21,17.21,0,0,1,.91,5.65,16.62,16.62,0,0,1-.91,5.53,13.27,13.27,0,0,1-2.63,4.46,12,12,0,0,1-4.18,3,13.71,13.71,0,0,1-5.62,1.09,13.72,13.72,0,0,1-5.6-1.09,11.93,11.93,0,0,1-4.2-3,13.27,13.27,0,0,1-2.63-4.46,16.62,16.62,0,0,1-.91-5.53A17.21,17.21,0,0,1,2.63,54.68Zm5.46,9a8.88,8.88,0,0,0,1.27,2.91,6.49,6.49,0,0,0,2.28,2.07,7,7,0,0,0,3.42.78,7,7,0,0,0,3.42-.78,6.49,6.49,0,0,0,2.28-2.07A8.88,8.88,0,0,0,22,63.65a13.53,13.53,0,0,0,.4-3.32,14.63,14.63,0,0,0-.4-3.46,9,9,0,0,0-1.27-3,6.36,6.36,0,0,0-2.28-2.09A7,7,0,0,0,15.06,51a7,7,0,0,0-3.42.78,6.36,6.36,0,0,0-2.28,2.09,9,9,0,0,0-1.27,3,14.63,14.63,0,0,0-.4,3.46A13.53,13.53,0,0,0,8.09,63.65Z" />
    <path className="cls-1" d="M38.39,46.65l11.33,18.2h.07V46.65h5.59V73.78h-6L38.13,55.62h-.08V73.78H32.46V46.65Z" />
    <path className="cls-1" d="M80.91,46.65v5H66.59v5.82H79.74v4.63H66.59v6.65H81.22v5H60.62V46.65Z" />
    <path className="cls-1" d="M27.93,21.48a3.19,3.19,0,0,0-1.15-2.17,3.79,3.79,0,0,0-2.39-.74A4.93,4.93,0,0,0,23,18.8a3.35,3.35,0,0,0-1.38.84,4.71,4.71,0,0,0-1.05,1.71,8.11,8.11,0,0,0-.42,2.86,9,9,0,0,0,.22,1.92,5.49,5.49,0,0,0,.73,1.71,3.9,3.9,0,0,0,1.27,1.22,3.63,3.63,0,0,0,1.89.46,3.47,3.47,0,0,0,2.48-.93A4.38,4.38,0,0,0,27.93,26h3.42a7.52,7.52,0,0,1-2.29,4.64,7,7,0,0,1-4.82,1.6A7.91,7.91,0,0,1,21,31.61a6.76,6.76,0,0,1-2.36-1.68,7.15,7.15,0,0,1-1.45-2.54,9.9,9.9,0,0,1-.5-3.18,10.86,10.86,0,0,1,.48-3.27,7.47,7.47,0,0,1,1.44-2.65A6.67,6.67,0,0,1,21,16.52a8,8,0,0,1,3.34-.65,9.38,9.38,0,0,1,2.57.35,6.59,6.59,0,0,1,2.15,1A5.41,5.41,0,0,1,30.63,19a6,6,0,0,1,.72,2.49Z" />
    <path className="cls-1" d="M11.5,11.5H62.68a11.4,11.4,0,0,1,2-4H7.5v31h4Z" />
    <polygon className="cls-1" points="88.5 26 88.5 88.47 11.5 88.47 11.5 81.78 7.5 81.78 7.5 92.5 92.5 92.5 92.5 26 88.5 26" />
    <path className="cls-2" d="M73.85,9h-.06a5.52,5.52,0,0,0,0,11H93.1a6.9,6.9,0,1,0,0-13.79h0A10,10,0,0,0,73.85,9Z" />
  </svg>
);

const GoogleLogo = props => (
  <svg x="0px" y="0px" viewBox="0 0 100 100" aria-labelledby="google-logo-icon-title" {...props}>
    <title id="google-logo-icon-title">Google Logo Icon</title>
    <g>
      <path
        style={{ fill: '#4285F4' }}
        d="M92.1,50.9c0-3.5-0.3-6.1-0.9-8.8H50.9v15.9h23.7c-0.5,4-3.1,9.9-8.8,13.9l-0.1,0.5l12.8,9.9l0.9,0.1
        C87.4,75.1,92.1,64,92.1,50.9"
      />
      <path
        style={{ fill: '#34A853' }}
        d="M50.9,93c11.6,0,21.3-3.8,28.5-10.4L65.8,72c-3.6,2.5-8.5,4.3-14.9,4.3c-11.4,0-21-7.5-24.4-17.9l-0.5,0
        L12.7,68.8l-0.2,0.5C19.5,83.3,34.1,93,50.9,93"
      />
      <path
        style={{ fill: '#FBBC05' }}
        d="M26.4,58.5C25.5,55.8,25,52.9,25,50c0-3,0.5-5.8,1.4-8.5l0-0.6L12.9,30.5l-0.4,0.2C9.6,36.5,7.9,43.1,7.9,50
        s1.7,13.5,4.6,19.3L26.4,58.5"
      />
      <path
        style={{ fill: '#EB4335' }}
        d="M50.9,23.6c8.1,0,13.5,3.5,16.6,6.4l12.1-11.8C72.2,11.3,62.5,7,50.9,7c-16.8,0-31.3,9.6-38.4,23.7l13.9,10.8
        C29.9,31.1,39.5,23.6,50.9,23.6"
      />
    </g>
  </svg>
);

const sx = {
  container: {
    display: 'inline-flex !important',
    position: 'relative',
    width: '500px',
  },
  separator: {
    position: 'absolute',
    top: '25%',
    backgroundColor: 'accent.70',
  },
  logoTabsStyling: {
    display: 'inline-flex !important',
    '& > div': {
      borderStyle: 'none',
      borderBottomWidth: '0px !important',
      justifyContent: 'space-between',
    },
  },
  tabStyling: {
    ...tab,
    alignSelf: 'center',
    '& > svg': {
      borderWidth: 1,
      borderStyle: 'dashed',
      borderColor: 'neutral.70',
      borderRadius: 4,
      bg: 'white',
      outline: '5px solid white',
    },
    '&.is-selected > svg': {
      borderWidth: 1,
      borderStyle: 'solid',
      borderColor: 'active',
      borderRadius: 4,
      bg: 'white',
      outline: '5px solid white',
    },
    // we only want the change the color of icon svgs to active not company logos
    '&.is-selected > .mdi-icon > path': {
      fill: 'active',
    },
    '& > [role="presentation"]': {
      height: '0px',
    },
    '&.is-selected': {
      mb: '4px',
    },
  },
};

export const Default = () => {
  const [currentTab, setCurrentTab] = useState('tab1');
  const [showMiddleTabs, setShowMiddleTabs] = useState(false);
  return (
    <Box sx={sx.container}>
      <Separator sx={sx.separator} />
      <Tabs
        sx={sx.logoTabsStyling}
        selectedKey={currentTab}
        onSelectionChange={setCurrentTab}
        onClick={setShowMiddleTabs}
      >
        <Tab
          key="tab1"
          title={<Text mt="md" variant="tabLabel">Source</Text>}
          icon={<Icon icon={P14CLogo} size={65} color="#eb4c15" p="sm" />}
          sx={sx.tabStyling}
        >
          <Text>This is content for the source tab</Text>
        </Tab>
        {/* If both tabs are rendered together a fragment is required,
        but this throws an error within Tabs, hence the repetitive logic
        for conditionally rendering tabs 2 & 3 */}
        {(showMiddleTabs || currentTab !== 'tab1') && (
          <Tab
            key="tab2"
            title={<Text mt="md" variant="tabLabel">Custom Filter</Text>}
            icon={<Icon icon={Filter} size={40} color="accent.20" p="xs" title={{ name: 'Filter Icon' }} />}
            sx={sx.tabStyling}
          >
            <Text>This is content for the custom filter tab</Text>
          </Tab>
        )}
        {(showMiddleTabs || currentTab !== 'tab1') && (
          <Tab
            key="tab3"
            title={<Text mt="md" variant="tabLabel">Attribute Mapping</Text>}
            icon={<Icon icon={ShuffleVariant} size={40} color="accent.20" p="xs" title={{ name: 'Shuffle Variant Icon' }} />}
            sx={sx.tabStyling}
          >
            <Text>This is content for attribute mapping tab</Text>
          </Tab>
        )}
        <Tab
          key="tab4"
          title={<Text mt="md" variant="tabLabel">Target</Text>}
          icon={<Icon icon={GoogleLogo} size={65} p="sm" />}
          sx={sx.tabStyling}

        >
          <Text>This is content for the target tab</Text>
        </Tab>
      </Tabs>
    </Box>
  );
};
