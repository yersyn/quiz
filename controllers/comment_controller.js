var models=require('../models/models.js');


exports.new = function(req,res){
	res.render('comments/new.ejs', {id: req.params.id, errors:[]});
};

exports.create=function(req,res){
	var comment= models.Comment.build({
		texto:req.body.comment.texto,
	 	QuizId: req.params.id });

	comment
	.validate()
	.then(
		function(err){
			if (err) {
				res.render('comments/new.ejs',{comment:comment, quizId: req.params.id, errors:err.errors});
			}else{
				comment
				.save()
				.then(function(){res.redirect('/quizes/'+req.params.id)});
			}
		}).catch(function(err){next(err)});
};