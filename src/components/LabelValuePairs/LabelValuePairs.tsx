import React, { forwardRef } from 'react';

import { Box } from '../../index';
import { LabelValuePairsProps } from '../../types';

import PairLabel from './LabelValuePairsLabel';
import Pair from './LabelValuePairsRow';
import PairSubvalue from './LabelValuePairsSubvalue';
import PairValue from './LabelValuePairsValue';

const displayName = 'LabelValuePairs';

const LabelValuePairs = forwardRef<HTMLElement, LabelValuePairsProps>((props, ref) => {
  const { children, ...others } = props;

  return (
    <Box
      ref={ref}
      variant="labelValuePairs.container"
      {...others}
    >
      {children}
    </Box>
  );
});

LabelValuePairs.displayName = displayName;

// The subcomponents are exported bare under a `Pair*` naming family (`Pair`, `PairLabel`,
// `PairValue`, `PairSubvalue`) as the primary, terser usage — the short `Row`/`Label` names
// can't be exported bare from the top-level barrel (`libs/astro/src/index.ts`) because they
// already resolve to unrelated exports there: `Label` (a form-label component) and `Row`
// (from react-stately). Prefixing sidesteps that collision. Static properties are also
// attached so the namespaced `<LabelValuePairs.Row>` / `.Label` / `.Value` / `.Subvalue`
// access keeps working; inside the namespace the short names are unambiguous.
const LabelValuePairsWithSubcomponents = LabelValuePairs as typeof LabelValuePairs & {
  Row: typeof Pair;
  Label: typeof PairLabel;
  Value: typeof PairValue;
  Subvalue: typeof PairSubvalue;
};

LabelValuePairsWithSubcomponents.Row = Pair;
LabelValuePairsWithSubcomponents.Label = PairLabel;
LabelValuePairsWithSubcomponents.Value = PairValue;
LabelValuePairsWithSubcomponents.Subvalue = PairSubvalue;

export default LabelValuePairsWithSubcomponents;
export {
  Pair, PairLabel, PairSubvalue, PairValue,
};
