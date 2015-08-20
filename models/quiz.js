module.exports=function(sequelize, DataTypes){
	return sequelize.define(
		'Quiz', 
		{	
		pregunta: {
			type: DataTypes.STRING,
			validate: {notEmpty: {msg:"-> Introduzca la pregunta"}}
		},
		respuesta: {
			type: DataTypes.STRING,
			validate: {notEmpty: {msg:"-> Introduzca la respuesta"}}
		},
		tema:{
			type: DataTypes.STRING,
			validate: {notEmpty: {msg:"-> Introduzca el tema"}}
		}
	});
}