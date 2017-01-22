// This is the entry file
// Requiring node modules
var express = require('express');
var bodyParser = require('body-parser');
var path = require('path');

// Initialise a var for the entry file
var app = express();

// View Engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// bodyParser Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

// Set statis path
app.use(express.static(path.join(__dirname, 'public')));

// Objects to pass in views
var users = [
    {
        name:'Jane',
        lastname:'Doe',
        email:'janedoe@gmail.com'
    },
    {
        name:'John',
        lastname:'Doe',
        email:'johndoe@gmail.com'
    },
    {
        name:'Jill',
        lastname:'Doe',
        email:'jilldoe@gmail.com'
    }
]
// Routes Handler
app.get('/', function(req, res){
    res.render('index', {
        title:'Users',
        users: users
    });
});

// Create a server
app.listen(3000, function(){
    console.log('Server Started on Port 3000...')
})

