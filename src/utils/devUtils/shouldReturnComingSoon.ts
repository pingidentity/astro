import nextGenConvertedComponents, { componentSpecificNextGenBlacklist, nextGenOnlyComponents } from '../../styles/themes/next-gen/convertedComponentList';

import { themes } from './constants/themes';

export const shouldReturnComingSoon = (
  context,
  selectedTheme,
) => {
  const story = context.name;
  const component = context.title.split('/')[1];
  const isNextGenOnlyComponent = nextGenOnlyComponents.includes(component) || context.title.split('/')[0] === 'Onyx Recipes';
  const isStoryInNextGen = nextGenConvertedComponents.includes(component);

  if (isNextGenOnlyComponent
    && (selectedTheme === themes.NEXT_GEN || selectedTheme === themes.NEXT_GEN_DARK)) {
    return false;
  }

  // if a specific story has not been converted, return the coming soon message
  if (componentSpecificNextGenBlacklist[component]
    && componentSpecificNextGenBlacklist[component].includes(story)
    && (
      selectedTheme === themes.NEXT_GEN || selectedTheme === themes.NEXT_GEN_DARK)) {
    return true;
  }
  // if the component has NOT been converted, and the active theme is NextGen
  // return the coming soon message
  if ((isStoryInNextGen === false && isNextGenOnlyComponent === false) && (
    selectedTheme === themes.NEXT_GEN || selectedTheme === themes.NEXT_GEN_DARK)
  ) {
    return true;
  }
  // if the component is a NextGen ONLY component, and the selected theme is Astro,
  // return the coming soon message
  if (isNextGenOnlyComponent && (
    selectedTheme !== themes.NEXT_GEN && selectedTheme !== themes.NEXT_GEN_DARK)) {
    return true;
  }
  // else return the story.
  return false;
};
