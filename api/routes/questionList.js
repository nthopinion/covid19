const Pusher = require("pusher");
const getUrls = require("get-urls");

const QuestionDao = require("../models/questionDao");
const parseToken = require("./common");
const User = require("./user");

//import { parseToken } from './common';
//import { answerContainerId } from '../config';

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

const config = require("../config");

class PostList {
  /**
   * Handles the various APIs for displaying and managing tasks
   * @param {QuestionDao} questionDao
   */
  constructor(questionDao) {
    const { appId, key, secret, cluster, channel } = config.pusher;
    this.questionDao = questionDao;
    this.pusher = new Pusher({
      appId,
      key,
      secret,
      cluster,
      channel,
      useTLS: true,
    });
  }

  async changeQnAcontainer(req, res) {
    const { language } = req.body;
    const changed = await this.questionDao.changeQnAcontainer(language);
    const answered = true;
    const querySpec = {
      query: "SELECT * from c WHERE c.answered = @answered",
      // ORDER BY date DESC
      //  WHERE c.answered = @answered and EXISTS (SELECT VALUE t from t in c.tags WHERE (t != 'Wellspring' and t != 'Holistic' and t != 'yu' and t != 'Yu' and t != 'Retinitis Pigmentosa' and t != 'Traditional Chinese Medicine' and t != 'Wellspring Vision Improvement Program' and t != 'biography' and t != 'questions' and t != 'Li Wenliang' and t != 'Zhang' and t != 'question' and t != 'address'))",
      parameters: [
        {
          name: "@answered",
          value: answered,
        },
      ],
    };

    let items = await this.questionDao.find(querySpec, "questions");

    if (answered === true) {
      let questionIds = items.map((item) => item.id);

      const answers = await this.loadAnswers(questionIds);

      let answerObject = {};

      answers.forEach((answer) => {
        if (answerObject[answer.questionId]) {
          answerObject = {
            ...answerObject,
            [answer.questionId]: [...answerObject[answer.questionId], answer],
          };
        } else {
          answerObject = {
            ...answerObject,
            [answer.questionId]: [answer],
          };
        }
      });

      items = items.map((item) => ({
        ...item,
        answers: answerObject[item.id] || [],
      }));
    }
    res.send(items);
  }

  async showQuestions(req, res, answered) {
    const querySpec = {
      query: "SELECT * from c WHERE c.answered = @answered",
      // ORDER BY date DESC
      //  WHERE c.answered = @answered and EXISTS (SELECT VALUE t from t in c.tags WHERE (t != 'Wellspring' and t != 'Holistic' and t != 'yu' and t != 'Yu' and t != 'Retinitis Pigmentosa' and t != 'Traditional Chinese Medicine' and t != 'Wellspring Vision Improvement Program' and t != 'biography' and t != 'questions' and t != 'Li Wenliang' and t != 'Zhang' and t != 'question' and t != 'address'))",
      parameters: [
        {
          name: "@answered",
          value: answered,
        },
      ],
    };

    let items = await this.questionDao.find(querySpec, "questions");

    if (answered === true) {
      let questionIds = items.map((item) => item.id);

      const answers = await this.loadAnswers(questionIds);

      let answerObject = {};

      answers.forEach((answer) => {
        if (answerObject[answer.questionId]) {
          answerObject = {
            ...answerObject,
            [answer.questionId]: [...answerObject[answer.questionId], answer],
          };
        } else {
          answerObject = {
            ...answerObject,
            [answer.questionId]: [answer],
          };
        }
      });

      items = items.map((item) => ({
        ...item,
        answers: answerObject[item.id] || [],
      }));
    }

    res.send(items);
  }

  async loadAnswers(questionIds) {
    // TODO: Use a better approach for setting parameters in the query
    let questionIdsString = "";

    questionIds.forEach((id, index) => {
      questionIdsString += `${index === 0 ? "" : ", "}"${id}"`;
    });

    const querySpec = {
      query: `SELECT * from c WHERE c.questionId in (${questionIdsString}) and c.deleted = false`,
      // ORDER BY date DESC
      //  WHERE c.answered = @answered and EXISTS (SELECT VALUE t from t in c.tags WHERE (t != 'Wellspring' and t != 'Holistic' and t != 'yu' and t != 'Yu' and t != 'Retinitis Pigmentosa' and t != 'Traditional Chinese Medicine' and t != 'Wellspring Vision Improvement Program' and t != 'biography' and t != 'questions' and t != 'Li Wenliang' and t != 'Zhang' and t != 'question' and t != 'address'))",
      parameters: [
        {
          name: "@questionIdsString",
          value: questionIdsString,
        },
      ],
    };

    const answers = await this.questionDao.find(querySpec, "answers");

    return answers;
  }

  async addQuestion(req, res) {
    // console.log('req' + JSON.stringify(req.body))
    const item = req.body;
    item.answers = [];
    item.answered = false;
    item.like = 0;
    const itemAdd = await this.questionDao.addItem(item, "questions");
    /*    this.pusher.trigger(channel, 'answer-question', {
      question
    }); */
    // res.redirect("/");
    res.send(itemAdd);
  }

  async addQuestions(req, res) {
    const items = req.body;

    await this.questionDao.addItems(items);
    // res.redirect("/");
    res.send("ok");
  }

  async editQuestion(req, res) {
    let question = req.body;

    await this.questionDao.updateQuestion(question, "questions");
    /*     if (!question.answered) {
      this.pusher.trigger(channel, 'answer-question', {
        question
      });
    } */
    res.send("ok");
  }

  async parseAnswer(req) {
    const youtubeRegex = /http(?:s?):\/\/(?:www\.)?youtu(?:be\.com\/watch\?v=|\.be\/)([\w\-\_]*)(&(amp;)?‌​[\w\?‌​=]*)?/;

    let sources = [];
    let youtubeLinks = [];
    let answer = req.body;
    let jwt = req.headers.idtoken;
    let userData = parseToken(jwt);
    let user = null;
    try {
      user = await this.questionDao.getUser(userData.email);
    } catch (e) {
      //TODO: log
    }
    let userDetails = null;
    if (user) {
      userDetails = {
        id: user.id,
        name: user.anonymous ? "Dr. Anonymous" : user.fullname,
        verified: user.profilestatus === "level 1",
      };
    }

    const urls = getUrls(answer.text);

    urls.forEach((url) => {
      if (url.match(youtubeRegex)) {
        youtubeLinks.push(url);
      } else {
        sources.push(url);
      }
    });
    if (answer.sources !== undefined) {
      answer.sources.forEach((url) => {
        sources.push(url);
      });
    }

    return {
      ...answer,
      userDetails,
      country: userData.country,
      sources,
      youtubeLinks,
    };
  }

  async addAnswer(req, res) {
    let answer = {};
    try {
      answer = await this.parseAnswer(req);
    } catch (e) {
      // Todo:log error
    }
    if (!answer.userDetails || answer.userDetails.verified === false) {
      res.status(403).send("Only verified physicians can provide answers");
      return;
    }
    answer["firstAnsweredBy"] = answer.userDetails;
    answer["lastAnsweredBy"] = answer.userDetails;
    let date = new Date();
    let timestamp = Math.floor(date.getTime() / 1000.0);
    answer.firstAnsweredOn = timestamp;
    answer.lastAnsweredOn = timestamp;
    await this.questionDao.addAnswer(answer);
    res.send("ok");
  }

  async editAnswer(req, res) {
    let answer = {};
    try {
      answer = await this.parseAnswer(req);
    } catch (e) {
      // Todo:log error
    }
    if (!answer.userDetails || answer.userDetails.verified === false) {
      res.status(403).send("Only verified physicians can provide answers");
      return;
    }
    if (
      answer.lastAnsweredBy === undefined ||
      answer.lastAnsweredBy != answer.userDetails.name
    ) {
      answer.lastAnsweredBy = answer.userDetails;
    }
    let date = new Date();
    let timestamp = Math.floor(date.getTime() / 1000.0);
    answer.lastAnsweredOn = timestamp;
    await this.questionDao.editAnswer(answer);
    res.send("ok");
  }

  // need to use better way :id
  async deleteQuestion(req, res) {
    const { id } = req.body;
    await this.questionDao.deleteItem(id, "questions");
    res.send("ok");
  }

  /*   async reportQuestion(req, res) {
    const { id } = req.body
    console.log('req.body', req.body)
    await this.questionDao.reportQuestion(id)
    res.send('ok')
  } */

  async updateQuestionLike(req, res) {
    console.log("req.body", req.body);
    const { id } = req.body;
    await this.questionDao.updateLike(id, "questions");
    res.send("ok");
  }

  async updateAnswerLike(req, res) {
    console.log("req.body", req.body);
    const { id } = req.body;
    await this.questionDao.updateLike(id, "answers");
    res.send("ok");
  }

  async reportAnswer(req, res) {
    console.log("req.body", req.body);
    const { id } = req.body;
    await this.questionDao.reportAnswer(id, "answers");
    res.send("ok");
  }

  async deleteAnswer(req, res) {
    console.log("req.body", req.body);
    const { id } = req.body;
    await this.questionDao.deleteAnswer(id, "answers");
    res.send("ok");
  }
}

module.exports = PostList;
