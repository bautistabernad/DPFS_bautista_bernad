const fs = require('fs');
const path = require('path');

const usersFilePath = path.join(__dirname, '../../data/users.json');

function userLoggedMiddleware(req, res, next) {
    res.locals.userLogged = false;

    if (req.cookies.userEmail) {
        const users = JSON.parse(
            fs.readFileSync(usersFilePath, 'utf-8')
        );

        const userFromCookie = users.find(user => user.email == req.cookies.userEmail);

        if (userFromCookie) {
            req.session.userLogged = userFromCookie;
        }
    }

    if (req.session.userLogged) {
        res.locals.userLogged = req.session.userLogged;
    }

    next();
}

module.exports = userLoggedMiddleware;