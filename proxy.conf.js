const API_URL = process.env.API_URL || 'http://localhost:3000'; // Fallback to a default URL

const PROXY_CONFIG = {
  "/api": {
    "target": API_URL,
    "secure": false,
    "logLevel": "debug",
    "pathRewrite": { "^/api": "" }
  }
};

module.exports = PROXY_CONFIG;
