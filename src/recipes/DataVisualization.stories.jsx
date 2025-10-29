import React, { useMemo, useState } from 'react';
import { useAsyncList } from 'react-stately';
import ArrowCollapseRightIcon from '@pingux/mdi-react/ArrowCollapseRightIcon';
import EyeOutlineIcon from '@pingux/mdi-react/EyeOutlineIcon';
import TrayArrowDownIcon from '@pingux/mdi-react/TrayArrowDownIcon';

import {
  Box,
  Button,
  CheckboxField,
  DataTable,
  DataTableBody,
  DataTableCell,
  DataTableColumn,
  DataTableHeader,
  DataTableRow,
  Icon,
  Image,
  Item,
  RadioField,
  RadioGroupField,
  SearchField,
  SelectField,
  Separator,
  Text,
} from '../index';
import { placeholder } from '../utils/devUtils/constants/images';

export default {
  title: 'Recipes/Data Visualization with Filtering',
};

const columns = [
  { name: 'Country', key: 'country' },
  { name: 'Population', key: 'population' },
  { name: 'Continent', key: 'continent' },
];

const numberRanges = [
  { label: '0-100', numberLow: 0, numberHigh: 100000000 },
  { label: '100+', numberLow: 100000001, numberHigh: 1000000000000 },
];

const rows = [
  {
    id: 1,
    country: 'USA',
    population: 320000000,
    continent: 'North America',
  },
  {
    id: 2,
    country: 'Canada',
    population: 37000000,
    continent: 'North America',
  },
  { id: 3, country: 'China', population: 1398000000, continent: 'Asia' },
  { id: 4, country: 'France', population: 67000000, continent: 'Europe' },
  { id: 5, country: 'Mexico', population: 126000000, continent: 'South America' },
  { id: 6, country: 'Ethiopia', population: 120000000, continent: 'Africa' },
  { id: 7, country: 'Austria', population: 25000000, continent: 'Oceania' },
];

const ControlledCheckBoxGroup = props => {
  const {
    value,
    object,
    onChangeCallback,
    state,
  } = props;

  const onSelect = () => {
    if (state.includes(object)) {
      const newarr = state.filter(pop => pop !== object);
      onChangeCallback([...newarr]);
    } else {
      onChangeCallback([...state, object]);
    }
  };

  return (
    <CheckboxField
      isSelected={state.includes(object)}
      onChange={() => onSelect()}
      label={value}
      key={value}
      paddingBottom="5px"
    />
  );
};

const MemoizedCheckbox = React.memo(ControlledCheckBoxGroup);

const ControlledSelectField = props => {
  const {
    setSelectedContinent,
    selectedContinent,
  } = props;
  const handleSelectionChange = key => setSelectedContinent(key);

  return (
    <SelectField
      selectedKey={selectedContinent}
      onSelectionChange={handleSelectionChange}
      label="Filter by Continent"
      mb="lg"
      key="selectfield"
    >
      <Item key="North America">North America</Item>
      <Item key="South America">South America</Item>
      <Item key="Africa">Africa</Item>
      <Item key="Oceania">Oceania</Item>
      <Item key="Europe">Europe</Item>
      <Item key="Asia">Asia</Item>
      <Item key="All Continents">All Continents</Item>
    </SelectField>
  );
};

const ControlledRadioGroup = props => {
  const {
    state,
    callback,
  } = props;

  return (
    <RadioGroupField label="Filter by Continent" value={state} onChange={newValue => callback(newValue)} key="radioParent">
      <RadioField
        value="North America"
        label="North America"
        key="North America"
        pb="5px"
      />
      <RadioField
        value="South America"
        label="South America"
        key="South America"
        pb="5px"
      />
      <RadioField
        value="Africa"
        label="Africa"
        key="Africa"
        pb="5px"
      />
      <RadioField
        value="Oceania"
        label="Oceania"
        key="Oceania"
        pb="5px"
      />
      <RadioField
        value="Europe"
        label="Europe"
        key="Europe"
        pb="5px"
      />
      <RadioField
        value="Asia"
        label="Asia"
        key="Asia"
        pb="5px"
      />
      <RadioField
        value="All Continents"
        label="All Continents"
        key="All Continents"
        pb="5px"
      />
    </RadioGroupField>
  );
};

const SideBar = props => {
  const {
    selectedPopulationRanges,
    setSelectedPopulationRanges,
    selectedContinent,
    setSelectedContinent,
  } = props;
  return (
    <Box
      sx={{
        minWidth: '194px',
        overflowY: 'hidden',
        paddingLeft: '2px',
      }}
      isRow
      key="sidebarParent"
    >
      <Box
        sx={{
          width: '174px',
        }}
        key="filterParent"
      >
        <ControlledSelectField key="controlled selectfield" setSelectedContinent={setSelectedContinent} selectedContinent={selectedContinent} />
        <ControlledRadioGroup key="radioGroup" state={selectedContinent} callback={setSelectedContinent} />
        <Text mt="lg" key="populationRange" variant="label">Population Range</Text>
        {numberRanges.map(num => (
          <MemoizedCheckbox
            value={num.label}
            object={num}
            key={num.label}
            onChangeCallback={setSelectedPopulationRanges}
            state={selectedPopulationRanges}
          />
        ))}
      </Box>
      <Separator key="separator" orientation="vertical" sx={{ '&.is-vertical': { mx: 'md', my: 0 } }} />
    </Box>
  );
};

export const Default = args => {
  const [selectedContinent, setSelectedContinent] = useState('All Continents');
  const [selectedPopulationRanges, setSelectedPopulationRanges] = useState([]);

  const [filterText, setFilterText] = useState('');
  const list = useAsyncList({
    async load() {
      return { items: rows };
    },
  });

  const filteredItems = useMemo(() => list.items.filter(
    item => {
      if (!item.country.includes(filterText)) {
        return false;
      }

      if (selectedContinent !== 'All Continents' && selectedContinent !== item.continent) {
        return false;
      }

      const min = Math.min(...selectedPopulationRanges.map(range => range.numberLow));
      const max = Math.max(...selectedPopulationRanges.map(range => range.numberHigh));

      if (selectedPopulationRanges.length !== 0) {
        if (item.population > min && item.population < max) {
          return true;
        }
        return false;
      }
      return true;
    },
  ), [list.items, filterText, selectedContinent, selectedPopulationRanges]);

  const onChange = value => {
    setFilterText(value);
  };

  const CustomButton = ({ icon, label, iconTitle }) => {
    return (
      <Button variant="exampleText" ml="25px" pr="0px" pl="0px">
        <Box isRow alignItems="center">
          <Icon icon={icon} mr="sm" color="active" size={25} title={{ name: iconTitle }} />
          <Text sx={{ fontSize: 'md', fontWeight: 0, color: 'active' }}>{label}</Text>
        </Box>
      </Button>
    );
  };

  const CustomDataTable = () => {
    return (
      <DataTable {...args} aria-label="Static table" height="100%">
        <DataTableHeader columns={columns}>
          {column => (
            <DataTableColumn cellProps={{ pr: 'lg', pl: 'lg' }} align="center">{column.name}</DataTableColumn>
          )}
        </DataTableHeader>
        <DataTableBody items={filteredItems}>
          {item => (
            <DataTableRow>
              {columnKey => <DataTableCell cellProps={{ pr: 'lg', pl: 'lg' }}>{item[columnKey]}</DataTableCell>}
            </DataTableRow>
          )}
        </DataTableBody>
      </DataTable>
    );
  };

  return (
    <Box isRow>
      <SideBar
        key="sidebar"
        setSelectedPopulationRanges={setSelectedPopulationRanges}
        selectedPopulationRanges={selectedPopulationRanges}
        selectedContinent={selectedContinent}
        setSelectedContinent={setSelectedContinent}
      />
      <Box
        sx={{
          display: 'block',
          margin: 'md',
          minHeight: '317px',
          minWidth: '916px',
          width: '916px',
        }}
      >
        <Box>
          <Image
            alt="placeholder graph"
            src={placeholder}
          />
        </Box>
        <Box maxWidth="916px">
          <Box
            isRow
            sx={{
              pt: 'lg',
              pb: 'lg',
            }}
          >
            <SearchField onChange={onChange} value={filterText} aria-label="filter results" containerProps={{ sx: { width: '400px' } }} iconProps={{ size: 20 }} />
            <Box isRow sx={{ ml: 'auto', mr: '0px', alignItems: 'center', justifyContent: 'center' }}>
              <CustomButton label="Download Report" icon={TrayArrowDownIcon} iconTitle="Tray Arrow Down Icon" />
              <CustomButton label="Modify Columns" icon={EyeOutlineIcon} iconTitle="Eye Outline Icon" />
              <CustomButton label="Run Report" icon={ArrowCollapseRightIcon} iconTitle="Arrow Collapse Right Icon" />
            </Box>
          </Box>
          <Box>
            <CustomDataTable key="customDataTable" />
          </Box>
        </Box>
      </Box>
    </Box>
  );
};
