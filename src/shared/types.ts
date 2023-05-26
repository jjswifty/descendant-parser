export type Nullable<T> = null | T;

type BasicLiteral<T> = {
    type: string;
    value: T;
};

export type NumericLiteral = BasicLiteral<number>;

export interface AST {
    type: 'Program';
    body: NumericLiteral;
}

type NumberToken = {
    type: 'NUMBER';
    value: number;
};

export type Token = NumberToken;
