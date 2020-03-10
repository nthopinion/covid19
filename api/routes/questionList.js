const QuestionDao = require('../models/questionDao')

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
    const question = req.body
    await this.questionDao.updateItem(question)
    res.send('ok')
  }

  // need to use better way :id
  async deleteQuestion (req, res) {
    const { id } = req.body
    await this.questionDao.deleteItem(id)
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
