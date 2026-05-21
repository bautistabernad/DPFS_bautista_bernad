const db = require('../../database/models');

async function userLoggedMiddleware(req, res, next) {
    res.locals.userLogged = false;

    if (req.cookies.userEmail && !req.session.userLogged) {
        try {
            const userFromCookie = await db.User.findOne({
                where: {
                    email: req.cookies.userEmail
                }
            });

            if (userFromCookie) {
                req.session.userLogged = userFromCookie;
            }

        } catch (error) {
            console.log(error);
        }
    }

    if (req.session.userLogged) {
        res.locals.userLogged = req.session.userLogged;
    }

    next();
}

module.exports = userLoggedMiddleware;