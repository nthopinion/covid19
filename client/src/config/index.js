const basedConfig = {
    "domainURL": process.env.REACT_APP_DOMAIN_URl,
    "corsProxyUrl": process.env.REACT_APP_CORS_PROXY_URl,
    "pusher": {
      "key": process.env.REACT_APP_CORS_PUSHER_KEY,
      "cluster": process.env.REACT_APP_CORS_PUSHER_CLUSTER,
      "channel": process.env.REACT_APP_CORS_PUSHER_CHANNEL,
      "event": process.env.REACT_APP_CORS_PUSHER_EVENT
    }
};

export default basedConfig;
  
