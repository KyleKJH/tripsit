'use strict';

const { ApolloServer } = require('apollo-server');
const knex = require('knex');
const knexConfig = require('../../../knexfile');
const { schema, createDataSources } = require('../../../src/components');

module.exports = function createTestServer() {
  return new ApolloServer({
    schema,
    dataSources: () => createDataSources(knex(knexConfig)),
  });
};
