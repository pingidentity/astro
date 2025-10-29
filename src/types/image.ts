import { ImageProps as ThemeUIImageProps, ThemeUICSSObject } from 'theme-ui';

export interface ImageProps extends ThemeUIImageProps {
  /** Whether the image is disabled; applies disabled styling. */
  isDisabled?: boolean;
  /**  Load failure fault-tolerant src
   * We do recommend using JS File or Blob object as an src for the "fallbackImage".
   * Here is some documentation on how to create a blob image [https://developer.mozilla.org/en-US/docs/Web/API/Blob].
   * Also please note that URLs are accepted, but if the URL cannot be loaded,
   * the fallback image will not be rendered so it's not recommended.
   * */
  fallbackImage?: string | object;
  /**  Load failure fault-tolerant alt */
  fallbackAlt?: string;
  /**  Time in milliseconds that component should wait for a response from src address. */
  fallbackTimeout?: number;
  /** Inline styling prop for item */
  sx?: ThemeUICSSObject;
}
