import { AST, Nullable, NumericLiteral, Token } from './shared/types';
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

    private NumericLiteral(): NumericLiteral {
        const token = this.eat('NUMBER');

        return {
            type: 'NumericLiteral',
            value: token.value,
        };
    }

    private Program() {
        return {
            type: 'Program',
            body: this.NumericLiteral(),
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
