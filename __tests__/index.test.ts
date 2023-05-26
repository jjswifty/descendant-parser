import { describe, expect, it } from 'vitest';
import { Parser } from '../src';

describe('Parser', () => {
    it('should parse number correctly', () => {
        console.log('awdjiawjdawdjaiwd');
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
