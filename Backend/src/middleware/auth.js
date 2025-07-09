
function authenticateAdmin(req, res, next) {
    // Check if the user is authenticated
    if (!req.isAuthenticated()) {
       res.sendStatus(403).send('Access denied. You must be logged in as an admin.');
       return;
    }
    // If authenticated,go to next middleware
    next();
}

function authenticateUser(req, res, next) {
    // Check if the request has a valid token'
     if (!req.isAuthenticated()) {
       res.sendStatus(403).send('Access denied. You must be logged in as an admin.');
       return;
    }
    // If authenticated,go to next middleware
    next();
}

module.exports = {authenticateAdmin,authenticateUser};