import { Nullable } from '../shared/types';

interface TokenizerBase {
    getNextToken(): Nullable<{
        type: 'NUMBER';
        value: number;
    }>;
}

export class Tokenizer implements TokenizerBase {
    #string = '';
    #cursor = 0;

    private hasMoreTokens() {
        return this.#cursor < this.#string.length;
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
        if (!Number.isNaN(string[0])) {
            let token = '';

            console.log(Number.isNaN(string[this.#cursor]), 'string[this.#cursor]');

            // Looks like infinite loop here.
            while (!Number.isNaN(string[this.#cursor]) && this.hasMoreTokens()) {
                token += string[this.#cursor];
                this.#cursor++;
            }

            return {
                type: 'NUMBER',
                value: Number(token),
            } as const;
        }

        return null;
    }
}
