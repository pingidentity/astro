import useDevelopmentWarning from '../useDevelopmentWarning';

interface UseAriaLabelWarning {

  /**
  * Provides a development-only console warning when a component
  * that needs an aria-label is mounted without one.
  */

  (component: string, ariaLabel?: string, shouldTrigger?: boolean): void;
}

const useAriaLabelWarning: UseAriaLabelWarning = (component, ariaLabel, shouldTrigger = true) => {
  const message = `${component} has an undefined aria-label. If the surrounding content sufficiently labels this component instance, you may disable this warning by setting the prop to \`null\`. Otherwise, please provide an appropriate aria-label. See more info here: https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Attributes/aria-label`;

  useDevelopmentWarning({ message, shouldTrigger: shouldTrigger && ariaLabel === undefined });
};

export default useAriaLabelWarning;
