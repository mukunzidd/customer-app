// This is the entry file
// Requiring node modules
var express = require('express'),
    bodyParser = require('body-parser'),
    expressValidator = require('express-validator'),
    path = require('path'),
    mongojs = require('mongojs'),
    db = mongojs('customerapp', ['users']),
    app = express();

// View Engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// bodyParser Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

// Set static path
app.use(express.static(path.join(__dirname, 'public')));

// Global Vars
app.use(function(req, res, next){
    res.locals.errors = null;
    next();
});

// Middleware for expressValidator
app.use(expressValidator({
  errorFormatter: function(param, msg, value) {
      var namespace = param.split('.')
      , root    = namespace.shift()
      , formParam = root;

    while(namespace.length) {
      formParam += '[' + namespace.shift() + ']';
    }
    return {
      param : formParam,
      msg   : msg,
      value : value
    };
  }
}));

// Routes Handler
app.get('/', function(req, res){
    db.users.find(function (err, docs) {
        console.log(docs);
        res.render('index', {
            title:'Users',
            users: docs
        });
    })
});

app.post('/users/add', function(req, res){

  req.checkBody('first_name', 'Frist Name is required').notEmpty();
  req.checkBody('last_name', 'Last Name is required').notEmpty();
  req.checkBody('email', 'Email is required').notEmpty();

  var errors = req.validationErrors();

  if (errors){
      res.render('index', {
        title:'Users',
        users: users,
        errors: errors
    });
  } else {
      var newUser = {
        first_name: req.body.first_name,
        last_name: req.body.last_name,
        email: req.body.email
    }

db.users.insert(newUser, function(err, result){
    if(err){
        console.log(err);
    }
    res.redirect('/');
    });
  }
});
// Create a server
app.listen(3000, function(){
    console.log('Server Started on Port 3000...')
})

