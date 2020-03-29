'use strict';

module.exports = function createUserDatabaseDataSource(db) {
  return {
    getAuthorization(email) {
      return db('users')
        .select('id', 'password_hash')
        .where('email', email)
        .first();
    },

    create(email, passwordHash, optionalFields) {
      return db('users').insert({ ...optionalFields, email, passwordHash });
    },
  };
};
