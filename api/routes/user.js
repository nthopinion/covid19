
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
module.exports = User;
