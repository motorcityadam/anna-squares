module.exports = {
  db: "mongodb://localhost/anna-squares-test",
  port: 3001,
  app: {
    name: "AnnaSquares (test)"
  },
  facebook: {
    clientID: "APP_ID",
    clientSecret: "APP_SECRET",
    callbackURL: "http://localhost:3000/auth/facebook/callback"
  },
  twitter: {
    clientID: "CONSUMER_KEY",
    clientSecret: "CONSUMER_SECRET",
    callbackURL: "http://localhost:3000/auth/twitter/callback"
  },
  github: {
    clientID: "APP_ID",
    clientSecret: "APP_SECRET",
    callbackURL: "http://localhost:3000/auth/github/callback"
  },
  google: {
    clientID: "APP_ID",
    clientSecret: "APP_SECRET",
    callbackURL: "http://localhost:3000/auth/google/callback"
  }
}