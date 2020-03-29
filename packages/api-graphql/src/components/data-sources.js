'use strict';

const knex = require('knex');
const knexConfig = require('../../knexfile');
const createUserDataSource = require('./users/db');
const createDrugDataSource = require('./drugs/db');

module.exports = function createDataSources() {
  const db = knex(knexConfig);

  return {
    db: {
      user: createUserDataSource(db),
      drug: createDrugDataSource(db),
    },
  };
};
