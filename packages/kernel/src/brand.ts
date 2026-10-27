declare const brand: unique symbol;

/** Nominal typing for primitives, e.g. `Brand<string, 'ContentId'>`. */
export type Brand<T, Name extends string> = T & { readonly [brand]: Name };
