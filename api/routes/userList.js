const Pusher = require('pusher');
const getUrls = require('get-urls');
const jose = require('jose');

const UserDao = require('../models/questionDao')

const config = require('../config')

class User{
      /**
   * Manages reading, adding, and updating Tasks in Cosmos DB
   * @param {string} id
   * @param {Date} registeredon
   * @param {string} npiidentifier
   * @param {string} role
   * @param {string} country
   * @param {string} profilelink
   * @param {string} anonymous
   * @param {string} profilestatus
   * @param {string} fullname
   * @param {string} email
   * @param {string} b2cid
   * @param {Date} lastsignintime
   */
    constructor(){
        this.id = null;
        var date = new Date();
        var timestamp = Math.floor(date.getTime()/1000.0);
        this.registeredon =timestamp;
        this.npiidentifier = "";
        this.role = "";
        this.country = "";
        this.profilelink = "";
        this.anonymous = true;
        this.profilestatus = "level 0";
        this.fullname = "";
        this.email = "";
        this.b2cid = "";
        this.lastsignintime = null;
        
    }


}

class UserList{
  /**
   * Handles the various APIs for displaying and managing tasks
   * @param {QuestionDao} userDao
   */
   constructor (userDao) {
     const {appId, key, secret, cluster, channel} = config.pusher
     this.userDao = userDao
     this.pusher = new Pusher({
       appId,
       key,
       secret,
       cluster,
       channel,
       useTLS: true
     });
   } 

    async showUsers (req, res, answered) {
      const querySpec = {
        query: "SELECT * from c"
      };
  
      let users = await this.userDao.find(querySpec, 'users')
      
      res.send(users)
    }

    async validateUser (req, res) {
      const jwtToken = req.body;
      const user = this.parsetoken(jwtToken.jwt);
      const verifiedUser = await this.userDao.getUser(user.email);
      user.profilestatus = "level 0";  //initializing the access
      if (verifiedUser !== undefined)
      {
          user.id = verifiedUser.id;
          user.npiidentifier = verifiedUser.npiidentifier;
          user.role = verifiedUser.role;
          user.country = verifiedUser.country;
          user.profilelink = verifiedUser.profilelink;
          user.anonymous = verifiedUser.anonymous;
          user.profilestatus = verifiedUser.profilestatus;
          user.email = verifiedUser.email;
          await this.userDao.updatesignintime(user);
      }
      res.send(user);
    }

    parsetoken(jwtToken)
    {
      const item = jose.JWT.decode(jwtToken);
      const user = new User();
      user.profilestatus = "level 0";
      user.fullname = item.given_name + " " + item.family_name;
      user.b2cid = item.sub;
      user.lastsignintime = item.auth_time;
      user.email = item.emails[0];
      return user;  
    }

    async addUser (req, res) {
      // console.log('req' + JSON.stringify(req.body))
      const item = req.body;
      const user = new User();
      user.npiidentifier = item.npiidentifier;
      user.role = item.role;
      user.country = item.country;
      user.profilelink = item.profilelink;
      user.anonymous = item.anonymous;
      user.profilestatus = "level 0";
      user.email = item.email;
      if (user.role.toLowerCase() !== "other")
      {
        user.profilestatus = "level 1";
      }
      const itemAdd = await this.userDao.addUser(user)
      res.send(itemAdd)
    }    

    async editUser (req, res) {
      let user = req.body
      
      await this.userDao.editUser(user);

      res.send('ok')
    }

    async deleteUser (req, res) {
      const { id } = req.body
      await this.userDao.deleteUser(id)
      res.send('ok')
    }

}
module.exports = UserList;