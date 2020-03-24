const Pusher = require('pusher');
const getUrls = require('get-urls');

const QuestionDao = require('../models/questionDao')

/**
 * @swagger
 * definitions:
 *   Question:
 *     type: object
 *     properties:
 *       id:
 *         type: string
 *       date:
 *         type: string
 *       title:
 *         type: integer
 *       answers:
 *         type: array
 *         items:
 *           type: string
 *       sources:
 *         type: string
 *       links:
 *         type: string
 *         format: password
 *       tags:
 *         type: string
 *       answered:
 *         type: boolean
 */


 /**
 * @swagger
 * definitions:
 *   QuestionList:
 *     type: array
 *     items:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *         date:
 *           type: string
 *         title:
 *           type: integer
 *         answers:
 *           type: array
 *           items:
 *             type: string
 *         sources:
 *           type: string
 *         links:
 *           type: string
 *           format: password
 *         tags:
 *           type: string
 *         answered:
 *           type: boolean
 */
 /**
 * @swagger
 * /api/questions:
 *   get:
 *     tags:
 *       - Questions
 *     name: Gets  questions
 *     summary: Gets questions
 *     security:
 *       - bearerAuth: []
 *     consumes:
 *       - application/json
 *     produces:
 *       - application/json

 *     responses:
 *       '200':
 *         description: Gets a list of all questions
 *         schema:
 *           $ref: '#/definitions/QuestionList'
*/

 /**
 * @swagger
 * /api/questions/unanswered:
 *   get:
 *     tags:
 *       - Questions
 *     name: Gets unanswered questions
 *     summary: Gets nanswered questions
 *     security:
 *       - bearerAuth: []
 *     consumes:
 *       - application/json
 *     produces:
 *       - application/json
 *     responses:
 *       '200':
 *         description: Gets a list of all unanswered questions
 *         schema:
 *           $ref: '#/definitions/QuestionList'
*/

 /**
 * @swagger
 * /api/addQuestions:
 *   post:
 *     tags:
 *       - Questions
 *     name: Add a new Question
 *     summary: Adds new question
 *     security:
 *       - bearerAuth: []
 *     consumes:
 *       - application/json
 *     produces:
 *       - application/json
 *     parameters:
 *       - in: query
 *         name: title
 *         schema:
 *           type: string
 *         required:
 *           - title
 *     responses:
 *       '201':
 *         description: Creates a new question
 *         schema:
 *           $ref: '#/definitions/Question'
 *       '401':
 *         description: No auth token / no user found in db with that name
 *       '403':
 *         description: JWT token and username from client don't match
 */

const config = require('../config')

class PostList {
  /**
   * Handles the various APIs for displaying and managing tasks
   * @param {QuestionDao} questionDao
   */
  constructor (questionDao) {
    this.questionDao = questionDao
  }

  async showQuestions (req, res, answered) {
    console.log('showQuestions')

    const querySpec = {
      query: "SELECT * from c WHERE c.answered = @answered",
      // ORDER BY date DESC
      //  WHERE c.answered = @answered and EXISTS (SELECT VALUE t from t in c.tags WHERE (t != 'Wellspring' and t != 'Holistic' and t != 'yu' and t != 'Yu' and t != 'Retinitis Pigmentosa' and t != 'Traditional Chinese Medicine' and t != 'Wellspring Vision Improvement Program' and t != 'biography' and t != 'questions' and t != 'Li Wenliang' and t != 'Zhang' and t != 'question' and t != 'address'))",
      parameters: [
        {
          name: '@answered',
          value: answered
        }
      ]
    };

    const items = await this.questionDao.find(querySpec);
    // console.log('items', items, querySpec)
    res.send(items)
  }

  async addQuestion (req, res) {
    // console.log('req' + JSON.stringify(req.body))
    const item = req.body
    const itemAdd = await this.questionDao.addItem(item)
    // res.redirect("/");
    res.send(itemAdd)
  }

  async addQuestions (req, res) {
    const items = req.body

    await this.questionDao.addItems(items)
    // res.redirect("/");
    res.send('ok')
  }

  async updateQuestion (req, res) {
    let question = req.body
    const youtubeRegex = /http(?:s?):\/\/(?:www\.)?youtu(?:be\.com\/watch\?v=|\.be\/)([\w\-\_]*)(&(amp;)?‌​[\w\?‌​=]*)?/

    let sources = [];
    let youtubeLinks = [];
    const answer = question.answers && question.answers.length && question.answers[0];

    const urls = getUrls(answer);

    urls.forEach(url => {
      if (url.match(youtubeRegex)) {
        youtubeLinks.push(url);
      } else {
        sources.push(url);
      }
    });

    question = {
      ...question,
      sources,
      youtubeLinks
    };

    await this.questionDao.updateItem(question)

    const {appId, key, secret, cluster, channel} = config.pusher;
  
    const pusher = new Pusher({
      appId,
      key,
      secret,
      cluster,
      encrypted: true
    });

    pusher.trigger(channel, 'answer-question', {
      question
    });

    res.send('ok')
  }

  async editAnswers (req, res) {
    const question = req.body
    await this.questionDao.editAnswers(question)
    res.send('ok')
  }

  // need to use better way :id
  async deleteQuestion (req, res) {
    const { id } = req.body
    await this.questionDao.deleteItem(id)
    res.send('ok')
  }

  async reportQuestion(req, res) {
    const { id } = req.body
    console.log('req.body', req.body)
    await this.questionDao.reportQuestion(id)
    res.send('ok')
  }

  async increaseLike (req, res) {
    const { id } = req.body
    console.log('req.body', req.body)
    await this.questionDao.likeIncrease(id)
    res.send('ok')
  }
}

module.exports = PostList
