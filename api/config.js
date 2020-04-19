var config = {};
config.endpoint = process.env["DBENDPOINT"];
config.key = process.env["DBKEY"];

config.databaseId = process.env["DBID"];
config.containerId = process.env["CONTAINERID"];

config.pusher = {
  appId: process.env["PUSHER_ID"],
  key: process.env["PUSHER_KEY"],
  secret: process.env["PUSHER_SECRET"],
  cluster: process.env["PUSHER_CLUSTER"],
  channel: process.env["PUSHER_CHANNEL"]
};
