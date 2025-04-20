const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const mongoose = require("mongoose");
const Users = require("../models/user"); 
const User = mongoose.model("users"); 

passport.use(
  new LocalStrategy(
    {
      usernameField: "email", // Email is used as the username
    },
    async (email, password, done) => {
      try {
        // Look for the user in the database by their email
        const user = await User.findOne({ email }).exec();

        // If no user is found
        if (!user) {
          return done(null, false, {
            message: "Incorrect username.",
          });
        }

        // If the password is incorrect
        if (!user.validPassword(password)) {
          return done(null, false, {
            message: "Incorrect password.",
          });
        }

        // Authentication successful
        return done(null, user);
      } catch (err) {
        // If there was an error with the process
        return done(err);
      }
    }
  )
);
