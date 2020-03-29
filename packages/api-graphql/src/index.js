'use strict';

const { ApolloServer } = require('apollo-server');
const { formatError } = require('apollo-errors');
const { schema, createDataSources } = require('./components');
const context = require('./context');

module.exports = async function createServer() {
	const server = new ApolloServer({
		schema,
		context,
		formatError,
		dataSources: createDataSources(),
	});

	return new Promise((resolve, reject) => {
		server.listen()
			.then(({ url }) => {
				console.info(`Apollo listening on: ${url}`);
				resolve();
			})
			.catch(reject);
	});
};
