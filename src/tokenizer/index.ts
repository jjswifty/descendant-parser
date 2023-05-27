import { Nullable, Token } from '../shared/types';
import { Specification } from './specification';

interface TokenizerBase {
    getNextToken(): Nullable<Token>;
}

/**
 * Lazily pulls a token from a stream.
 */
export class Tokenizer implements TokenizerBase {
    #string = '';
    #cursor = 0;

    /**
     * Checks if there is any possible token
     * @private
     */
    private hasMoreTokens() {
        return this.#cursor < this.#string.length;
    }

    /**
     * Checks if cursor at the end of file.
     * @private
     */
    private isEOF() {
        return this.#cursor === this.#string.length;
    }

    private match(regExp: RegExp, string: string) {
        const matched = regExp.exec(string);

        if (!matched) {
            return null;
        }

        this.#cursor += matched[0].length;

        return matched[0];
    }
    /**
     * Initializes the string.
     */
    public init(string: string) {
        this.#string = string;
    }

    /**
     * Obtains next token
     */
    public getNextToken(): Nullable<Token> {
        if (!this.hasMoreTokens() || this.isEOF()) {
            return null;
        }

        const string = this.#string.slice(this.#cursor);

        for (const [regExp, tokenType] of Specification) {
            const tokenValue = this.match(regExp, string);

            if (!tokenValue) {
                continue;
            }

            /**
             * Ignore whitespaces
             */
            if (tokenType === null) {
                return this.getNextToken();
            }

            return {
                type: tokenType,
                value: tokenValue,
            };
        }

        throw new Error(`Unexpected token: ${string[0]}`);
    }
}
