const login = (req, res, next) => {
    res.json({ message: "Success! You've been logged in." });
};

const logout = (req, res, next) => {
    req.logout();
    res.json({ message: "Success! You've been logged out." });
};

const checkAuthenticated = (req, res, next) => {
    if (req.isAuthenticated()) {
        return next();
    }
    return res.json({ message: "Please login!" })
};

const checkNotAuthenticated = (req, res, next) => {
    if (req.isAuthenticated()) {
        return res.json({ message: "Authenticated!" })
    }
    return next();
};


module.exports = { login, logout, checkAuthenticated, checkNotAuthenticated }