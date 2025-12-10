export const isSafari = typeof navigator !== 'undefined' && !((
  navigator.userAgent.indexOf('Chrome') > -1)
  && (navigator.userAgent.indexOf('Safari') > -1)
);
