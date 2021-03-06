var express = require('express');
var router = express.Router();

var quizController=require('../controllers/quiz_controller');
var commentController=require('../controllers/comment_controller');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'QUIZ', errors:[] });
});

router.param('id',quizController.load);//El autoload

router.get('/quizes', quizController.index);
router.get('/quizes/questions',quizController.search);
router.get('/quizes/:id(\\d+)',quizController.show);
router.get('/quizes/:id(\\d+)/answer',quizController.answer);
router.get('/author', quizController.author);
//crud quizz
router.get('/quizes/new',quizController.new);
router.post('/quizes/create',quizController.create);
router.get('/quizes/:id(\\d+)/edit',quizController.edit);
router.put('/quizes/:id(\\d+)',quizController.update);
router.delete('/quizes/:id(\\d+)/delete',quizController.delete);

//crud comment
router.get('/quizes/:id(\\d+)/comments/new', commentController.new);
router.post('/quizes/:id(\\d+)/comments', commentController.create);

module.exports = router;
