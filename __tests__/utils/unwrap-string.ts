type WrappedString = `"${string}"`;

type UnwrapString<T extends WrappedString> = T extends `"${infer Str extends string}"`
    ? Str
    : never;

export const unwrapString = <T extends WrappedString>(str: T) =>
    str.slice(1, -1) as UnwrapString<T>;
