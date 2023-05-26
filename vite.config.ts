import { defineConfig } from 'vitest/config'
import eslintPlugin from "vite-plugin-eslint";

export default defineConfig({
    plugins: [
        { // default settings on build (i.e. fail on error)
            ...eslintPlugin({

            }),
            apply: 'build',
        },
        { // do not fail on serve (i.e. local development)
            ...eslintPlugin({
                failOnWarning: false,
                failOnError: false,
            }),
            apply: 'serve',
            enforce: 'post'
        }
    ],
})
