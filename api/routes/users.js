var express = require('express')
var router = express.Router()

/**
 * @swagger
 * /users:
 *   get:
 *     tags:
 *       - Users
 *     name: Gets All user
 *     summary: Gets All user
 *     security:
 *       - bearerAuth: []
 *     consumes:
 *       - application/json
 *     produces:
 *       - application/json

 *     responses:
 *       '200':
 *         description: Gets a list of all users
*/

/* GET users listing. */
router.get('/', function (req, res, next) {
  res.send('respond with a resource')
})

module.exports = router
