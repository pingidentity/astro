export type Modify<T, U> = Pick<T, Exclude<keyof T, keyof U>> & U;
