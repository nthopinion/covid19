const Pusher = require('pusher');
const getUrls = require('get-urls');

const UserDao = require('../models/questionDao')

const parseToken = require('./common');
const User = require('./user');
//import { parseToken } from './common';

const config = require('../config')


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
      try{
        const jwtToken = req.body;
        const user = parseToken(jwtToken.jwt);
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
      }catch(error){
        console.log(error);
        res.status(403).send("Could not verify user");
        return;
      }
    }

    async getUser (email) {
      const user = await this.userDao.getUser(user.email);
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
