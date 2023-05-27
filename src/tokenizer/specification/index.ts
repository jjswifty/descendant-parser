import { TokenType } from '../../shared/types';

export const Specification: Array<[RegExp, TokenType | null]> = [
    /**
     * Number
     */
    [/\d+/, 'NUMBER'],

    /**
     * String
     */
    [/^"[^"]*"/, 'STRING'],
    [/^'[^']*'/, 'STRING'],

    /**
     * Whitespaces
     */
    [/^\s+/, null],
];
