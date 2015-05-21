var cnnDb = require('../controllers/connection');    //  controlador conexion
var Util = require('../utiles');


var habitoSchema = cnnDb.Mongoose.Schema({
   usuario_id : { type : cnnDb.ObjectId, index : true },
   perspectiva : { type : String, enum : Util.EnumPerspectivas, default : 'positiva' },
   habito : { type : String },
   activo : { type : Boolean },
   created : { type : Date, default : Date.now },
   btn_color : { type : String },
   valores_default : { desencadenante : { type : String, enum : Util.EnumDesencadenantes },
      gratificacion : { type : String, enum : Util.EnumGratificaciones },
      intensidad : { type : Number },
      estado : { type : String, enum : Util.EnumEstados }}
});

var Habitos = cnnDb.Mongoose.model('habitos', habitoSchema);

exports.ListarHabitos = function(data, next)
{
   Habitos.find({ usuario_id : data.user_id, activo : true },'_id habito btn_color perspectiva',function(err, lstHabitos)
   {
      if(err) next(err,null);
      else
      {
         next(null,lstHabitos);
      }
   });
}

exports.SalvarHabito = function(data, next)
{
  var nuevo_habito = new Habitos(data);
  nuevo_habito.save(function(err, resultado)
  {
    console.dir(err);
    next(null, resultado);
  });
}
