
const Sequelize = require('sequelize')

exports.init = function* (config) {

	//init
	let sequelize = new Sequelize(...config.dbInitOptions)

	//connect
	yield sequelize.authenticate()

	exports.db = {
		tables: {}
	}

	let tables = Object.keys(config.models)

	for(let i = 0, len = tables.length;i < len;i ++) {

		let tableName = tables[i]
		let tableNameNorm = tableName.toLowerCase()
		exports.db.tables[tableName] = sequelize.define(tableNameNorm, ...config.models[tableName])

	}

	sequelize.sync()

	exports.db.sequelize = sequelize

	return Promise.resolve()

	//end
}