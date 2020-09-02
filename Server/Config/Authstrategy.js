const LocalStrategy = require('passport-local').Strategy;
const User = require('../Models/User');
const bcrypt = require('bcryptjs');

function authConfig(passport) {

    const authenticateUser = (email, password, done) => {
        User.findOne({ email }, async function (err, user) {
            // const hashedPassword = await bcrypt.hash(password, 10);
            console.log("user ", user);

            if (err) {
                return done(err);
            };
            if (!user) {
                console.log("Incorrect username ")
                return done(null, false, { message: "Incorrect username." })
            };
            const checkPassword = await bcrypt.compare(password, user.password);
            console.log("checkPassword ", checkPassword);

            if (checkPassword) {
                console.log("Correct password ")
                return done(null, user);
            } else {
                console.log("Incorrect password ")
                return done(null, false, { message: "Incorrect password." })
            };
        })
    };

    passport.use(new LocalStrategy({ usernameField: 'email' }, authenticateUser))

    passport.serializeUser(function (user, done) {
        done(null, user.id);
    });

    passport.deserializeUser(function (id, done) {
        User.findById(id, function (err, user) {
            done(err, user);
        })
    });
};

module.exports = authConfig;