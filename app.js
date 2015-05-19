var express = require('express');
var app = express();
var session = require('express-session');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var authManager = require('./auth')

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
app.use(authManager.passport.initialize());
app.use(authManager.passport.session());




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
                   res.render('index', { title : 'Bienvenido a Habit Checker' });
                   res.end();
                   break;
            }
  }
});

app.get('/', function(req, res){ res.render('index') });

app.post('/auth/login',
  passport.authenticate('local', { defaultRedirect: '/home',
                                   failureRedirect: '/',
                                   failureFlash: true })
);


app.get('/auth/signup', function(req, res){
   res.render('users/signup',{title:'Registro mediante email'});
});

/* [POST] Handle Registration */
app.post('/auth/signup', authManager.passport.authenticate('signup', {
   defaultRedirect: '/home',
   failureRedirect: '/auth/signup',
   failureFlash : false
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


app.listen(3001);
