'use strict';

exports.Query = {
	async getDrugById(root, { drugId }, { dataSources }) {
		return dataSources.db.drug.getById(drugId);
	},
};

exports.Mutation = {
	async createDrug(root, { drug }, { dataSources }) {
		return dataSources.db.drug.create(drug);
	},

	async updateDrug(root, { drugId, updates }, { dataSources }) {
		return dataSources.db.drug.updateById(drugId, updates);
	},

	async deleteDrug(root, { drugId }, { dataSources }) {
		return dataSources.db.drug.updateById(drugId, { deleted: true });
	},
};
