import CoreExplicitGrid, { ExplicitGridItem as CoreExplicitGridItem } from '@pingux/compass-core/lib/components/ExplicitGrid/emotion';
import { withCompassTheme } from '../../styles/useCompassTheme';

const ExplicitGrid = withCompassTheme(CoreExplicitGrid);
ExplicitGrid.defaultProps = {
    gap: 'md',
};

export const ExplicitGridItem = withCompassTheme(CoreExplicitGridItem);

export default ExplicitGrid;
