import { TokenType } from '../../shared/types';

export const Specification: Array<[RegExp, TokenType | null]> = [
    /**
     * Whitespaces
     */
    [/^\s+/, null],

    /**
     * One-line Comments
     */
    [/^\/\/.*/, null],

    /**
     * Multi-line Comments
     */
    [/^\/\*[\s\S]*?\*\//, null],

    /**
     * Number
     */
    [/\d+/, 'NUMBER'],

    /**
     * String
     */
    [/^"[^"]*"/, 'STRING'],
    [/^'[^']*'/, 'STRING'],
];
