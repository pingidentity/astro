import React from 'react';

import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableRow,
  Text,
} from '../../index';


export default {
  title: 'Components/Table',
  component: Table,
};

const caption = 'Populations of Countries';

const headers = [
  'Country', 'Population', 'Continent',
];

const objects = [
  {
    country: 'USA',
    population: '320,000,000',
    continent: 'North America',
  },
  {
    country: 'Canada',
    population: '37,000,000',
    continent: 'North America',
  },
  {
    country: 'China',
    population: '1,398,000,000',
    continent: 'Asia',
  },
  {
    country: 'France',
    population: '67,000,000',
    continent: 'Europe',
  },
];

export const Default = () => {
  return (
    <Table>
      <TableCaption>
        <Text fontWeight={3} fontSize="lg">{caption}</Text>
      </TableCaption>
      <TableHead>
        <TableRow key="head">
          {headers.map(head => (
            <TableCell isHeading key={head}>
              {head}
            </TableCell>
          ))}
        </TableRow>
      </TableHead>
      <TableBody>
        {objects.map(object => (
          <TableRow key={object.country}>
            {Object.values(object).map(value => (
              <TableCell key={value}>
                {value}
              </TableCell>
            ))}
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};
