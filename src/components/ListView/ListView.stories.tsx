import React, { Key, useRef, useState } from 'react';
import { useAsyncList } from 'react-stately';
import ClockTimeEightOutlineIcon from '@pingux/mdi-react/ClockTimeEightOutlineIcon';
import CogIcon from '@pingux/mdi-react/CogIcon';
import FormSelectIcon from '@pingux/mdi-react/FormSelectIcon';
import { action } from '@storybook/addon-actions';
import { Meta } from '@storybook/react';
import isChromatic from 'chromatic/isChromatic';

import DocsLayout from '../../../.storybook/storybookDocsLayout';
import { Box,
  Button,
  IconWrapperProps,
  Item,
  ListView,
  ListViewItem,
  ListViewItemChart,
  ListViewItemMenu,
  ListViewItemSwitchField,
  SearchField,
  Text } from '../..';
import { FIGMA_LINKS } from '../../utils/designUtils/figmaLinks';
import animals from '../../utils/devUtils/constants/animals';
import loadingStates from '../../utils/devUtils/constants/loadingStates';
import { chartData } from '../ListViewItem/controls/chart/chartData';

import ListViewReadme from './ListView.mdx';
import { listViewArgTypes } from './listViewAttributes';

export default {
  title: 'Components/ListView',
  component: ListView,
  parameters: {
    docs: {
      page: () => (
        <>
          <ListViewReadme />
          <DocsLayout />
        </>
      ),
    },
    codesandbox: false,
  },
  argTypes: {
    ...listViewArgTypes,
  },
  args: {
    disabledKeys: ['Snake'],
    // eslint-disable-next-line no-console
    onSelectionChange: console.log,
  },
} as Meta;

export interface ExampleItemProps {
  key: Key,
  name: string,
  textValue?: string,
  subtext?: string,
  id: string | number,
  hasSeparator?: boolean,
  icon?: React.ElementType,
  iconWrapperProps?: IconWrapperProps
}

const items: ExampleItemProps[] = [
  {
    key: 'Aardvark',
    name: 'Aardvark',
    id: '1',
    icon: CogIcon,
    iconWrapperProps: {
      size: 'sm',
      color: 'blue',
    },
  },
  {
    key: 'Kangaroo',
    name: 'Kangaroo',
    id: '2',
    icon: ClockTimeEightOutlineIcon,
    iconWrapperProps: {
      size: 'sm',
      color: 'green',
    },
  },
  {
    key: 'Snake',
    name: 'Snake',
    id: '3',
    icon: FormSelectIcon,
    iconWrapperProps: {
      size: 'sm',
      color: 'indigo',
    },
  },
];

const props = {
  disabledKeys: ['Snake'],
};

const actions = {
  onBlur: action('onBlur'),
  onFocus: action('onFocus'),
  onLoadMore: action('onLoadMore'),
};

const ExpandableChildren = () => {
  return (
    <Box sx={{ my: 'lg' }}>
      <SearchField maxWidth="400px" aria-label="Search" placeholder="Search" />
      <Text sx={{ mt: 'md', fontWeight: '1' }}>
        Lorem ipsum dolor sit amet consectetur.
        Viverra nulla nec velit sollicitudin sed nisi mi gravida.
        Maecenas vestibulum pretium dictum dictum tempus.
        Sit et rutrum hendrerit facilisi turpis tellus elementum.
        Egestas consectetur in ac id. Sit aliquam et ut pellentesque in at blandit sed.
        Sapien morbi cras eleifend lectus.
      </Text>
    </Box>
  );
};

const ExampleContent = contentProps => {
  const { text } = contentProps;
  return (
    <Box isRow sx={{ alignItems: 'center' }}>
      <Text variant="itemTitle">
        {text}
      </Text>
    </Box>
  );
};

const Controls = () => (
  <>
    <ListViewItemSwitchField />
    <ListViewItemMenu>
      <Item key="enable">Enable user</Item>
      <Item key="disable">Disable user</Item>
      <Item key="delete">Delete user</Item>
    </ListViewItemMenu>
  </>
);

export const Default = ({ ...args }) => (
  <ListView {...props} {...args} items={items}>
    {(item:ExampleItemProps) => (
      <Item key={item.name}>
        <ListViewItem
          data={{
            text: item.name,
            icon: item.icon,
          }}
          iconProps={{
            color: 'text.secondary',
          }}
          iconWrapperProps={item.iconWrapperProps}
        >
          <Controls />
        </ListViewItem>
      </Item>
    )}
  </ListView>
);

Default.parameters = {
  design: {
    type: 'figma',
    url: FIGMA_LINKS.listView.default,
  },
};

export const WithExpandableItems = ({ ...args }) => {
  return (
    <ListView {...props} {...args} items={items} selectionMode="expansion">
      {/* The first child inside of <Item> will render as the collapsed content, within the row
          The  Second child will render when expanded. */}
      {(item:ExampleItemProps) => (
        <Item key={item.name} textValue={item.name}>
          <ExampleContent text={item.name} />
          <ExpandableChildren />
        </Item>
      )}
    </ListView>
  );
};

WithExpandableItems.parameters = {
  design: {
    type: 'figma',
    url: FIGMA_LINKS.listView.withExpandableItems,
  },
};

export const ControlledExpandableItems = ({ ...args }) => {
  const [expandedKeys, setExpandedKeys] = useState<Array<Key>>(['Kangaroo']);

  const onExpandedKeyCallback = e => {
    setExpandedKeys(Array.from(e));
  };

  const expandAllKeys = () => {
    setExpandedKeys(items.map(_item => _item.key));
  };

  return (
    <Box>
      <Button onPress={() => { expandAllKeys(); }} mb="lg">Expand all</Button>
      <ListView
        {...props}
        {...args}
        items={items}
        expandedKeys={expandedKeys}
        onExpandedChange={onExpandedKeyCallback}
        selectionMode="expansion"
      >
        {(item: ExampleItemProps) => (
          <Item key={item.name} textValue={item.name}>
            <ExampleContent text={item.name} />
            <ExpandableChildren />
          </Item>
        )}
      </ListView>
    </Box>
  );
};

export const InfiniteLoadingList = args => {
  const getMockData = async (signal, cursor) => {
    let pageNumber = 1;
    if (cursor) {
      pageNumber = Number(cursor.substr(cursor.indexOf('-') + 1));
    }
    // With this we will emulate load even with mocked API, except for Chromatic runs
    if (!args.useMockData) {
      await new Promise(resolve => setTimeout(resolve, cursor ? 2000 : 3000));
    }

    return {
      items: animals.slice((pageNumber - 1) * 10, pageNumber * 10),
      cursor: `mock-${pageNumber + 1}`,
    };
  };
  const fetchApiData = async (signal, cursor, filterText) => {
    if (args.useMockData) return getMockData(null, null);

    try {
      // this race will throw an error if api won't respond in 3 seconds
      const res = await Promise.race([
        // If no cursor is available, then we're loading the first page,
        // filtering the results returned via a query string that
        // mirrors the ComboBox input text.
        // Otherwise, the cursor is the next URL to load,
        // as returned from the previous page.
        fetch(cursor || `https://swapi.dev/api/people/?search=${filterText}`, {
          signal,
        }),
        new Promise((_resolve, reject) => setTimeout(() => reject(new Error('timeout')), 3000),
        ),
      ]) as Response;
      const json = await res.json();
      // The API is too fast sometimes, so make it take longer so we can see the loader
      await new Promise(resolve => setTimeout(resolve, cursor ? 2000 : 3000));

      return {
        items: json.results,
        cursor: json.next,
      };
    } catch (e) {
      return getMockData(null, null);
    }
  };

  const list = useAsyncList({
    async load({ signal, cursor, filterText }) {
      if (cursor) {
        // eslint-disable-next-line
        cursor = cursor.replace(/^http:\/\//i, "https://");
      }

      // check if we are mocking pages
      if (cursor && cursor.includes('mock')) {
        return getMockData(signal, cursor);
      }
      return fetchApiData(signal, cursor, filterText);
    },
  });

  return (
    <Box
      sx={{
        height: '400px',
      }}
    >
      <ListView
        {...actions}
        items={(list.items as Iterable<ExampleItemProps>)}
        loadingState={list.loadingState}
        onLoadMore={list.loadMore}
      >
        {(item: ExampleItemProps) => (
          <Item key={item.name}>
            <ListViewItem
              data={{
                text: item.name,
                icon: FormSelectIcon,
              }}
              iconProps={{
                color: 'text.secondary',
              }}
            >
              <Controls />
            </ListViewItem>
          </Item>
        )}
      </ListView>
    </Box>
  );
};

InfiniteLoadingList.args = {
  useMockData: isChromatic(),
};

InfiniteLoadingList.parameters = {
  docs: {
    description: {
      story: 'Note: Keep in mind the maxHeight may impact when the scroll callback is triggered. If you notice it\'s being called too often, try adjusting that value or loading more objects to prevent this behavior.',
    },
  },
  design: {
    type: 'figma',
    url: FIGMA_LINKS.listView.infiniteLoadingList,
  },
};

export const WithCharts = ({ ...args }) => {
  const chartContainerRef = useRef();
  return (
    <ListView {...args} items={items}>
      {(item: ExampleItemProps) => (
        <Item key={item.name}>
          <ListViewItem
            ref={chartContainerRef}
            data={{
              text: item.name,
              subtext: item.subtext,
              icon: FormSelectIcon,
            }}
            iconProps={{
              color: 'text.secondary',
            }}
          >
            <ListViewItemChart
              containerRef={chartContainerRef}
              chartData={chartData}
              chartDataKey="fullData"
              title="Avg daily sign-ons:"
              contentCount="31"
              contentCountLabel="Past 7 days"
              chartLabel="12 wk trend"
              trend="+115.0%"
              tooltipText="See Contributing Data"
              ariaLabel={item.name}
            />
            <Controls />
          </ListViewItem>
        </Item>
      )}
    </ListView>
  );
};

WithCharts.parameters = {
  design: {
    type: 'figma',
    url: FIGMA_LINKS.listView.withCharts,
  },
  a11y: {
    config: {
      rules: [{ id: 'landmark-unique', enabled: false }],
    },
  },
};

export const OnLoadPrev = () => {
  const initialItems = new Array(10).fill({ key: 'string', name: 'string' }).map((_, index) => ({ name: `name: ${index}`, key: `name: ${index}`, id: index }));
  const [minNum, setMinNum] = useState(0);
  const [maxNum, setMaxNum] = useState(10);
  const [listItems, setListItems] = useState(initialItems);
  const [loadingState, setLoadingState] = useState(loadingStates.IDLE);

  const onLoadMore = async () => {
    setLoadingState(loadingStates.LOADING_MORE);
    await new Promise(resolve => setTimeout(resolve, 3000));
    const newItems = new Array(10).fill({ key: 'string', name: 'string' }).map((_, index) => ({ name: `name: ${maxNum + index}`, key: `name: ${maxNum + index}`, id: maxNum + index }));
    setMaxNum(maxNum + 10);
    setListItems([...listItems, ...newItems]);
    setLoadingState(loadingStates.IDLE);
  };

  const onLoadPrev = async () => {
    setLoadingState(loadingStates.LOADING_MORE_PREPEND);
    await new Promise(resolve => setTimeout(resolve, 3000));
    const newItems = new Array(10).fill({ key: 'string', name: 'string' }).map((_, index) => ({ name: `name: ${minNum - (index + 1)}`, key: `name: ${minNum - (index + 1)}`, id: minNum - (index + 1) }));
    setMinNum(minNum - 10);
    setListItems([...newItems, ...listItems]);
    setLoadingState(loadingStates.IDLE);
  };

  return (
    <Box
      sx={{
        height: '400px',
      }}
    >
      <ListView
        {...actions}
        items={(listItems as Iterable<ExampleItemProps>)}
        loadingState={loadingState}
        onLoadMore={onLoadMore}
        onLoadPrev={onLoadPrev}
      >
        {(item: ExampleItemProps) => (
          <Item key={item.name}>
            <ListViewItem
              data={{
                text: item.name,
                icon: FormSelectIcon,
              }}
            >
              <Controls />
            </ListViewItem>
          </Item>
        )}
      </ListView>
    </Box>
  );
};
