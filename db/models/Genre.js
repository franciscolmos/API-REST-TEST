

module.exports = function(sequelize, DataTypes)  {
    const Genre = sequelize.define('Genre', {
		id: {
			type: DataTypes.INTEGER(11),
			allowNull: false,
			primaryKey: true,
			autoIncrement: true,
			field: 'id'
		},
		name: {
			type: DataTypes.STRING(150),
			allowNull: false,
			field: 'name'
		},
		ranking: {
			type: DataTypes.INTEGER,
			allowNull: false,
			field: 'ranking'
		},
		active: {
			type: DataTypes.INTEGER,
			allowNull: false,
			field: 'active'
		},
	}, {
		tableName: 'genres'
    });
    
 

    return Genre;


}