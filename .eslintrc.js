'use strict';

module.exports = {
  root: true,
	extends: 'airbnb-base',
	parserOptions: { sourceType: 'script' },
	env: { node: true },
	rules: {
		strict: [2, 'global'],
		'no-console': 1,
		'func-names': 0,
		'arrow-parens': [2, 'as-needed', { requireForBlockBody: true }],
		'implicit-arrow-linebreak': 0,
  },
  overrides: [
    {
      files: ['**/*.spec.js', '**/__mocks__/*.js'],
      env: { jest: true },
      plugins: ['jest'],
    },
    {
      files: ['migrations/*.js', 'knexfile.js', 'migration-utils.js'],
      rules: {
        'import/no-extraneous-dependencies': 0,
      },
    },
  ],
};
