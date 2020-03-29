'use strict';

const sql = require('fake-tag');
const { column } = require('../migration-utils');

exports.up = async function (knex) {
  await knex.raw(sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp";`);

  return Promise.all([
    knex.schema.createTable('drugs', (table) => {
      column.pk(table, knex);
      table.text('name').notNullable().unique();
      table.text('summary');
      table.text('effects');
      table.text('detection');
      table.text('avoid');
      table.integer('pubchem_cid').unsigned();
      table.text('references_and_notes');
      column.deleted(table);
      table.timestamps(true, true);
    }),

    knex.schema.createTable('users', (table) => {
      column.pk(table, knex);
      table
        .string('email', 320)
        .notNullable()
        .unique();
      table
        .specificType('password_hash', 'CHAR(95)')
        .notNullable();
      table.timestamps(true, true);
    })
      .then(() => knex.schema.createTable('sessions', (table) => {
        column.pk(table, knex);
        table
          .uuid('user_id')
          .notNullable()
          .references('id')
          .inTable('users');
        table.datetime('expires');
        table.timestamps(true, true);
      })),
  ]);
};

exports.down = async function (knex) {
  await Promise.all([
    knex.schema.dropTable('drugs'),
    knex.schema.dropTable('sessions')
      .then(() => knex.schema.dropTable('users')),
  ]);
  return knex.raw(sql`DROP EXTENSION IF EXISTS "uuid-ossp";`);
};
