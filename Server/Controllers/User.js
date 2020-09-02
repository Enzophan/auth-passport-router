const User = require('../Models/User');
const bcrypt = require('bcryptjs');


const createUser = async (req, res, next) => {
    console.log("req.body ", req.body)

    try {
        const { name, email, password, type } = req.body;
        const hashedPassword = await bcrypt.hash(password, 10);

        const user = new User({ name, email, password: hashedPassword, type });

        await user.save((err) => {
            if (err) {
                const error = new Error('User could not be created');
                error.status = 406;
                return next(err, error);
            };
            return res.send({
                message: "Success! User added successfully",
                user
            })
        })
    } catch (err) {
        next(err);
        return res.status(400).json({ message: 'name, email, password is required.' })
    }

};

module.exports = { createUser };

