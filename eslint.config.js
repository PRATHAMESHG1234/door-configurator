import js from '@eslint/js';
import globals from 'globals';
import react from 'eslint-plugin-react';
import reactHooks from 'eslint-plugin-react-hooks';
import reactRefresh from 'eslint-plugin-react-refresh';

export default [
	{
		// Ignore common build directories
		ignores: ['dist', 'node_modules'],
	},
	{
		files: ['**/*.{js,jsx,ts,tsx}'], // Include both JavaScript and TypeScript files
		languageOptions: {
			ecmaVersion: 2020,
			globals: globals.browser, // Use browser global variables
			parserOptions: {
				ecmaVersion: 'latest', // Use the latest ECMAScript features
				ecmaFeatures: { jsx: true }, // Enable JSX parsing
				sourceType: 'module', // Use ES Modules
			},
		},
		settings: {
			react: {
				version: 'detect', // Automatically detect React version
			},
		},
		plugins: {
			react, // React linting rules
			'react-hooks': reactHooks, // React Hooks linting rules
			'react-refresh': reactRefresh, // React Refresh linting rules
		},
		rules: {
			...js.configs.recommended.rules, // Base JavaScript rules
			...react.configs.recommended.rules, // Recommended React rules
			...react.configs['jsx-runtime'].rules, // JSX Runtime rules
			...reactHooks.configs.recommended.rules, // Recommended React Hooks rules

			// Custom React rules
			'react/jsx-no-target-blank': 'off', // Allow target="_blank" without rel="noopener noreferrer"
			'react-refresh/only-export-components': [
				'warn',
				{ allowConstantExport: true },
			], // Warn when exporting components improperly in fast refresh

			// Additional rules
			'no-console': 'warn', // Warn on console usage
			'no-unused-vars': [
				'warn',
				{ vars: 'all', args: 'after-used', ignoreRestSiblings: true },
			], // Warn on unused variables
			'react/prop-types': 'off', // Disable prop-types rule if using TypeScript or another type-checking mechanism
		},
	},
];
