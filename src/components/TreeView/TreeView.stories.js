import React from 'react';

import DocsLayout from '../../../.storybook/storybookDocsLayout';
import { Item, TreeView, useTreeData } from '../../index';

import TreeViewReadMe from './TreeView.mdx';

export default {
  title: 'Experimental/TreeView',
  component: TreeView,
  parameters: {
    docs: {
      page: () => (
        <>
          <TreeViewReadMe />
          <DocsLayout />
        </>
      ),
      source: {
        type: 'code',
      },
    },
  },
};

const data = [
  {
    title: 'Policies',
    key: 'Policies',
    items: [
      {
        title: 'Registration',
        key: 'Registration',
        items: [
          {
            title: 'Registration A',
            key: 'Registration A',
          },
          {
            title: 'Registration B',
            key: 'Registration B',
            items: [
              {
                title: 'Registration B1',
                key: 'Registration B1',
              },
              {
                title: 'Registration B2',
                key: 'Registration B2',
              },
            ],
          },
          {
            title: 'Registration C',
            key: 'Registration C',
          },
          {
            title: 'Registration D',
            key: 'Registration D',
          },
        ],
      },
      {
        title: 'Authentication',
        key: 'Authentication',
        items: [
          {
            title: 'Authentication A',
            key: 'Authentication A',
          },
          {
            title: 'Authentication B',
            key: 'Authentication B',
          },
        ],
      },
    ],
  },
  {
    title: 'Other',
    key: 'Other',
    items: [{ title: 'Other A', key: 'Other A' }],
  },
  {
    key: 'Single Item',
    title: 'Single Item',
  },
];

export const Default = args => {
  const tree = useTreeData({
    initialItems: data,
    getKey: item => item.key,
    getChildren: item => item.items,
  });

  return (
    <TreeView {...args} items={tree.items} tree={tree} aria-label="Example Tree" disabledKeys={['Single Item']}>
      {section => (
        <Item
          key={section.key}
          items={section.children}
          title={section.value?.title}
        />
      )}
    </TreeView>
  );
};
