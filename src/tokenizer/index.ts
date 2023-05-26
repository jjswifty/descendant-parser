import { Nullable, Token } from '../shared/types';

interface TokenizerBase {
    getNextToken(): Nullable<Token>;
}

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

    /**
     * Initializes the string.
     */
    public init(string: string) {
        this.#string = string;
    }

    /**
     * Obtains next token
     */
    public getNextToken() {
        if (!this.hasMoreTokens()) {
            return null;
        }

        const string = this.#string.slice(this.#cursor);

        /** Number */
        if (!Number.isNaN(Number(string[0]))) {
            let token = '';

            while (!Number.isNaN(string[this.#cursor]) && !this.isEOF()) {
                token += string[this.#cursor];
                this.#cursor++;
            }

            return {
                type: 'NUMBER',
                value: Number(token),
            } as const;
        }

        /** String */
        if (string[0] === '"') {
            let token = '';
            // Collect string including quotes ("hello")
            do {
                token += string[this.#cursor++];
            } while (string[this.#cursor] !== '"' && !this.isEOF());

            token += string[this.#cursor++]; // also collect '"' symbol.

            return {
                type: 'STRING',
                value: token,
            } as const;
        }

        return null;
    }
}
