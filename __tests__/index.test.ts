import { describe, expect, it } from 'vitest';
import { Parser } from '../src';
import { unwrapString } from './utils/unwrap-string';

describe('Parser', () => {
    describe('NumberLiteral', () => {
        it('should parse number correctly', () => {
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

    describe('Ignore', () => {
        describe('whitespaces', () => {
            it('should ignore whitespaces around number', () => {
                const parser = new Parser();

                const program = '      1     ';

                const ast = parser.parse(program);

                expect(ast).toStrictEqual({
                    type: 'Program',
                    body: {
                        type: 'NumericLiteral',
                        value: 1,
                    },
                });
            });

            it('should ignore whitespaces around string', () => {
                const parser = new Parser();

                const program = '      "hi"     ';

                const ast = parser.parse(program);

                expect(ast).toStrictEqual({
                    type: 'Program',
                    body: {
                        type: 'StringLiteral',
                        value: 'hi',
                    },
                });
            });
        });
    });

    describe('Errors', () => {
        it('should fail by the end of input', () => {
            const parser = new Parser();

            const program = '';

            expect(() => parser.parse(program)).toThrowError('Unsupported token type.');
        });

        it('should fail by the end despite whitespace', () => {
            const parser = new Parser();

            const program = '    ';

            expect(() => parser.parse(program)).toThrowError('Unsupported token type.');
        });

        it('should fail if string does not have quote from backside', () => {
            const parser = new Parser();

            const program = '"Hi ';

            expect(() => parser.parse(program)).toThrowError('Unexpected token: "');
        });

        it('should fail if string does not have quote from frontside', () => {
            const parser = new Parser();

            const program = 'Hi"';

            expect(() => parser.parse(program)).toThrowError('Unexpected token: H');
        });

        it('should fail if string does not have quote from frontside despite whitespace', () => {
            const parser = new Parser();

            const program = '    Hi"';

            expect(() => parser.parse(program)).toThrowError('Unexpected token: H');
        });
    });
});
