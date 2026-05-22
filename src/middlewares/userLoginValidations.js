const { body } = require('express-validator');
const bcrypt = require('bcryptjs');
const db = require('../../database/models');

const userLoginValidations = [
    body('email')
        .notEmpty().withMessage('El email es obligatorio')
        .bail()
        .isEmail().withMessage('Debes ingresar un email válido')
        .bail()
        .custom(async (value) => {
            const user = await db.User.findOne({
                where: {
                    email: value
                }
            });

            if (!user) {
                throw new Error('Este email no se encuentra registrado');
            }

            return true;
        }),

    body('password')
        .notEmpty().withMessage('La contraseña es obligatoria')
        .bail()
        .custom(async (value, { req }) => {
            const user = await db.User.findOne({
                where: {
                    email: req.body.email
                }
            });

            if (user) {
                const passwordOk = bcrypt.compareSync(value, user.password);

                if (!passwordOk) {
                    throw new Error('La contraseña es incorrecta');
                }
            }

            return true;
        })
];

module.exports = userLoginValidations;