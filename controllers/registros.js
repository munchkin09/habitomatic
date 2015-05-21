var Registros = require('../models/mRegistros');


exports.GetAddRegistro = function(req, res)
{
  res.render('registros/add_registro', {});
}
exports.PostAddRegistro = function(req, res)
{
  console.log(req.body);
  var data = {
      habito_id : req.body.habito_id,
      desencadenante : req.body.desencadenante,
      gratificacion : req.body.gratificacion,
      intensidad : req.body.intensidad,
      estado : req.body.estado
     }

  Registros.SalvarRegistro(data,function(err, resultado)
  {
      res.json({ status : 'ok'});
  });
}

exports.GetRegistrosPorHabito = function(req, res)
{

}
