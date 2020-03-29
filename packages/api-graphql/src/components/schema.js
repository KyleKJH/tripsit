'use strict';

const { makeExecutableSchema } = require('graphql-tools');
const { importSchema } = require('graphql-import');
const ConstraintDirective = require('graphql-constraint-directive');
const { DateTimeResolver, EmailAddressResolver } = require('graphql-scalars');

const { Mutation: UserMutation } = require('./users/resolvers');
const {
  Query: DrugQuery,
  Mutation: DrugMutation,
  ...drugTypeResolvers
} = require('./drugs/resolvers');

module.exports = makeExecutableSchema({
  typeDefs: importSchema('**/*.graphql'),
  schemaDirectives: { constraint: ConstraintDirective },
  resolvers: {
    DateTime: DateTimeResolver,
    EmailAddress: EmailAddressResolver,
    Query: {
      ...DrugQuery,
    },
    Mutation: {
      ...UserMutation,
      ...DrugMutation,
    },
    ...drugTypeResolvers,
  },
});
