import React from 'react';

import { Box, Separator, Table, TableBody, TableCell, TableHead, TableRow, Text } from '../..';
import { fontSizes, fontWeights } from '../../styles/text';


export default {
  title: 'Docs/Design/Typography',
};

const tableBodyStyles = {
  border: 'unset',
};

const tableRowStyles = {
  backgroundColor: 'transparent !important',
};


export const TypographyTokens = () => {
  return (
    <>
      <>
        <Text variant="sectionTitle">Font Sizes</Text>
        <Separator mb="sm" />
        <Table width="75%">
          <TableHead>
            <TableRow key="head">
              <TableCell isHeading>
                Token
              </TableCell>
              <TableCell isHeading>
                Size
              </TableCell>
              <TableCell isHeading>
                Example
              </TableCell>
            </TableRow>
          </TableHead>
          {Object.entries(fontSizes).map(([key, value]) => (
            <TableBody sx={tableBodyStyles} key={key}>
              <TableRow sx={tableRowStyles}>
                <TableCell><Text fontSize={value}>{key}</Text></TableCell>
                <TableCell><Text fontSize={value}>{value}</Text></TableCell>
                <TableCell>
                  <Text fontSize={value}>
                    &lt;Text fontSize=&#123;
                    {key}
                    &#125; /&gt;
                  </Text>
                </TableCell>
              </TableRow>
            </TableBody>
          ),
          )}
        </Table>
      </>
      <>
        <Text variant="sectionTitle" mt="xx">Font Weights</Text>
        <Separator mb="sm" />
        <Table width="75%">
          <TableHead>
            <TableRow key="head">
              <TableCell isHeading>
                Token
              </TableCell>
              <TableCell isHeading>
                Size
              </TableCell>
              <TableCell isHeading>
                Example
              </TableCell>
            </TableRow>
          </TableHead>
          {Object.entries(fontWeights).map(([key, value]) => (
            <TableBody sx={tableBodyStyles} key={key}>
              <TableRow sx={tableRowStyles}>
                <TableCell><Text fontWeight={value}>{key}</Text></TableCell>
                <TableCell><Text fontWeight={value}>{value}</Text></TableCell>
                <TableCell>
                  <Text fontWeight={value}>
                    &lt;Text fontWeight=&#123;
                    {key}
                    &#125; /&gt;
                  </Text>
                </TableCell>
              </TableRow>
            </TableBody>
          ),
          )}
        </Table>
      </>
      <>
        <Text variant="sectionTitle" mt="xx">Text Colors</Text>
        <Separator mb="sm" />
        <Table width="75%">
          <TableHead>
            <TableRow key="head">
              <TableCell isHeading>
                Token
              </TableCell>
              <TableCell isHeading>
                Color
              </TableCell>
              <TableCell isHeading>
                Example
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody sx={tableBodyStyles}>
            <TableRow sx={tableRowStyles}>
              <TableCell>
                <Box isRow>
                  <Box width="30px" height="30px" bg="text.primary" mr="xs" />
                  <Text alignSelf="center">text.primary</Text>
                </Box>
              </TableCell>
              <TableCell alignSelf="center"><Text>neutral.10</Text></TableCell>
              <TableCell alignSelf="center"><Text color="text.primary">&lt;Text textColor=&#123;text.primary&#125; /&gt;</Text></TableCell>

            </TableRow>
            <TableRow sx={tableRowStyles}>
              <TableCell>
                <Box isRow>
                  <Box width="30px" height="30px" bg="text.secondary" mr="xs" />
                  <Text alignSelf="center">text.secondary</Text>
                </Box>
              </TableCell>
              <TableCell alignSelf="center"><Text>neutral.40</Text></TableCell>
              <TableCell alignSelf="center"><Text color="text.secondary">&lt;Text color=&#123;text.secondary&#125; /&gt;</Text></TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </>
    </>
  );
};
