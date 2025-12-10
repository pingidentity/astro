import React, {
  AriaAttributes,
  AriaRole as ReactAriaRole,
  DOMAttributes as ReactDOMAttributes,
  FocusEvent,
} from 'react';

export type AriaRole = ReactAriaRole

export interface FocusableElement extends Element, HTMLOrSVGElement {}
export type FocusEventHandler = (e: FocusEvent<Element>) => void

export interface DOMAttributes<T = FocusableElement> extends AriaAttributes, ReactDOMAttributes<T> {
  role?: AriaRole | undefined,
  className?: string | undefined,
}

export type ReactRef = React.Ref<HTMLElement>
export type ReactButtonRef = React.Ref<HTMLButtonElement>
