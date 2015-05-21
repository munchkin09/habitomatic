var mongoose = require('mongoose');
var errorController = require('../error_controller');

//mongoose.connect('mongodb://web_writeRead:fdasf354t541e3290dsj838@'+settings.SERVER_DB+':'+settings.MONGO_PORT+'/kzdog', function(err)d
mongoose.connect('mongodb://web_writeRead:fdasf354t541e3290dsj838@localhost:27017/habit_checker', function(err)
{
    if(err){
      errorController.Log(err, "error");
    }else{
      errorController.Log('Connected to mongodb! port: 27017', "start");
    }
});

exports.Mongoose = mongoose;
exports.ObjectId = mongoose.Schema.Types.ObjectId;
