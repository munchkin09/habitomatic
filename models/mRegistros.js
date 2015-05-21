var cnnDb = require('../controllers/connection');    //  controlador conexion
var Util = require('../utiles');

var registroSchema = cnnDb.Mongoose.Schema({
   habito_id : { type : cnnDb.ObjectId, index : true },
   desencadenante : { type : String, enum : Util.EnumDesencadenantes },
   gratificacion : { type : String, enum : Util.EnumGratificaciones },
   intensidad : { type : Number, min : 1, max : 10 },
   estado : { type : String, enum : Util.EnumEstados },
   created : { type : Date, default : Date.now() }
});

var Registros = cnnDb.Mongoose.model('Registros', registroSchema);

exports.SalvarRegistro = function(data, next)
{
  var nuevo_registro = new Registros(data)
  nuevo_registro.save(function(err, resultado)
  {
      console.log(err);
      if(err) next(err, null);
      else {
        next(null, resultado);
      }
  });
}
