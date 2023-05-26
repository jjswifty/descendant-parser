export type Nullable<T> = null | T;

export type NumericLiteral = {
    type: 'NumericLiteral';
    value: number;
};

export type StringLiteral = {
    type: 'StringLiteral';
    value: string;
};

export type Literal = NumericLiteral | StringLiteral;

export interface AST {
    type: 'Program';
    body: Literal;
}

type NumberToken = {
    type: 'NUMBER';
    value: number;
};

type StringToken = {
    type: 'STRING';
    value: string;
};

export type Token = NumberToken | StringToken;
