import { universalComponentTests } from '../../utils/testUtils/universalComponentTest';

import { renderComponent, renderSectionsComponent } from './EnvironmentBreadcrumb.test';

const runUniversalComponentTests = async () => {
  await universalComponentTests({ renderComponent });

  await universalComponentTests({ renderComponent: renderSectionsComponent });
};

runUniversalComponentTests();
