var express = require('express');
var app = express();
var session = require('express-session');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var flash = require('connect-flash');
var auth = require('./auth');

var Usuarios = require('./controllers/usuarios'),
    Registros = require('./controllers/registros'),
    Habitos = require('./controllers/habitos');

app.set('view engine', 'jade');

app.use(express.static('public'));
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(session({
   secret: '3000malhabitoseh?!',
   resave: false,
   saveUninitialized: true
}));
app.use(auth.passport.initialize());
app.use(auth.passport.session());
app.use(flash());

app.use(function (req, res, next)
{
  var path = req._parsedUrl.path;
  var arrUrl = path.split("/");
  if(req.user)
  {
    next();
  }
  else {
    switch(arrUrl[1])
            {
                case 'auth':
                   next();
                   break;
                default:
                   res.render('index', { title : 'Bienvenido a Habit-O-matic' });
                   res.end();
                   break;
            }
  }
});

app.get('/', function(req, res){ res.render('index') });

app.post('/auth/login',
  passport.authenticate('local', { successRedirect: '/home',
                                   failureRedirect: '/' })
);


app.get('/auth/signup', function(req, res){
    if(req.flash('error') == 'Usuario existente.')
    {
      res.render('users/signup', {title:'Registro mediante email', message : req.flash('error') });
    }
    else
    {
      res.render('users/signup', {title:'Registro mediante email' });
    }
});

/* [POST] Handle Registration */
app.post('/auth/signup', auth.passport.authenticate('signup', {
   defaultRedirect: '/home',
   failureRedirect: '/auth/signup',
   failureFlash : true
}));

app.get('/logout', function(req, res)
 {
    req.logout();
    res.redirect('/');
 });


app.get('/home', Usuarios.Home);

app.get('/add_habit', Habitos.GetAddHabit /* Después de cada llamada se pueden añadir más callbacks */);
app.post('/add_habit', Habitos.PostAddHabit);
app.put('/change_habit', Habitos.PutChangeHabit);

app.get('/registros_por_habito', Registros.GetRegistrosPorHabito);
app.get('/add_registro_por_habito', Registros.GetAddRegistro);
app.post('/add_registro_por_habito', Registros.PostAddRegistro);

app.get('/stats_habito/:id', Habitos.GetHabitData)



app.listen(3001);
