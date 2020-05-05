const jose = require('jose');
const User = require('./user');

const parseToken = (jwtToken) => {
      const item = jose.JWT.decode(jwtToken);
      const user = new User();
      user.profilestatus = "level 0";
      user.fullname = item.given_name + " " + item.family_name;
      user.b2cid = item.sub;
      user.lastsignintime = item.auth_time;
      user.email = item.emails[0];
      return user;  
};

module.exports = parseToken;