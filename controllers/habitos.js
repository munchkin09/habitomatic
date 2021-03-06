var Habitos = require('../models/mHabitos');

exports.GetAddHabit = function(req, res)
{
  res.render('habitos/add_habito', { title : 'Añadir hábito!'});
}

exports.PostAddHabit = function(req, res)
{
  var data = {
    usuario_id : req.user._id,
    habito: req.body.nombre_habito,
    perspectiva: req.body.progresion_habito,
    btn_color : req.body.color_habito,
    activo : true,
    valores_default : {
      desencadenante : req.body.default_desencadenante,
      gratificacion : req.body.default_gratificacion,
      intensidad : req.body.default_intensidad,
      estado : req.body.default_estado
    }
  }
  Habitos.SalvarHabito(data,function()
  {
      res.json({ status : 'ok' });
  });
}

exports.PutChangeHabit = function(req, res)
{

}

exports.GetHabitData = function(req, res)
{
  console.log(req.params);
  res.render('habitos/stats_por_habito',{});
}
