import React from 'react';
import { Meta } from '@storybook/react';

import { Box } from '../index';

export default {
  title: 'Recipes/Vertical Onyx Stepper',
  parameters: {
    design: {
      type: 'figma',
      url: 'https://www.figma.com/design/a9J7ivUlwlbkudcAK5tWjZ/Access-Request-Phase-2?node-id=275-5789&m=dev',
    },
  },
} as Meta;

const VisualStep = ({ num, isLast = false, connectorHeight = 60 }: {
  /** The step number or label displayed in the circle */
  num: number | string;
  /** When true, the connector line below the step is hidden */
  isLast?: boolean;
  /** Height of the connector line. Default: 60 */
  connectorHeight?: string | number;
  children?: React.ReactNode;
}) => (
  <>
    <Box role="presentation" variant="stepper.step.default">
      {num}
    </Box>
    {!isLast && (
      <Box
        role="presentation"
        variant="stepper.line"
        className="is-default"
        sx={{
          '&.is-default': {
            height: `${connectorHeight}px`,
            maxHeight: `${connectorHeight}px`,
          },
        }}
      />
    )}
  </>
);

const defaultSteps = [{ num: 1 }, { num: 2 }, { num: 3 }];

export const Default = () => (
  <Box role="presentation" alignItems="center">
    {defaultSteps.map((step, index) => (
      <VisualStep key={step.num} num={step.num} isLast={index === defaultSteps.length - 1} />
    ))}
  </Box>
);

export const WithConnectorHeight = () => (
  <Box role="presentation" alignItems="center">
    {defaultSteps.map((step, index) => (
      <VisualStep
        key={step.num}
        num={step.num}
        isLast={index === defaultSteps.length - 1}
        connectorHeight={100}
      />
    ))}
  </Box>
);
