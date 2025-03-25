import React, { useEffect, useState } from 'react';
import { useAsyncList } from 'react-stately';
import { useCollator } from '@react-aria/i18n';
import { action } from '@storybook/addon-actions';

import DocsLayout from '../../../.storybook/storybookDocsLayout';
import {
  Box,
  DataTable,
  DataTableBadge,
  DataTableBody,
  DataTableCell,
  DataTableColumn,
  DataTableHeader,
  DataTableMenu,
  DataTableRow,
} from '../../index';
import { ariaAttributeBaseArgTypes } from '../../utils/docUtils/ariaAttributes';

import DataTableReadme from './DataTable.mdx';

export default {
  title: 'Components/DataTable',
  component: DataTable,
  parameters: {
    docs: {
      page: () => (
        <>
          <DataTableReadme />
          <DocsLayout />
        </>
      ),
      source: {
        type: 'code',
      },
    },
  },
  argTypes: {
    density: {
      control: {
        disable: true,
      },
    },
    overflowMode: {
      control: {
        disable: true,
      },
    },
    selectedKeys: {
      description: 'The array of keys that is currently selected. (Controlled version).',
      control: {
        disable: true,
      },
    },
    disabledKeys: {
      description: 'The array of keys that are unabled to be selected.',
      control: {
        disable: true,
      },
    },
    defaultSelectedKeys: {
      description: 'The array of keys that is selected by default. (Uncontrolled version).',
      control: {
        disable: true,
      },
    },
    onSelectionChange: {
      description: 'A callback function that fires when the selection changes.',
      control: {
        disable: true,
      },
    },
    selectionMode: {
      description: 'Options are "none" and "single". Whether or not the DataTable support selection',
      control: {
        disable: true,
      },
    },
    width: {
      description: 'Sets the width of the data table.',
      control: {
        disable: true,
      },
    },
    height: {
      description: 'Sets the height of the data table.',
      control: {
        disable: true,
      },
    },
    sortDescriptor: {
      description: 'Defines the current column key to sort by and the sort direction.',
      control: {
        disable: true,
      },
    },
    onSortChange: {
      description: 'Callback function that fires when sortable column header is pressed.',
    },
    allowsSorting: {
      description: 'Determine if the column supports sorting.',
      control: {
        disable: true,
      },
    },
    hideHeader: {
      description: 'Determine if the header should be hidden.',
      control: {
        disable: true,
      },
    },
    loadingState: {
      description: 'Reflects current loading state.',
      control: {
        disable: true,
      },
    },
    onLoadMore: {
      description: 'Callback function that fires when more data should be loaded on demand as user scrolls.',
    },
    items: {
      control: {
        disable: true,
      },
      description: 'The list of DataTable items.',
    },
    ...ariaAttributeBaseArgTypes,
  },
  args: {
    density: 'spacious',
    overflowMode: 'truncate',
  },
};

const getHeaderProps = () => ({
  sx: {
    fontWeight: '3',
  },
});

const getCellProps = (columnKey, align) => ({
  pr: columnKey !== 'menu' ? 'lg' : 0,
  pl: columnKey === 'timestamp' || columnKey === 'menu' ? 0 : 'lg',
  hideHeader: columnKey === 'menu',
  align,
});

export const Default = args => {
  const date = '2023-05-03';
  const time = '07:16:30 pm UTC';

  const timestampCell = (
    <>
      <Box>{date}</Box>
      <Box>{time}</Box>
    </>
  );

  const columns = [
    { name: 'Timestamp', key: 'timestamp' },
    { name: 'Event Type', key: 'eventType' },
    { name: 'Description', key: 'description' },
    { name: 'Status', key: 'status' },
    { name: 'User Identity', key: 'userIdentity' },
    { name: 'Menu', key: 'menu' },
  ];

  const rows = [
    {
      id: 1,
      timestamp: timestampCell,
      eventType: 'User Access Allowed',
      description: (
        <Box>Passed Role Access Control</Box>
      ),
      status: <DataTableBadge cell="Approved" />,
      userIdentity: 'Vincent Diep',
      menu: <DataTableMenu />,
    },
    {
      id: 2,
      timestamp: timestampCell,
      eventType: 'User Access Denied',
      description: (
        <Box display="-webkit-box" variant="dataTable.truncateText">
          Passed Role Access Control Words Words Words Words Words Words Words Words
          Words Words Words Words Words Words
        </Box>
      ),
      status: <DataTableBadge cell="Rejected" />,
      userIdentity: 'Vincent Diep',
      menu: <DataTableMenu />,
    },
    {
      id: 3,
      timestamp: timestampCell,
      eventType: 'User Access Allowed',
      description: (
        <Box display="-webkit-box" variant="dataTable.truncateText">
          Words Words Words Words Words Words Words Words Words Words Words
          Words Words Words Words Words Words Words Words Words
        </Box>
      ),
      status: <DataTableBadge cell="Approved" />,
      userIdentity: 'Vincent Diep',
      menu: <DataTableMenu />,
    },
    {
      id: 4,
      timestamp: timestampCell,
      eventType: 'User Access Allowed',
      description: (
        <Box>Passed Role Access Control</Box>
      ),
      status: <DataTableBadge cell="Approved" />,
      userIdentity: 'Vincent Diep',
      menu: <DataTableMenu />,
    },
    {
      id: 5,
      timestamp: timestampCell,
      eventType: 'User Access Allowed',
      description: (
        <Box>Passed Role Access Control</Box>
      ),
      status: <DataTableBadge cell="Approved" />,
      userIdentity: 'Vincent Diep',
      menu: <DataTableMenu />,
    },
  ];

  return (
    <DataTable
      {...args}
      aria-label="Static table"
      height="100%"
    >
      <DataTableHeader columns={columns}>
        {column => (
          <DataTableColumn
            {...getCellProps(column.key, false)}
            {...getHeaderProps()}
            minWidth={column.key !== 'menu' ? 175 : 32}
            width={column.key !== 'menu' ? '19.4%' : 32}
          >
            {column.name}
          </DataTableColumn>
        )}
      </DataTableHeader>
      <DataTableBody items={rows}>
        {item => (
          <DataTableRow>
            {columnKey => (
              <DataTableCell
                {...getCellProps(columnKey, false)}
              >
                {item[columnKey]}
              </DataTableCell>
            )}
          </DataTableRow>
        )}
      </DataTableBody>
    </DataTable>
  );
};

// Added to bypass color contrast issue due to virtualizer
Default.parameters = {
  a11y: {
    config: {
      rules: [{ id: 'color-contrast', enabled: false }],
    },
  },
};

export const Dynamic = args => {
  const columns = [
    { name: 'Country', key: 'country' },
    { name: 'Population', key: 'population' },
    { name: 'Continent', key: 'continent' },
  ];

  const rows = [
    {
      id: 1,
      country: 'USA',
      population: '320,000,000',
      continent: 'North America',
    },
    {
      id: 2,
      country: 'Canada',
      population: '37,000,000',
      continent: 'North America',
    },
    { id: 3, country: 'China', population: '1,398,000,000', continent: 'Asia' },
    { id: 4, country: 'France', population: '67,000,000', continent: 'Europe' },
    { id: 5, country: 'Mexico', population: '126,000,000', continent: 'North America' },
    { id: 6, country: 'Ethiopia', population: '120,000,000', continent: 'Africa' },
    { id: 7, country: 'Austria', population: '25,000,000', continent: 'Oceania' },
  ];

  const list = useAsyncList({
    async load() {
      return {
        items: rows,
      };
    },
  });

  return (
    <DataTable
      {...args}
      aria-label="Dynamic table"
      density="compact"
      scale="medium"
    >
      <DataTableHeader columns={columns}>
        {column => (
          <DataTableColumn
            {...getCellProps(column.key, 'center')}
            minWidth={155}
          >
            {column.name}

          </DataTableColumn>
        )}
      </DataTableHeader>
      <DataTableBody items={list.items}>
        {item => (
          <DataTableRow>
            {columnKey => (
              <DataTableCell
                {...getCellProps(columnKey, 'left')}
              >
                {item[columnKey]}
              </DataTableCell>
            )}
          </DataTableRow>
        )}
      </DataTableBody>
    </DataTable>
  );
};

// Added to bypass color contrast issue due to virtualizer
Dynamic.parameters = {
  a11y: {
    config: {
      rules: [{ id: 'color-contrast', enabled: false }],
    },
  },
};

export const Sortable = args => {
  const [firstSortFlag, setFirstSortFlag] = useState(true);

  const columns = [
    { name: 'Country', key: 'country', isSortable: true },
    { name: 'Population', key: 'population', isSortable: true },
    { name: 'Continent', key: 'continent', isSortable: true },
  ];

  const rows = [
    { id: 1, country: 'Austria', population: '25,000,000', continent: 'Oceania' },
    {
      id: 2,
      country: 'Canada',
      population: '37,000,000',
      continent: 'North America',
    },
    { id: 3, country: 'China', population: '1,398,000,000', continent: 'Asia' },
    { id: 4, country: 'Ethiopia', population: '120,000,000', continent: 'Africa' },
    { id: 5, country: 'France', population: '67,000,000', continent: 'Europe' },
    { id: 6, country: 'Mexico', population: '126,000,000', continent: 'North America' },
    {
      id: 7,
      country: 'USA',
      population: '320,000,000',
      continent: 'North America',
    },
  ];

  const collator = useCollator({ numeric: true });

  const list = useAsyncList({
    async load() {
      return {
        items: rows,
      };
    },
    async sort({ items, sortDescriptor }) {
      const getNumericValue = str => {
        return !Number.isNaN(str) && parseFloat(str.replace(/,/g, ''));
      };

      return {
        items: items.sort((a, b) => {
          if (sortDescriptor.column) {
            const first = a[sortDescriptor.column];
            const second = b[sortDescriptor.column];

            const firstNumericValue = getNumericValue(first);
            const secondNumericValue = getNumericValue(second);

            const cmp = (firstNumericValue && secondNumericValue)
              ? firstNumericValue - secondNumericValue
              : collator.compare(first, second);

            return (sortDescriptor.direction === 'descending') ? -cmp : cmp;
          }
          return 1;
        }),
      };
    },
  });

  useEffect(() => {
    if (firstSortFlag && !list.isLoading && list.items.length > 0) {
      list.sort({
        column: 'country',
        direction: 'ascending',
      });
      setFirstSortFlag(false);
    }
  }, [firstSortFlag, list, list.isLoading, list.items]);

  return (
    <DataTable
      {...args}
      aria-label="Sortable table"
      sortDescriptor={list.sortDescriptor}
      onSortChange={list.sort}
      density="compact"
      scale="medium"
    >
      <DataTableHeader columns={columns}>
        {column => (
          <DataTableColumn
            {...getCellProps(column.key, 'center')}
            allowsSorting
            minWidth={155}
          >
            {column.name}

          </DataTableColumn>
        )}
      </DataTableHeader>
      <DataTableBody items={list.items}>
        {item => (
          <DataTableRow>
            {columnKey => (
              <DataTableCell
                {...getCellProps(columnKey, false)}
              >
                {item[columnKey]}
              </DataTableCell>
            )}
          </DataTableRow>
        )}
      </DataTableBody>
    </DataTable>
  );
};

// Added to bypass color contrast issue due to virtualizer
Sortable.parameters = {
  a11y: {
    config: {
      rules: [{ id: 'color-contrast', enabled: false }],
    },
  },
};


export const Selection = args => {
  const columns = [
    { name: 'Country', key: 'country' },
    { name: 'Population', key: 'population' },
    { name: 'Continent', key: 'continent' },
  ];

  const rows = [
    {
      id: 1,
      country: 'USA',
      population: '320,000,000',
      continent: 'North America',
    },
    {
      id: 2,
      country: 'Canada',
      population: '37,000,000',
      continent: 'North America',
    },
    { id: 3, country: 'China', population: '1,398,000,000', continent: 'Asia' },
    { id: 4, country: 'France', population: '67,000,000', continent: 'Europe' },
    { id: 5, country: 'Mexico', population: '126,000,000', continent: 'North America' },
    { id: 6, country: 'Ethiopia', population: '120,000,000', continent: 'Africa' },
    { id: 7, country: 'Austria', population: '25,000,000', continent: 'Oceania' },
  ];

  return (
    <DataTable
      {...args}
      aria-label="Dynamic table"
      density="compact"
      scale="medium"
      selectionMode="single"
      disabledKeys={[3]}
      defaultSelectedKeys={[1]}
    >
      <DataTableHeader columns={columns}>
        {column => (
          <DataTableColumn
            {...getCellProps(column.key, 'center')}
            minWidth={155}
          >
            {column.name}

          </DataTableColumn>
        )}
      </DataTableHeader>
      <DataTableBody items={rows}>
        {item => (
          <DataTableRow>
            {columnKey => (
              <DataTableCell
                {...getCellProps(columnKey, 'left')}
              >
                {item[columnKey]}
              </DataTableCell>
            )}
          </DataTableRow>
        )}
      </DataTableBody>
    </DataTable>
  );
};

// Added to bypass color contrast issue due to virtualizer
Selection.parameters = {
  a11y: {
    config: {
      rules: [{ id: 'color-contrast', enabled: false }],
    },
  },
};

export const ControlledSelection = args => {
  const [selectedKeys, setSelectedKeys] = useState([2]);
  const columns = [
    { name: 'Country', key: 'country' },
    { name: 'Population', key: 'population' },
    { name: 'Continent', key: 'continent' },
  ];

  const rows = [
    {
      id: 1,
      country: 'USA',
      population: '320,000,000',
      continent: 'North America',
    },
    {
      id: 2,
      country: 'Canada',
      population: '37,000,000',
      continent: 'North America',
    },
    { id: 3, country: 'China', population: '1,398,000,000', continent: 'Asia' },
    { id: 4, country: 'France', population: '67,000,000', continent: 'Europe' },
    { id: 5, country: 'Mexico', population: '126,000,000', continent: 'North America' },
    { id: 6, country: 'Ethiopia', population: '120,000,000', continent: 'Africa' },
    { id: 7, country: 'Austria', population: '25,000,000', continent: 'Oceania' },
  ];

  const list = useAsyncList({
    async load() {
      return {
        items: rows,
      };
    },
  });

  return (
    <DataTable
      {...args}
      aria-label="Dynamic table"
      density="compact"
      scale="medium"
      selectionMode="single"
      disabledKeys={[3]}
      selectedKeys={selectedKeys}
      onSelectionChange={setSelectedKeys}
    >
      <DataTableHeader columns={columns}>
        {column => (
          <DataTableColumn
            {...getCellProps(column.key, 'center')}
            minWidth={155}
          >
            {column.name}

          </DataTableColumn>
        )}
      </DataTableHeader>
      <DataTableBody items={list.items}>
        {item => (
          <DataTableRow>
            {columnKey => (
              <DataTableCell
                {...getCellProps(columnKey, 'left')}
              >
                {item[columnKey]}
              </DataTableCell>
            )}
          </DataTableRow>
        )}
      </DataTableBody>
    </DataTable>
  );
};

// Added to bypass color contrast issue due to virtualizer
ControlledSelection.parameters = {
  a11y: {
    config: {
      rules: [{ id: 'color-contrast', enabled: false }],
    },
  },
};

export const AsyncLoading = args => {
  /**
   * isChromatic checks if the code is running in Chromatic environment
   * @returns {Boolean}
   * Source: https://www.chromatic.com/docs/ischromatic
   * */

  const columns = [
    { name: 'Name', key: 'name' },
    { name: 'Height', key: 'height' },
    { name: 'Mass', key: 'mass' },
    { name: 'Birth Year', key: 'birth_year' },
  ];

  const list = useAsyncList({
    async load({ signal, cursor }) {
      if (cursor) {
        // eslint-disable-next-line no-param-reassign
        cursor = cursor.replace(/^http:\/\//i, 'https://');
      }

      const res = await fetch(
        cursor || 'https://swapi.py4e.com/api/people/?search=',
        { signal },
      );
      const json = await res.json();

      await new Promise(resolve => setTimeout(resolve, cursor ? 2000 : 3000));

      return {
        items: json.results,
        cursor: json.next,
      };
    },
  });

  return (
    <DataTable
      {...args}
      aria-label="Custom content table"
      onAction={action('onAction')}
      density="compact"
      scale="medium"
    >
      <DataTableHeader columns={columns}>
        {column => (
          <DataTableColumn
            {...getCellProps(column.key, false)}
            minWidth={155}
          >
            {column.name}
          </DataTableColumn>
        )}
      </DataTableHeader>
      <DataTableBody
        items={list.items as Iterable<{ name: string }>}
        loadingState={list.loadingState}
        onLoadMore={list.loadMore}
      >
        {(item: { name: string }) => (
          <DataTableRow key={item.name}>
            {columnKey => (
              <DataTableCell
                {...getCellProps(columnKey, false)}
              >
                {item[columnKey]}
              </DataTableCell>
            )}
          </DataTableRow>
        )}
      </DataTableBody>
    </DataTable>
  );
};

// Added to bypass color contrast issue due to virtualizer
AsyncLoading.parameters = {
  a11y: {
    config: {
      rules: [{ id: 'color-contrast', enabled: false }],
    },
  },
};
