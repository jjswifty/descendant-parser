import { AST, Nullable, NumericLiteral, StringLiteral, Token } from './shared/types';
import { Tokenizer } from './tokenizer';

export interface ParserProgram {
    parse(string: string): AST;
}

export class Parser implements ParserProgram {
    // #parsedString = '';
    #tokenizer: InstanceType<typeof Tokenizer>;
    #lookAhead: Nullable<Token> = null;

    constructor() {
        this.#tokenizer = new Tokenizer();
    }

    private StringLiteral(): StringLiteral {
        const token = this.eat('STRING');

        return {
            type: 'StringLiteral',
            value: token.value.toString().slice(1, -1),
        };
    }

    private NumericLiteral(): NumericLiteral {
        const token = this.eat('NUMBER');

        return {
            type: 'NumericLiteral',
            value: Number(token.value),
        };
    }

    private Literal() {
        switch (this.#lookAhead?.type) {
            case 'NUMBER':
                return this.NumericLiteral();
            case 'STRING':
                return this.StringLiteral();
            default:
                throw new Error('Unsupported token type.');
        }
    }

    private Program() {
        return {
            type: 'Program',
            body: this.Literal(),
        } as const;
    }

    private eat(tokenType: Token['type']) {
        const token = this.#lookAhead;

        if (token === null) {
            throw new Error(`Unexpected end of input. Expected: ${tokenType}`);
        }

        if (token.type !== tokenType) {
            throw new Error(`Unexpected token: ${token.value}, expected ${tokenType}`);
        }

        this.#lookAhead = this.#tokenizer.getNextToken();

        return token;
    }

    public parse(string: string) {
        // this.#parsedString = string;
        this.#tokenizer.init(string);

        this.#lookAhead = this.#tokenizer.getNextToken();

        return this.Program();
    }
}
