import { describe, expect, it } from 'vitest';
import { Parser } from '../src';
import { unwrapString } from './utils/unwrap-string';

describe('Parser', () => {
    describe('NumberLiteral', () => {
        it('should parse correctly', () => {
            const parser = new Parser();

            const simpleProgram = '42';

            const ast = parser.parse(simpleProgram);

            expect(ast).toStrictEqual({
                type: 'Program',
                body: {
                    type: 'NumericLiteral',
                    value: 42,
                },
            });
        });
    });

    describe('StringLiteral', () => {
        it('should parse string correctly', () => {
            const parser = new Parser();

            const simpleProgram = '"hi"';

            const ast = parser.parse(simpleProgram);

            expect(ast).toStrictEqual({
                type: 'Program',
                body: {
                    type: 'StringLiteral',
                    value: unwrapString(simpleProgram),
                },
            });
        });
    });

    describe('Errors', () => {
        it('should fail by the end of input', () => {
            const parser = new Parser();

            const program = '';

            expect(() => parser.parse(program)).toThrowError('Unsupported token type.');
        });
    });
});
