function teacherMiddleware(req, res, next) {
    if (req.session.userLogged.category !== 'teacher' && req.session.userLogged.category !== 'admin') {
        return res.send('No tenés permiso para publicar clases');
    }

    next();
}

module.exports = teacherMiddleware;