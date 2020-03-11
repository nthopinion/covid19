var createError = require('http-errors')
var express = require('express')
var path = require('path')
var cookieParser = require('cookie-parser')
var logger = require('morgan')

var indexRouter = require('./routes/index')
var usersRouter = require('./routes/users')
var cors = require('cors')
const upload = require('./routes/upload')

var app = express()
const CosmosClient = require('@azure/cosmos').CosmosClient
const config = require('./config')
const QuestionList = require('./routes/questionList')
const QuestionDao = require('./models/questionDao')
// view engine setup
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'jade')

app.use(cors())
app.use(logger('dev'))
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cookieParser())
app.use(express.static(path.join(__dirname, 'public')))
app.use(express.static(path.join(__dirname, '/build')))

app.use('/users', usersRouter)
app.use('/upload', upload)

const cosmosClient = new CosmosClient({
  endpoint: config.endpoint,
  key: config.key
})
const questionDao = new QuestionDao(cosmosClient, config.databaseId, config.containerId)
const questionList = new QuestionList(questionDao)
questionDao
  .init(err => {
    console.error(err)
  })
  .catch(err => {
    console.error(err)
    console.error(
      'Shutting down because there was an error settinig up the database.'
    )
    // process.exit(1)
  })
app.get('/api/questions', (req, res, next) => questionList.showQuestions(req, res, true).catch(next))
app.get('/api/questions/unanswered', (req, res, next) => questionList.showQuestions(req, res, false).catch(next))
app.post('/api/addQuestion', (req, res, next) => questionList.addQuestion(req, res).catch(next))
app.post('/api/addQuestions', (req, res, next) => questionList.addQuestions(req, res).catch(next))
// ToDo: using :id
app.delete('/api/question', (req, res, next) => questionList.deleteQuestion(req, res).catch(next))
app.post('/api/updateQuestion', (req, res, next) =>
  questionList.updateQuestion(req, res).catch(next)
)
app.post('/api/editAnswers', (req, res, next) =>
  questionList.editAnswers(req, res).catch(next)
)

app.post('/api/question/like', (req, res, next) =>
  questionList.increaseLike(req, res).catch(next)
)

// Handles any requests that don't match the ones above
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname + '/build/index.html'))
})
// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404))
})

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message
  res.locals.error = req.app.get('env') === 'development' ? err : {}

  // render the error page
  res.status(err.status || 500)
  res.render('error')
})

module.exports = app
