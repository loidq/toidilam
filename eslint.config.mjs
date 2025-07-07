// @ts-check
import eslint from '@eslint/js'
import importPlugin from 'eslint-plugin-import'
import eslintPluginPrettierRecommended from 'eslint-plugin-prettier/recommended'
import globals from 'globals'
import tseslint from 'typescript-eslint'

export default tseslint.config(
  {
    ignores: ['eslint.config.mjs', '**/dist/**', '**/node_modules/**', '**/prisma/**'],
  },
  eslint.configs.recommended,
  ...tseslint.configs.recommendedTypeChecked,
  eslintPluginPrettierRecommended,
  {
    languageOptions: {
      globals: {
        ...globals.node,
        ...globals.jest,
      },
      sourceType: 'module',
      parserOptions: {
        projectService: true,
        tsconfigRootDir: import.meta.dirname,
      },
    },
    plugins: {
      import: importPlugin,
    },
  },
  {
    rules: {
      'prettier/prettier': 'off',
      '@typescript-eslint/require-await': 'off', // Bắt buộc sử dụng async/await khi có hàm async
      '@typescript-eslint/no-unsafe-assignment': 'off', // Tắt cảnh báo khi gán giá trị không an toàn
      '@typescript-eslint/no-unsafe-call': 'off', // Tắt cảnh báo khi gọi hàm không an toàn
      '@typescript-eslint/no-unsafe-member-access': 'off', // Tắt cảnh báo khi truy cập thành viên không an toàn
      '@typescript-eslint/no-unsafe-return': 'off', // Tắt cảnh báo khi trả về giá trị không an toàn

      '@typescript-eslint/no-explicit-any': 'off', // Cảnh báo khi sử dụng any
      '@typescript-eslint/no-floating-promises': 'error', // Bắt buộc xử lý promise
      '@typescript-eslint/no-unsafe-argument': 'warn', // Cảnh báo khi truyền đối số không an toàn
      '@typescript-eslint/no-unused-vars': ['warn', { argsIgnorePattern: '^_' }], // Cảnh báo khi có biến không sử dụng, ngoại trừ biến bắt đầu bằng '_'
      '@typescript-eslint/explicit-function-return-type': ['warn'],
      '@typescript-eslint/naming-convention': [
        'error',
        {
          selector: 'class',
          format: ['PascalCase'],
        },
        {
          selector: 'interface',
          format: ['PascalCase'],
          custom: {
            regex: '^I[A-Z]',
            match: true,
          },
        },
        {
          selector: 'enumMember',
          format: ['UPPER_CASE'],
        },
        {
          selector: 'variable',
          format: ['camelCase', 'UPPER_CASE'],
          leadingUnderscore: 'allow',
        },
        {
          selector: 'function',
          format: ['camelCase'],
        },
        {
          selector: 'parameter',
          format: ['camelCase'],
          leadingUnderscore: 'allow',
        },
        {
          selector: 'classProperty',
          format: ['camelCase'],
          leadingUnderscore: 'allow',
        },
        {
          selector: 'typeLike',
          format: ['PascalCase'],
        },
        // {
        //   selector: 'variable',
        //   modifiers: ['const'],
        //   types: ['boolean', 'string', 'number'],
        //   format: ['UPPER_CASE'],
        // },
      ],
      'import/order': [
        'warn',
        {
          groups: [
            'builtin', // fs, path, etc.
            'external', // nestjs, lodash, etc.
            'internal', // alias như @/*
            ['parent', 'sibling', 'index'],
            'object',
            'type',
          ],
          pathGroups: [
            {
              pattern: '@/**',
              group: 'internal',
              position: 'after',
            },
          ],
          pathGroupsExcludedImportTypes: ['builtin'],
          alphabetize: {
            order: 'asc',
            caseInsensitive: true,
          },
          'newlines-between': 'always',
        },
      ],
    },
    // settings: {
    //   'import/resolver': {
    //     typescript: {
    //       project: './tsconfig.json',
    //     },
    //   },
    // },
  },
)
