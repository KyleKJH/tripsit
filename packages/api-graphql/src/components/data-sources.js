'use strict';

const knex = require('knex');
const knexConfig = require('../../knexfile');
const createUserDataSource = require('./user/db');
const createDrugDataSource = require('./drug/db');

module.exports = function createDataSources() {
	const db = knex(knexConfig);

	return {
		db: {
			user: createUserDataSource(db),
			drug: createDrugDataSource(db),
		},
	};
};
