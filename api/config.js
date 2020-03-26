var config = {}
config.endpoint = process.env["DBENDPOINT"]
config.key = process.env["DBKEY"]

config.databaseId = process.env["DBID"]
config.containerId = process.env["CONTAINERID"]



config.pusher = {
    appId: process.env["REACT_APP_CORS_PUSHER_ID"]
    key: process.env["REACT_APP_CORS_PUSHER_KEY"]
    secret: process.env["REACT_APP_CORS_PUSHER_SECRET"]
    cluster: process.env["REACT_APP_CORS_PUSHER_CLUSTER"]
    channel: process.env["REACT_APP_CORS_PUSHER_CHANNEL"]
}
module.exports = config
