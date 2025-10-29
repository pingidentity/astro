import React, { useEffect, useState } from 'react';
import { Item } from 'react-stately';
import PropTypes from 'prop-types';

import Box from '../components/Box';
import SelectField from '../components/SelectField';
import Text from '../components/Text';
import TextField from '../components/TextField';

import { flatColorList } from './colors';

const exactMatchThreshold = 0.02;
function Color({ name, hex, distanceFromReference, referenceColor }) {
  if (distanceFromReference < 0 || distanceFromReference > 1) {
    // eslint-disable-next-line no-console
    console.log(`Please check color distance logic. Value ${distanceFromReference} is outside range [0, 1]`);
  }
  return (
    <Box
      key={name}
      isRow
      gap={20}
      p="sm"
      sx={{
        alignItems: 'center',
        opacity: 1 - distanceFromReference,
        ':hover': {
          opacity: 1,
        },
      }}
    >
      <Box
        sx={{
          width: 100,
          height: 100,
          backgroundColor: name,
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <Box
          sx={{
            width: 50,
            height: 50,
            backgroundColor: name,
            ':hover': {
              backgroundColor: referenceColor,
            },
          }}
        />
      </Box>
      <Box>
        <Text variant="title">{name}</Text>
        {distanceFromReference <= exactMatchThreshold && (
          <Text variant="title" color="active">
            Exact match(&gt;
            {100 - Math.trunc(exactMatchThreshold * 100)}
            %)!
          </Text>
        )}
        {distanceFromReference > exactMatchThreshold && (
          <Text variant="subtitle">
            matchLevel:
            {' '}
            {100 - Math.trunc(distanceFromReference * 100)}
            %
          </Text>
        )}
        <Text variant="bodyWeak">
          {hex}
        </Text>
      </Box>
    </Box>
  );
}
Color.propTypes = {
  name: PropTypes.string.isRequired,
  hex: PropTypes.string.isRequired,
  distanceFromReference: PropTypes.number,
  referenceColor: PropTypes.string.isRequired,
};


const Colors = React.memo(({ distanceFromReferenceCb, referenceColor }) => {
  return (
    <Box gap={20}>
      {flatColorList
        .map(([name, hex]) => ({ name, hex, distance: distanceFromReferenceCb(hex) }))
        .sort(({ distance: distance1 }, { distance: distance2 }) => distance1 - distance2)
        .map(({ name, hex, distance }) => (
          <Color
            hex={hex}
            name={name}
            key={name}
            distanceFromReference={distance}
            referenceColor={referenceColor}
          />
        ))}
    </Box>
  );
});
Colors.propTypes = {
  distanceFromReferenceCb: PropTypes.func.isRequired,
  referenceColor: PropTypes.string.isRequired,
};

function hexToRgb(input) {
  let hex = input;
  if (!hex.match(/^#/)) {
    hex = `#${hex}`;
  }
  if (hex.length === 4) {
    hex = `#${hex[1]}${hex[1]}${hex[2]}${hex[2]}${hex[3]}${hex[3]}`;
  }
  return [
    hex.slice(1, 3),
    hex.slice(3, 5),
    hex.slice(5, 7),
  ].map(x => parseInt(x, 16));
}

function rgbToHsl(rgb) {
  let [r, g, b] = rgb;
  r /= 255;
  g /= 255;
  b /= 255;

  // Find greatest and smallest channel values
  const cmin = Math.min(r, g, b);
  const cmax = Math.max(r, g, b);
  const delta = cmax - cmin;
  let h;
  let s;
  let l;

  // Calculate hue
  if (delta === 0) {
    // No difference
    h = 0;
  } else if (cmax === r) {
    // Red is max
    h = ((g - b) / delta) % 6;
  } else if (cmax === g) {
    // Green is max
    // eslint-disable-next-line no-mixed-operators
    h = (b - r) / delta + 2;
  } else {
    // Blue is max
    // eslint-disable-next-line no-mixed-operators
    h = (r - g) / delta + 4;
  }

  h = Math.round(h * 60);

  // Make negative hues positive behind 360°
  if (h < 0) { h += 360; }

  // Calculate lightness
  l = (cmax + cmin) / 2;

  // Calculate saturation
  // eslint-disable-next-line no-mixed-operators
  s = delta === 0 ? 0 : delta / (1 - Math.abs(2 * l - 1));

  // Multiply l and s by 100
  s = +(s * 100).toFixed(1);
  l = +(l * 100).toFixed(1);
  return [h, s, l];
}

const matchers = {
  'RGB Average Diff': referenceValue => entry => {
    const rgb1 = hexToRgb(entry);
    const rgb2 = hexToRgb(referenceValue);
    // eslint-disable-next-line no-mixed-operators
    return (Math.abs(rgb1[0] - rgb2[0])
      // eslint-disable-next-line no-mixed-operators
      + Math.abs(rgb1[1] - rgb2[1])
      // eslint-disable-next-line no-mixed-operators
      + Math.abs(rgb1[2] - rgb2[2])) / (3 * 256);
  },
  'RGB distance': referenceValue => entry => {
    const rgb1 = hexToRgb(entry);
    const rgb2 = hexToRgb(referenceValue);
    // eslint-disable-next-line no-mixed-operators
    return Math.sqrt((rgb1[0] - rgb2[0]) ** 2
      // eslint-disable-next-line no-mixed-operators
      + (rgb1[1] - rgb2[1]) ** 2
      // eslint-disable-next-line no-mixed-operators
      + (rgb1[2] - rgb2[2]) ** 2) / (3 * 256);
  },
  'By Hue Difference': referenceValue => entry => {
    const h1 = rgbToHsl(hexToRgb(entry))[0];
    const h2 = rgbToHsl(hexToRgb(referenceValue))[0];
    const distance = Math.abs(h1 - h2);
    /*
    since hue is circle-like value from 0 to 359 degree
    we want to ensure 2 values of 1 and 359 would be treated as close
    */
    return Math.min(
      distance,
      360 - distance,
    ) / 180;
  },
};

export function ColorSchema() {
  const [inputValue, setInputValue] = useState('#FFFFFF');
  const [matcher, setMatcher] = useState(Object.keys(matchers)[0]);
  const [referenceColor, setReferenceColor] = useState('#FFFFFF');
  const filterCallback = React.useCallback(
    matchers[matcher](referenceColor),
    [referenceColor, matcher],
  );
  useEffect(() => {
    const timerId = setTimeout(() => {
      // let's debounce, re-rendering color list is heavy due to sorting
      setReferenceColor(inputValue);
    }, 300);
    return () => { clearTimeout(timerId); };
  }, [inputValue]);
  return (
    <Box p="md">
      <TextField
        label="Color to find"
        mb="lg"
        controlProps={{
          value: inputValue,
          onChange: ({ target: { value } }) => setInputValue(value),
        }}
      />
      <SelectField selectedKey={matcher} onSelectionChange={setMatcher} label="Desired method">
        {Object.keys(matchers).map(key => <Item key={key}>{key}</Item>)}
      </SelectField>
      <Colors
        distanceFromReferenceCb={filterCallback}
        referenceColor={referenceColor}
      />
    </Box>
  );
}
