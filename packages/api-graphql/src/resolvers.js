'use strict';

const { createResolver } = require('apollo-resolvers');
const { createError, isInstance: isApolloError } = require('apollo-errors');
const { wrapError, UniqueViolationError } = require('db-errors');

const UnknownError = createError('UnknownError', { message: 'An unknown error has occured' });

exports.baseResolver = createResolver(
  null,
  (parent, args, ctx, error) => {
    if (process.env.NODE_ENV !== 'production') console.error(error);
    return isApolloError(error) ? error : new UnknownError();
  },
);

const UniqueConstraintDbError = createError('UniqueConstraintDbError', {
  message: 'Unique constraint error',
});

exports.createDbErrorResolver = function (parent, args, ctx, error) {
  const err = wrapError(error);
  if (err instanceof UniqueViolationError) {
    throw new UniqueConstraintDbError({
      data: { constraint: err.columns },
    });
  }
};
