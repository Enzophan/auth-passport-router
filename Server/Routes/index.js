const User = require('./User');
const Auth = require('./Auth');

module.exports = function(app){
    app.use('/api/user', User);
    app.use('/auth', Auth);
}