'use strict';

exports.column = {
	pk(table, knex) {
		table
			.uuid('id')
			.defaultTo(knex.raw('uuid_generate_v4()'))
			.notNullable()
			.primary();
	},

	deleted(table) {
		table
			.boolean('deleted')
			.defaultTo(false)
			.notNullable();
	},
};
