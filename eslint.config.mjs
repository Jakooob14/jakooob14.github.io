import { defineConfig, globalIgnores } from 'eslint/config';
import nextVitals from 'eslint-config-next/core-web-vitals';
import nextTs from 'eslint-config-next/typescript';
import stylistic from '@stylistic/eslint-plugin';

const eslintConfig = defineConfig([
    ...nextVitals,
    ...nextTs,
    // Override default ignores of eslint-config-next.
    globalIgnores([
        // Default ignores of eslint-config-next:
        '.next/**',
        'out/**',
        'build/**',
        'next-env.d.ts',
    ]),
    {
        plugins: {
            '@stylistic': stylistic
        },
        rules: {
            '@typescript-eslint/no-explicit-any': 'warn',
            'eqeqeq': ['error', 'always'],
            '@stylistic/quotes': ['error', 'single'],
            '@stylistic/quote-props': ['error', 'consistent-as-needed'],
            '@stylistic/jsx-quotes': ['error', 'prefer-single'],
            '@stylistic/object-curly-spacing': ['error', 'always'],
            '@stylistic/semi': ['error', 'always'],
            '@typescript-eslint/no-empty-object-type': 'warn'
        }
    }
]);

export default eslintConfig;