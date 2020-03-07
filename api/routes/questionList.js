const QuestionDao = require("../models/questionDao");

class PostList {
  /**
   * Handles the various APIs for displaying and managing tasks
   * @param {QuestionDao} questionDao
   */
  constructor(questionDao) {
    this.questionDao = questionDao;
  }
  async showQuestions(req, res) {
    const querySpec = {
      query: "SELECT * FROM root r WHERE r.completed=@completed",
      parameters: [
        {
          name: "@completed",
          value: false
        }
      ]
    };

    const items = await this.questionDao.find(querySpec);
    res.send(items);
  }

  async addQuestion(req, res) {
    const item = req.body;

    await this.questionDao.addItem(item);
    res.redirect("/");
  }

  async updateQuestion(req, res) {
    const question = Object.keys(req.body);
    await this.questionDao.updateItem(question)
    res.redirect("/");
  }
}

module.exports = PostList;
