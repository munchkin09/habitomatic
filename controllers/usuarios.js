var Usuarios = require('../models/mUsuarios');
var Habitos = require('../models/mHabitos');

exports.Home = function(req,res)
{
  var data = { user_id : req.user._id }
  Habitos.ListarHabitos(data, function(err, resultado)
  {
    res.render('users/home', { habitos : resultado, nombre : req.user.username });
  });
}
