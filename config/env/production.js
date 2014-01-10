module.exports = {
  db: process.env.MONGODB_URL || "mongodb://localhost/prod",
  dataStore: {
    host: process.env.REDIS_HOST || "",
    port: process.env.REDIS_PORT || 13981,
    password: process.env.REDIS_PASSWORD || ""
  },
  app: {
    name: process.env.APP_NAME || "APP_NAME (production)"
  },
  sessionSecret: process.env.SESSION_SECRET,
  facebook: {
    appID:       process.env.FACEBOOK_APP_ID || "FACEBOOK_APP_ID",
    appSecret:   process.env.FACEBOOK_APP_SECRET || "FACEBOOK_APP_ID",
    callbackURL: "http://localhost:8080/auth/facebook/callback"
  },
  twitter: {
    consumerID:     process.env.TWITTER_CONSUMER_KEY || "TWITTER_CONSUMER_KEY",
    consumerSecret: process.env.TWITTER_CONSUMER_SECRET || "TWITTER_CONSUMER_SECRET",
    callbackURL:    "http://localhost:8080/auth/twitter/callback"
  },
  github: {
    clientID:     process.env.GITHUB_CLIENT_ID || "GITHUB_CLIENT_ID",
    clientSecret: process.env.GITHUB_CLIENT_SECRET || "GITHUB_CLIENT_SECRET",
    callbackURL:  "http://localhost:8080/auth/github/callback"
  },
  google: {
    clientID:     process.env.GOOGLE_CLIENT_ID || "GOOGLE_CLIENT_ID",
    clientSecret: process.env.GOOGLE_CLIENT_SECRET || "GOOGLE_CLIENT_SECRET",
    callbackURL:  "http://localhost:8080/auth/google/callback"
  }
};