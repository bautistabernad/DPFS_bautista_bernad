const fs = require('fs');
const path = require('path');
const bcrypt = require('bcryptjs');

const usersFilePath = path.join(__dirname, '../../data/users.json');

const usersController = {
    login: (req, res) => {
        res.render('users/login');
    },
    processLogin: (req, res) => {
        const users = JSON.parse(
            fs.readFileSync(usersFilePath, 'utf-8')
        );

        const userToLogin = users.find(user => user.email == req.body.email);

        if (userToLogin) {
            const passwordOk = bcrypt.compareSync(req.body.password, userToLogin.password);

            if (passwordOk) {
                req.session.userLogged = userToLogin;

                if (req.body.remember) {
                    res.cookie('userEmail', userToLogin.email, {
                        maxAge: 1000 * 60 * 60 * 24 * 7
                    });
                }

                return res.redirect('/users/profile');
            }
        }

        return res.render('users/login', {
            error: 'Email o contraseña incorrectos'
        });
    },

    register: (req, res) => {
        res.render('users/register');
    },

    store: (req, res) => {
        const users = JSON.parse(
            fs.readFileSync(usersFilePath, 'utf-8')
        );

        const newUser = {
            id: users.length > 0 ? users[users.length - 1].id + 1 : 1,
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            email: req.body.email,
            password: bcrypt.hashSync(req.body.password, 10),
            category: req.body.category,
            image: req.file ? req.file.filename : 'default-user.png'
        };

        users.push(newUser);

        fs.writeFileSync(usersFilePath, JSON.stringify(users, null, 2));

        res.redirect('/users/login');
    },
    profile: (req, res) => {
        res.render('users/profile', {
            user: req.session.userLogged
        });
    },
    logout: (req, res) => {
        res.clearCookie('userEmail');

        req.session.destroy();

        return res.redirect('/');
    }
};

module.exports = usersController;