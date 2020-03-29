'use strict';

const { gql } = require('apollo-server');
const { createTestClient } = require('apollo-server-testing');
const knex = require('knex');
const knexConfig = require('../../knexfile');
const { createTestServer, uuidRegex, isoDateRegex } = require('./utils');

let db;
beforeAll(() => {
	db = knex(knexConfig);
});

afterEach(async () => db('drug').truncate());

afterAll(async () => db.destroy());

describe('Query', () => {
	test('getDrugById', async () => {
		const drugId = await db('drug')
			.insert({
				name: 'Rickazalam',
				summary: 'Rowdy',
				effects: 'AY',
			})
			.returning('id')
			.then(([a]) => a);

		const { query } = createTestClient(createTestServer());
		const { createdAt, updatedAt, ...payload } = await query({
			query: gql`
				query GetDrugById($drugId: ID!) {
					getDrugById(drugId: $drugId) {
						id
						name
						summary
						effects
						detection
						avoid
						pubchemCid
						referencesAndNotes
						createdAt
						updatedAt
					}
				}
			`,
			variables: { drugId },
		})
			.then(res => res.data.getDrugById);

		expect(createdAt).toMatch(isoDateRegex);
		expect(updatedAt).toMatch(isoDateRegex);
		expect(payload).toEqual({
			id: drugId,
			name: 'Rickazalam',
			summary: 'Rowdy',
			effects: 'AY',
			avoid: null,
			detection: null,
			pubchemCid: null,
			referencesAndNotes: null,
		});
	});
});

describe('Mutations', () => {
	test('createDrug', async () => {
		const { mutate } = createTestClient(createTestServer());
		const {
			id,
			createdAt,
			updatedAt,
			...payload
		} = await mutate({
			mutation: gql`
				mutation CreateDrug($drug: CreateDrugInput!) {
					createDrug(drug: $drug) {
						id
						name
						summary
						effects
						detection
						avoid
						pubchemCid
						referencesAndNotes
						createdAt
						updatedAt
					}
				}
			`,
			variables: {
				drug: {
					name: 'Lubetazerpine',
					summary: 'Slippery when wet',
					effects: 'Whoaaa',
				},
			},
		})
			.then(res => res.data.createDrug);

		expect(id).toMatch(uuidRegex);
		expect(createdAt).toMatch(isoDateRegex);
		expect(updatedAt).toMatch(isoDateRegex);
		expect(payload).toEqual({
			name: 'Lubetazerpine',
			summary: 'Slippery when wet',
			effects: 'Whoaaa',
			avoid: null,
			detection: null,
			pubchemCid: null,
			referencesAndNotes: null,
		});

		const record = await db('drug')
			.where('id', id)
			.first()
			.then(({ deleted, ...xs }) => xs);
		expect(record).toEqual({
			id,
			name: 'Lubetazerpine',
			summary: 'Slippery when wet',
			effects: 'Whoaaa',
			avoid: null,
			detection: null,
			pubchemCid: null,
			referencesAndNotes: null,
			createdAt: new Date(createdAt),
			updatedAt: new Date(updatedAt),
		});
	});

	test('updateDrug', async () => {
		const record = await db('drug')
			.insert({
				name: 'A-Cheeseburger',
				summary: 'Delcicious grease',
				effects: 'Early death',
				detection: 'Urine',
				avoid: 'Motorcycles',
				pubchemCid: 1800,
				referencesAndNotes: 'Encyclopedia Dramatica',
			})
			.returning('*')
			.then(([a]) => a);

		const { mutate } = createTestClient(createTestServer());
		const { detection, effects, updatedAt } = await mutate({
			mutation: gql`
				mutation UpdateDrug($drugId: ID!, $updates: UpdateDrugInput!) {
					updateDrug(drugId: $drugId, updates: $updates) {
						id
						name
						summary
						effects
						detection
						updatedAt
					}
				}
			`,
			variables: {
				drugId: record.id,
				updates: {
					detection: 'Angry dad',
					effects: 'Bad times',
				},
			},
		})
			.then(res => res.data.updateDrug);

		expect(detection).toBe('Angry dad');
		expect(effects).toBe('Bad times');
		expect(new Date(updatedAt)).toEqual(record.updatedAt); // TODO

		const updatedRecord = await db('drug')
			.select('detection', 'effects')
			.where('id', record.id)
			.first();
		expect(updatedRecord).toEqual({
			detection: 'Angry dad',
			effects: 'Bad times',
		});
	});

	test('deleteDrug', async () => {
		const drugId = await db('drug')
			.insert({ name: 'HEXTRIPPLOEXEN' })
			.returning('id')
			.then(([id]) => id);

		const deleted = await db('drug')
			.select('deleted')
			.where('id', drugId)
			.first()
			.then(record => record.deleted);
		expect(deleted).toBe(false);

		const { mutate } = createTestClient(createTestServer());
		const payload = await mutate({
			mutation: gql`
				mutation DeleteDrug($drugId: ID!) {
					deleteDrug(drugId: $drugId)
				}
			`,
			variables: { drugId },
		})
			.then(res => res.data.deleteDrug);
		expect(payload).toBeNull();

		const updatedDeleted = await db('drug')
			.select('deleted')
			.where('id', drugId)
			.first()
			.then(record => record.deleted);
		expect(updatedDeleted).toBe(true);
	});
});
