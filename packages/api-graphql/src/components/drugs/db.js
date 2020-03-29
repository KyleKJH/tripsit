'use strict';

module.exports = function createDrugDatabaseDataSource(db) {
  return {
    getById(id) {
      return db('drugs').where('id', id).first();
    },

    async create(drug) {
      return db('drugs')
        .insert(drug)
        .returning('*')
        .then(([createdDrug]) => createdDrug);
    },

    async updateById(id, updates) {
      return db('drugs')
        .update(updates)
        .where('id', id)
        .returning('*')
        .then(([updatedDrug]) => updatedDrug);
    },
  };
};
