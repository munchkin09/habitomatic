var cnnDb = require('../controllers/connection');    //  controlador conexion

  var userSchema = cnnDb.Mongoose.Schema(
  {
     username : String,
     password : String,
     created: { type: Date, default: Date.now },
     updated: { type : Date, default: Date.now }
  });

  var User = cnnDb.Mongoose.model('Usuarios', userSchema);


  exports.schUser = userSchema;
  exports.mUser = User;
