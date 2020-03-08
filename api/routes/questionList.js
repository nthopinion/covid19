const QuestionDao = require("../models/questionDao");

class PostList {
  /**
   * Handles the various APIs for displaying and managing tasks
   * @param {QuestionDao} questionDao
   */
  constructor(questionDao) {
    this.questionDao = questionDao;
  }
  async showQuestions(req, res, answered) {
    console.log('showQuestions')

    const querySpec = {
      query: "SELECT * FROM root r WHERE r.answered=@answered",
      parameters: [
        {
          name: "@answered",
          value: answered
        }
      ]
    };
    const items = await this.questionDao.find(querySpec);
    console.log('items', items, querySpec)
    res.send(items);
  }

  async addQuestion(req, res) {
    console.log('req' + JSON.stringify(req.body))
    const item = req.body;
    const itemAdd = await this.questionDao.addItem(item);
    // res.redirect("/");
    res.send(itemAdd);

  }


  async addQuestions(req, res) {
    const items = req.body;

    await this.questionDao.addItems(items);
    // res.redirect("/");
    res.send('ok');
  }

  async updateQuestion(req, res) {
    const question = req.body;
    await this.questionDao.updateItem(question)
    res.send('ok');
  }
}

module.exports = PostList;
