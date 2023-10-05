import React from 'react';

import DocsLayout from '../../../.storybook/storybookDocsLayout';
import { Item, Section, TreeView, useTreeData } from '../../index';

import { SectionOrItemRender } from './TreeView';
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
    items: [
      {
        title: 'Registration',
        items: [
          {
            title: 'Registration A',
          },
          {
            title: 'Registration B',
            items: [
              { title: 'Registration B1' },
              { title: 'Registration B2' },
            ],
          },
          {
            title: 'Registration C',
          },
          {
            title: 'Registration D',
          },
        ],
      },
      {
        title: 'Authentication',
        items: [
          {
            title: 'Authentication A',
          },
          {
            title: 'Authentication B',
          },
        ],
      },
    ],
  },
  {
    title: 'Other',
    items: [{ title: 'Other A' }],
  },
  {
    title: 'Single Item',
  },
];

export const Default = args => {
  const tree = useTreeData({
    initialItems: data,
    getKey: item => item.title,
    getChildren: item => item.items,
  });

  return (
    <TreeView {...args} items={tree.items} tree={tree}>
      {section => (
        SectionOrItemRender(
          section.children.length > 0,
          <Section
            key={section.key}
            items={section.children}
            title={section.value.title}
          />,
          <Item key={section.key} title={section.title} />,
        )
      )}
    </TreeView>
  );
};
