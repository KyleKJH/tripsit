'use strict';

const { gql } = require('apollo-server');
const { createTestClient } = require('apollo-server-testing');
const knex = require('knex');
const sql = require('fake-tag');
const knexConfig = require('../../knexfile');
const { createTestServer, uuidRegex } = require('./utils');

let db;
beforeAll(() => {
  db = knex(knexConfig);
});

beforeEach(async () => db.raw(sql`TRUNCATE TABLE users, sessions CASCADE;`));

afterAll(async () => db.destroy());

describe('Mutation', () => {
  describe('register', () => {
    test('Registers on valid input', async () => {
      const { mutate } = createTestClient(createTestServer());

      const { errors, data } = await mutate({
        mutation: gql`
          mutation Register($input: RegisterInput!) {
            register(input: $input)
          }
        `,
        variables: {
          input: {
            email: 'test@example.com',
            password: 'P@ssw0rd',
          },
        },
      });
      expect(errors).toBeUndefined();
      expect(data).toEqual({ register: null });

      const {
        id,
        passwordHash,
        createdAt,
        updatedAt,
        ...record
      } = await db('users')
        .where('email', '=', 'test@example.com')
        .first();
      expect(id).toMatch(uuidRegex);
      expect(passwordHash).toBeDefined();
      expect(createdAt).toBeInstanceOf(Date);
      expect(updatedAt).toBeInstanceOf(Date);
      expect(record).toEqual({ email: 'test@example.com' });
    });
  });

  test('Must use a valid email address', async () => {
    const { mutate } = createTestClient(createTestServer());

    const { errors, data } = await mutate({
      mutation: gql`
        mutation Regiter($input: RegisterInput!) {
          register(input: $input)
        }
      `,
      variables: {
        input: {
          email: 'example.com',
          password: 'P@ssw0rd',
        },
      },
    });

    expect(data).toBeUndefined();
    expect(errors).toHaveLength(1);
    expect(errors[0].message).toContain('Value is not a valid email address');

    const record = await db('users')
      .where('email', '=', 'test@example.com')
      .first();
    expect(record).toBeUndefined();
  });

  test('Must use a password of at least 6 characters in length', async () => {
    const { mutate } = createTestClient(createTestServer());

    const { errors, data } = await mutate({
      mutation: gql`
        mutation Regiter($input: RegisterInput!) {
          register(input: $input)
        }
      `,
      variables: {
        input: {
          email: 'test@example.com',
          password: 'boo',
        },
      },
    });

    expect(data).toBeUndefined();
    expect(errors).toHaveLength(1);
    expect(errors[0].message).toContain('Must be at least 6 characters in length');

    const record = await db('users')
      .where('email', '=', 'test@example.com')
      .first();
    expect(record).toBeUndefined();
  });

  test('Must use a unique email', async () => {
    const { mutate } = createTestClient(createTestServer());

    // Register user
    await mutate({
      mutation: gql`
        mutation Register($input: RegisterInput!) {
          register(input: $input)
        }
      `,
      variables: {
        input: {
          email: 'test@example.com',
          password: 'P@ssw0rd',
        },
      },
    });

    // Try to register same user
    const { errors, data } = await mutate({
      mutation: gql`
        mutation Regiter($input: RegisterInput!) {
          register(input: $input)
        }
      `,
      variables: {
        input: {
          email: 'test@example.com',
          password: 'P@ssw0rd',
        },
      },
    });

    expect(data).toEqual({ register: null });
    expect(errors).toHaveLength(1);
    expect(errors[0].message).toBe('Unique constraint error');
  });
});
