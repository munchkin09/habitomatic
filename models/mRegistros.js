var cnnDb = require('../controllers/connection');    //  controlador conexion

var estados = 'animado normal bajón'.split(' ');
var desencadenantes = 'ansiedad miedo dolor ira deseo gratificacion felicidad salud'.split(' ');

var gratificaciones = 'si no'.split(' ');
var registroSchema = cnnDb.Mongoose.Schema({
   habito_id : { type : cnnDb.ObjectId, index : true },
   desencadenante : { type : String, enum : desencadenantes },
   gratificacion : { type : String, enum : gratificaciones },
   intensidad : { type : Number, min : 1, max : 10 },
   estados : { type : String, enum : estados },
   created : { type : Date, default : Date.now() }
});

var Registros = cnnDb.Mongoose.model('Registros', registroSchema);


exports.EnumEstados = estados;
exports.EnumDesencadenantes = desencadenantes;
