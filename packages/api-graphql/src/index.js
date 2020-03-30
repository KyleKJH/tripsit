'use strict';

const { ApolloServer } = require('apollo-server');
const { formatError } = require('apollo-errors');
const { schema, createDataSources } = require('./components');
const context = require('./context');

const server = new ApolloServer({
  schema,
  context,
  formatError,
  dataSources: createDataSources(),
});

server.listen().then(({ url }) => {
  console.info(`Apollo listening on: ${url}`);
});
