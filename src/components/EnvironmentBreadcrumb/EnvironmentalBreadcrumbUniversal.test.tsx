import { universalComponentTests } from '../../utils/testUtils/universalComponentTest';

import { renderComponent, renderSectionsComponent } from './EnvironmentBreadcrumb.test';

universalComponentTests({ renderComponent });
universalComponentTests({ renderComponent: renderSectionsComponent });
