import { useEffect, useState } from 'react';

export type LabelMode = 'default' | 'float' | 'left';

interface UseColumnStylesProps {
  labelMode: LabelMode;
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
