var path=require('path');

//postgres DATABASE_URL://user:passwd@host:port/database
//SQLite DATABASE_URL: sqlite://:@:/
var url=process.env.DATABASE_URL.match(/(.*)\:\/\/(.*?)\:(.*)@(.*)\:(.*)\/(.*)/);
var DB_name=(url[6]||null);
var user=	(url[2]||null);
var pwd=	(url[3]||null);
var protocol=(url[1]||null);
var dialect=(url[1]||null);
var port=	(url[5]||null);
var host=	(url[4]||null);
var storage=process.env.DATABASE_STORAGE;

var Sequelize= require('sequelize'); //Cargar el modelo ORM

//Usar BD sqlite3 o postgres
var sequelize= new Sequelize(DB_name,user,pwd,
	{
	dialect:dialect, 
	storage:protocol,
	port:port,
	host:host,
	storage:storage,//solo para sqlite3
	omitNull:true //solo para postgres
	});

//Importar la definicion de la tabla quiz en quiz.js
var Quiz= sequelize.import(path.join(__dirname,'quiz'));
exports.Quiz=Quiz;

//sequelize.sync() crea e  inicializa la tabla de preguntas en DB
sequelize.sync().success(function(){
	Quiz.count().success(function(count){
		if (count===0) {
			Quiz.create({
				pregunta:"Capital de Italia",
				respuesta:"Roma"
			}).success(function(){console.log("La BD fue inicializada");});
		};
	});
});