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
};
