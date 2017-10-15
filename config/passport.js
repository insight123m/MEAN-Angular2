var LocalStrategy = require('passport-local').Strategy;
var User = require('../models/user');

module.exports = (passport) => {

  passport.serializeUser(function(user, done) {
    done(null, user.id);
  });

  passport.deserializeUser(function(id, done) {
    User.findById(id, function(err, user) {
      done(err, user);
    })
  });

  passport.use('local-login', new LocalStrategy({
    usernameField : 'username',
    passwordField : 'password',
    passReqToCallback : true
  }, function(req, username, password, done) {
    console.log("__________________________login" + username + password);
    User.findOne({ 'username': username }, function(err, user) {
      if (err)
        return done(err);
      if (!user)
        return done(null, false);
      if (!user.comparePassword(password))
        return done(null, false);
      return done(null, user);
    });
  }));

  passport.use('local-signup', new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password',
    passReqToCalback: true
  }, function(req, email, password, done) {
    process.nextTick(function() {
      if(err)
        return done(err);
      if(user)
        return done(null, false);
      var newUser = new User();
      newUser.local.email    = email;
      newUser.local.password = password;
      newUser.save(function(err) {
        if (err)
          throw err;
        return done(null, newUser);
      });
    });
  }));

}
