const fs = require('fs');
const path = require('path');
const bcrypt = require('bcryptjs');
const db = require('../../database/models');
const { validationResult } = require('express-validator');



const usersController = {
    login: (req, res) => {
        res.render('users/login', {
            errors: {},
            oldData: {}
        });
    },
    processLogin: async (req, res) => {
        try {
            const resultValidation = validationResult(req);

            if (!resultValidation.isEmpty()) {
                return res.render('users/login', {
                    errors: resultValidation.mapped(),
                    oldData: req.body
                });
            }

            const userToLogin = await db.User.findOne({
                where: {
                    email: req.body.email
                }
            });

            req.session.userLogged = userToLogin;

            if (req.body.remember) {
                res.cookie('userEmail', userToLogin.email, {
                    maxAge: 1000 * 60 * 60 * 24 * 7
                });
            }

            return res.redirect('/users/profile');

        } catch (error) {
            console.log(error);
            res.send('Error al iniciar sesión');
        }
    },
    store: async (req, res) => {
        try {
            const resultValidation = validationResult(req);

            if (!resultValidation.isEmpty()) {
                return res.render('users/register', {
                    errors: resultValidation.mapped(),
                    oldData: req.body
                });
            }

            await db.User.create({
                firstName: req.body.firstName,
                lastName: req.body.lastName,
                email: req.body.email,
                password: bcrypt.hashSync(req.body.password, 10),
                category: req.body.category,
                image: req.file ? req.file.filename : 'default-user.png'
            });

            res.redirect('/users/login');

        } catch (error) {
            console.log(error);
            res.send('Error al registrar usuario');
        }
    },

    register: (req, res) => {
        res.render('users/register', {
            errors: {},
            oldData: {}
        });
    },

    profile: async (req, res) => {
        try {
            const user = await db.User.findByPk(req.session.userLogged.id);

            res.render('users/profile', {
                user: user
            });

        } catch (error) {
            console.log(error);
            res.send('Error al cargar perfil');
        }
    },
    edit: async (req, res) => {
        try {
            const user = await db.User.findByPk(req.session.userLogged.id);

            res.render('users/editProfile', {
                user: user
            });

        } catch (error) {
            console.log(error);
            res.send('Error al cargar formulario de edición');
        }
    },

    update: async (req, res) => {
        try {
            const user = await db.User.findByPk(req.session.userLogged.id);

            await db.User.update({
                firstName: req.body.firstName,
                lastName: req.body.lastName,
                email: req.body.email,
                category: req.body.category,
                image: req.file ? req.file.filename : user.image
            }, {
                where: {
                    id: req.session.userLogged.id
                }
            });

            const updatedUser = await db.User.findByPk(req.session.userLogged.id);

            req.session.userLogged = updatedUser;

            if (req.cookies.userEmail) {
                res.cookie('userEmail', updatedUser.email, {
                    maxAge: 1000 * 60 * 60 * 24 * 7
                });
            }

            res.redirect('/users/profile');

        } catch (error) {
            console.log(error);
            res.send('Error al editar usuario');
        }
    },
    logout: (req, res) => {
        res.clearCookie('userEmail');

        req.session.destroy();

        return res.redirect('/');
    }
};

module.exports = usersController;