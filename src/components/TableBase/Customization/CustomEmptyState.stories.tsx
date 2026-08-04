import { Meta, StoryFn } from '@storybook/react-vite';

import DocsLayout from '../../../../.storybook/storybookDocsLayout';
import {
  Card,
  Cell,
  Column,
  Row,
  TableBase,
  TableBaseEmptyState,
  TBody,
  Text,
  THead,
} from '../../../index';
import { TableBaseProps } from '../../../types/tableBase';

export default {
  title: 'Components/TableBase/Customization',
  component: TableBase,
  parameters: {
    docs: {
      page: () => <DocsLayout />,
    },
  },
} as Meta;

const headers = [
  { key: 'name', name: 'Name' },
  { key: 'email', name: 'Email' },
  { key: 'status', name: 'Status' },
];

export const CustomEmptyState: StoryFn<TableBaseProps<object>> = () => (
  <Card variant="cards.tableWrapper">
    <TableBase
      caption="Custom empty state"
      aria-label="table with custom empty state"
      renderEmptyState={() => (
        <TableBaseEmptyState
          headerLabel="No resources found"
          descriptionLabel="Try adjusting your search or filters."
          addButtonLabel="Add Resource"
        />
      )}
    >
      <THead columns={headers}>
        {column => <Column key={column.key} minWidth={200}>{column.name}</Column>}
      </THead>
      <TBody items={[]}>
        {() => <Row key="unused">{() => <Cell><Text>-</Text></Cell>}</Row>}
      </TBody>
    </TableBase>
  </Card>
);
