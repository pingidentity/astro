import { useEffect, useState } from 'react';

import { LabelModeProps } from '../../types';

interface UseColumnStylesProps {
  labelMode?: LabelModeProps;
}

interface LabelStyleProps {
  sx: { gridTemplateColumns: string };
}

const useColumnStyles = ({ labelMode }: UseColumnStylesProps): LabelStyleProps => {
  const [labelStyleProps, setLabelStyleProps] = useState<LabelStyleProps>({ sx: { gridTemplateColumns: '' } });

  useEffect(() => {
    if (labelMode === 'left') {
      setLabelStyleProps({ sx: { gridTemplateColumns: '40% auto' } });
    }
  }, [labelMode]);
  return labelStyleProps;
};

export default useColumnStyles;
