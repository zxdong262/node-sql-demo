
const 

module.exports = {

	//port
	port: 7867

	//db connect options
	,dbInitOptions: [

		'test1' //db name
		,'test1user' //db user
		,'test1password' //db user password
		
		,{ //options
			host: 'localhost'
			,dialect: 'mysql'
		}

	]

	,models: {

		//table name
		User: [

			//table defination
			{
				name: {
					type: Sequelize.STRING
				}
				,age: {
					type: Sequelize.INTEGER
				}
			}

			//table option
			,{
				timestamps: true
			}

		]

		//another table name
		Company: [

			//table defination
			{
				name: {
					type: Sequelize.STRING
				}
				,desc: {
					type: Sequelize.STRING
				}
			}

			//table option
			,{
				timestamps: true
			}

		]

	}


}