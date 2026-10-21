// Reading navigator.userAgent at module scope is an import-time side effect,
// but it is SSR-guarded and a pure read, so it does not defeat tree-shaking;
// the theme constants below depend on it. Exempted from
// no-import-time-side-effects for that reason.
/* eslint-disable @nx/workspace-no-import-time-side-effects -- see comment above */
export const isSafari = typeof navigator !== 'undefined' && !((
  navigator.userAgent.indexOf('Chrome') > -1)
  && (navigator.userAgent.indexOf('Safari') > -1)
);
/* eslint-enable @nx/workspace-no-import-time-side-effects */
