const express = require('express');
const app = express();
const port = process.env.PORT || 3000;
const mongoose = require('mongoose');
const passport = require('passport');
const flash = require('connect-flash');


const morgan = require('morgan');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const session = require('express-session');


const configDB = require('./config/database.js');

mongoose.connect(configDB.url);

app.use(morgan('dev'));
app.use(cookieParser());
app.use(bodyParser());

app.set('view engine', 'hbs');

app.use(session({secret: 'trytoshowalittlekindness:)'}));
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());

require('./app/routes.js')(app, passport);

app.listen(port, () => {
    console.log('Connecting to ' + port); 
});

