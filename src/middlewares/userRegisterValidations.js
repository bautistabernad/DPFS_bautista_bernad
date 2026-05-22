const { body } = require('express-validator');
const db = require('../../database/models');
const path = require('path');

const userRegisterValidations = [
    body('firstName')
        .notEmpty().withMessage('El nombre es obligatorio')
        .bail()
        .isLength({ min: 2 }).withMessage('El nombre debe tener al menos 2 caracteres'),

    body('lastName')
        .notEmpty().withMessage('El apellido es obligatorio')
        .bail()
        .isLength({ min: 2 }).withMessage('El apellido debe tener al menos 2 caracteres'),

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

            if (user) {
                throw new Error('Este email ya se encuentra registrado');
            }

            return true;
        }),

    body('password')
        .notEmpty().withMessage('La contraseña es obligatoria')
        .bail()
        .isLength({ min: 8 }).withMessage('La contraseña debe tener al menos 8 caracteres'),

    body('image')
        .custom((value, { req }) => {
            if (req.file) {
                const acceptedExtensions = ['.jpg', '.jpeg', '.png', '.gif'];
                const fileExtension = path.extname(req.file.originalname).toLowerCase();

                if (!acceptedExtensions.includes(fileExtension)) {
                    throw new Error('La imagen debe ser JPG, JPEG, PNG o GIF');
                }
            }

            return true;
        })
];

module.exports = userRegisterValidations;