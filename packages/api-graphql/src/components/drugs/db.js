'use strict';

module.exports = function createDrugDatabaseDataSource(db) {
  return {
    getById(id) {
      return db('drug').where('id', id).first();
    },

    async create(drug) {
      return db('drug')
        .insert(drug)
        .returning('*')
        .then(([createdDrug]) => createdDrug);
    },

    async updateById(id, updates) {
      return db('drug')
        .update(updates)
        .where('id', id)
        .returning('*')
        .then(([updatedDrug]) => updatedDrug);
    },
  };
};
