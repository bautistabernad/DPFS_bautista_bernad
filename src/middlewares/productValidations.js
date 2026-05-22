const { body } = require('express-validator');
const path = require('path');

const productValidations = [
    body('name')
        .notEmpty().withMessage('El nombre del producto es obligatorio')
        .bail()
        .isLength({ min: 5 }).withMessage('El nombre debe tener al menos 5 caracteres'),

    body('description')
        .notEmpty().withMessage('La descripción es obligatoria')
        .bail()
        .isLength({ min: 20 }).withMessage('La descripción debe tener al menos 20 caracteres'),

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

module.exports = productValidations;