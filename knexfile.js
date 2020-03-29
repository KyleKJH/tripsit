'use strict';

require('dotenv').config();
const knexStringcase = require('knex-stringcase');

module.exports = knexStringcase({
  client: 'pg',
  connection: {
		user: process.env.POSTGRES_USER,
		password: process.env.POSTGRES_PASSWORD,
		database: process.env.POSTGRES_DB,
	},
});
