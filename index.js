const express = require('express');
require('dotenv').config();

const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');

const mongoose = require('mongoose');

const passport = require('passport');
const flash = require('express-flash');
const session = require('express-session');

const app = express();

const configDb = require('./DB/index');
mongoose
    .connect(configDb.getDbConnectionString(), { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        console.log('Connected to the Database successfully');
    });

// Passport Init
const authConfig = require('./Server/Config/Authstrategy');
authConfig(passport);

app.use(flash());
app.use(session({
    secret: process.env.APP_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
        expires: 600000
    }
}));

app.use(passport.initialize());
app.use(passport.session());

// Middlewares
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

// Router
require('./Server/Routes')(app);

// 404 catcher
app.use((req, res, next) => {
    const error = new Error(`${req.originalUrl} -- Not found`);
    error.status = 404;
    next(error);
});

// Error handling
app.use((error, req, res, next) => {
    res.status(error.status || 500);
    res.send({ message: `Error! ${error.message}`, error });
});


const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Server running on port ${port}`))