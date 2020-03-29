'use strict';

const { createError } = require('apollo-errors');
const argon2 = require('argon2');
const { baseResolver, createDbErrorResolver } = require('../../resolvers');

const InvalidCredentials = createError('InvalidCredentials', { message: 'Invalid credentials.' });

exports.Mutation = {
  createSession: baseResolver
    .createResolver(async (root, { email, password }, { dataSources }) => dataSources.db.user
      .getAuthorization(email)
      .then(async (user) => {
        if (!user || !await argon2.verify(user.hash, password)) throw new InvalidCredentials();
        return {
          user,
          sessionId: await dataSources.session.create(user.id),
        };
      })),

  register: baseResolver.createResolver(
    async (root, { input }, { dataSources }) => {
      const { email, password, ...optionalFields } = input;
      const hash = await argon2.hash(password);
      await dataSources.db.user.create(email, hash, optionalFields);
      return null;
    },
    createDbErrorResolver,
  ),
};
