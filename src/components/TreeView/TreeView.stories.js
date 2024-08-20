import React, { useEffect, useState } from 'react';

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
    a11y: {
      config: {
        rules: [
          /* Turned off since dynamic parent and children getting added on treegrid role
           * and design specs */
          {
            id: 'aria-required-parent',
            enabled: false,
          },
          {
            id: 'aria-required-children',
            enabled: false,
          },
        ],
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

const initialAsyncItems = [
  {
    title: 'Item1',
    items: [],
  },
  {
    title: 'Item2',
    items: [],
  },
  {
    title: 'Item3',
  },
  {
    title: 'Item4',
    items: [],
  },
  {
    title: 'Item5',
    items: [],
  },
  {
    title: 'Item6',
    items: [],
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

export const AsyncLoading = args => {
  const [expandedKeys, setExpandedKeys] = useState(new Set([]));
  const [childNode, setChildNode] = useState(1);

  const [loadingNodes, setLoadingNodes] = useState([]);

  const getMockData = async () => {
    setChildNode(childNode + 1);

    // emulate loading state
    await new Promise(resolve => setTimeout(resolve, childNode ? 2000 : 3000));

    return [
      { title: `Child Node ${childNode}`, items: [] },
      { title: `Single Node ${childNode}` },
    ];
  };

  const tree = useTreeData({
    initialItems: initialAsyncItems,
    getKey: item => item.title,
    getChildren: item => item.items,

  });

  const handleExpand = async node => {
    if (expandedKeys.size < 0 || expandedKeys.size < node.size) {
      const expandedNode = Array.from(node).pop();
      if (tree.getItem(expandedNode)?.children?.length <= 0) {
        setLoadingNodes([...loadingNodes, { node: expandedNode, loadingState: true }]);

        const list = await getMockData();

        list.forEach(item => {
          tree.insert(expandedNode, 1, item);
        });

        setExpandedKeys(node);
      }
    } else if (expandedKeys.size > node.size) {
      setExpandedKeys(node);
    }
  };

  useEffect(() => {
    loadingNodes.forEach((item, index) => {
      const isFulfilled = tree.getItem(item.node)?.children?.length > 0;

      if (isFulfilled) {
        const tempArray = [...loadingNodes];

        tempArray.splice(index, 1, {
          node: item.node,
          loadingState: false,
        });
        setLoadingNodes(tempArray);
      }
    });
  }, [expandedKeys]);

  return (
    <TreeView
      {...args}
      items={tree.items}
      tree={tree}
      onExpandedChange={handleExpand}
      loadingNodes={loadingNodes}
    >
      {section => (

        <Item
          key={section.key}
          items={section.children}
          title={section.value.title}
          hasChildren={section.value.items && true}
        />

      )}
    </TreeView>
  );
};
