var config = {}

config.endpoint = #{dbEndPoint}#
config.key = #{dbEndPointKey}#

config.databaseId = 'QuestionList'
config.containerId = 'Items'



config.pusher = {
    appId: '968198',
    key: '99fd6f011f6f5a0d1565',
    secret: '68a401ea7bf8764f36a9',
    cluster: 'us3',
    channel: 'my-channel'
}
module.exports = config
