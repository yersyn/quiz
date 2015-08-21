
var models=require('../models/models.js');
var temas=["otro","humanidades","ocio","ciencia","tecnologia"];
//Autoload  - factoriza el codigo si alguna ruta incluye :id
exports.load=function(req, res, next, quizId){
	models.Quiz.findById(quizId).then(
		function(quiz){
			if (quiz) {
				req.quiz=quiz;
				next();
			}else{next(new Error("No existe el Id: "+ quizId));}
		}).catch(function(error){next(error);});
};

//GET quizez question
exports.index=function(req,res){
	models.Quiz.findAll().then(function(quizes){
		res.render('quizes/index',{quizes:quizes, errors:[]});
	}).catch(function(error){next(error);});
};

exports.search=function(req, res){
	models.Quiz.findAll({where:["pregunta like ?",'%'+req.params.search+'%']}).then(function(quizes){
		res.render('quizes/question',{quizes:quizes,errors:[]});
	}).catch(function(error){next(error)});
};

exports.show=function (req,res) {
	res.render('quizes/show',{quiz: req.quiz,errors:[]});
};

exports.answer=function(req,res){	
		if (req.query.respuesta===req.quiz.respuesta) {
			res.render('quizes/answer',{quiz:req.quiz, respuesta:'Correcto',errors:[]});
		}else{
			res.render('quizes/answer',{quiz:req.quiz ,respuesta:'Incorrecto',errors:[]});
		}
};

exports.new=function(req,res){
	var quiz=models.Quiz.build({pregunta:"Pregunta", respuesta:"Respuesta", tema:"Tema"});
	res.render('quizes/new',{quiz:quiz,temas:temas,errors:[]});
};

exports.create=function(req,res){
	var quiz=models.Quiz.build(req.body.quiz);
	quiz.validate().then(function(err){	
			if (err) {
				res.render('quizes/new',{quiz:quiz, errors:err.errors});
			}else{
				quiz
				.save({fields:["pregunta","respuesta","tema"]})
				.then(function(){res.redirect("/quizes")});
			}
		});		
};

exports.edit=function(req,res){
	var quiz=req.quiz;//autoload de instancia de quiz	
	res.render('quizes/edit', {quiz:quiz,temas:temas, errors:[]});
};

exports.update=function(req,res){
	req.quiz.pregunta=req.body.quiz.pregunta;
	req.quiz.respuesta=req.body.quiz.respuesta;
	req.quiz.tema=req.body.quiz.tema;

	req.quiz.validate().then(function(err){
		if (err) {
			res.render('quizes/edit',{quiz:req.quiz, errors:err.errors});
		}else{
			req
			.quiz
			.save({fields:["pregunta","respuesta","tema"]})
			.then(function(){res.redirect("/quizes")});
		}
	});
};

exports.delete=function(req,res){
	req.quiz.destroy().then(function(){
		res.redirect('/quizes');
	}).catch(function(error){next(error);});
}

exports.author=function(req, res){
	res.render('author',{author:'Yersyn, Solorzano Machado',errors:[]});	
};
