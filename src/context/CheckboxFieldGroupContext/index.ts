import { createContext } from 'react';
import { CheckboxGroupState } from 'react-stately';

/**
 * Selection state shared by the context-aware checkbox group items.
 *
 * This context is intentionally private to the compound component. Consumers
 * should render `CheckboxFieldGroupItem` inside `CheckboxFieldGroup` instead of
 * providing a state object themselves.
 */
export const CheckboxFieldGroupContext = createContext<CheckboxGroupState | null>(null);

export default CheckboxFieldGroupContext;
