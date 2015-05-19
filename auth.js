var Err = require('./error_controller'),
    User = require('./models/mUsuarios')
    passport = require('passport'),
    LocalStrategy = require('passport-local').Strategy,
    bCrypt = require('bcryptjs');

passport.use('signup', new LocalStrategy({
    passReqToCallback : true
  },
  function(req, username, password, done) {
    findOrCreateUser = function(){
      // find a user in Mongo with provided username
      User.mUser.findOne({'username':username},function(err, user) {
        // In case of any error return
        if (err){
          Err.Log('Error in SignUp: '+err, "error");
          return done(err);
        }
        // already exists
        if (user) {
          Err.Log('User already exists', "warning");
          return done(null, false,
             req.flash('message','User Already Exists'));
        } else {
          // if there is no user with that email
          // create the user
          var newUser = new User.mUser();
          // set the user's local credentials
          newUser.username = req.body.username;
          newUser.password = createHash(password);
          // save the user & profile
          newUser.save(function(err,restUser,statsUser) {
               if (err){
                 Err.Log('Error in Saving user: '+err, "error");
                 throw err;
               }
               else{
               Err.Log('User Registration succesful', "default");
                  var data = {
                     user : restUser
                  };
                  done(null, data);
               }
          });
        }
     });
    };

    // Delay the execution of findOrCreateUser and execute
    // the method in the next tick of the event loop
    process.nextTick(findOrCreateUser);
  })
);


passport.use(new LocalStrategy(
  function(username, password, done) {
    User.mUser.findOne({ username: username }, function(err, user) {
      if (err) { return done(err); }
      if (!user) {
        return done(null, false, { message: 'Incorrect username.' });
      }
      if (!isValidPassword(user,password)) {
        return done(null, false, { message: 'Incorrect password.' });
      }
      return done(null, user);
    });
  }
));

var createHash = function(password){
   return bCrypt.hashSync(password, bCrypt.genSaltSync(10), null);
}

var isValidPassword = function(user, password){
  return bCrypt.compareSync(password, user.password);
}



passport.serializeUser(function(user, done) {
done(null, user);
});

passport.deserializeUser(function(user, done) {
  done(null, user);
});

exports.passport = passport;
