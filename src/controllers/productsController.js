const fs = require('fs');
const path = require('path');

const db = require('../../database/models');
const { Op } = require('sequelize');

const productsFilePath = path.join(__dirname, '../../data/products.json');

const products = JSON.parse(
    fs.readFileSync(productsFilePath, 'utf-8')
);

const productsController = {

    detail: async (req, res) => {
        try {
            const product = await db.Product.findByPk(req.params.id, {
                include: [
                    { association: 'category' }
                ]
            });

            res.render('products/productDetail', {
                product: product
            });

        } catch (error) {
            console.log(error);
            res.send('Error al cargar el detalle del producto');
        }
    },

    cart: (req, res) => {
        res.render('products/productCart');
    },

    create: async (req, res) => {
        try {
            const categories = await db.Category.findAll();

            res.render('products/productCreate', {
                categories: categories
            });

        } catch (error) {
            console.log(error);
            res.send('Error al cargar formulario de creación');
        }
    },

    edit: async (req, res) => {
        try {
            const product = await db.Product.findByPk(req.params.id);

            if (product.teacherId != req.session.userLogged.id && req.session.userLogged.category != 'admin') {
                return res.send('No tenés permiso para editar este producto');
            }

            const categories = await db.Category.findAll();

            res.render('products/productEdit', {
                product: product,
                categories: categories
            });

        } catch (error) {
            console.log(error);
            res.send('Error al cargar formulario de edición');
        }
    },
    list: async (req, res) => {
        try {
            const products = await db.Product.findAll({
                include: [
                    { association: 'category' }
                ]
            });

            res.render('products/productsList', {
                products: products
            });

        } catch (error) {
            console.log(error);
            res.send('Error al cargar productos');
        }
    },
    store: async (req, res) => {
        try {
            await db.Product.create({
                name: req.body.name,
                description: req.body.description,
                image: req.file ? req.file.filename : 'default-product.png',
                level: req.body.level,
                price: req.body.price,
                categoryId: req.body.categoryId,
                teacherId: req.session.userLogged.id
            });

            res.redirect('/products');

        } catch (error) {
            console.log(error);
            res.send('Error al crear producto');
        }
    },
    update: async (req, res) => {
        try {
            const product = await db.Product.findByPk(req.params.id);

            if (!product) {
                return res.send('Producto no encontrado');
            }

            if (!req.session.userLogged) {
                return res.redirect('/users/login');
            }

            if (product.teacherId != req.session.userLogged.id && req.session.userLogged.category != 'admin') {
                return res.send('No tenés permiso para editar este producto');
            }

            await db.Product.update({
                name: req.body.name,
                description: req.body.description,
                image: req.file ? req.file.filename : product.image,
                level: req.body.level,
                price: req.body.price,
                categoryId: req.body.categoryId
            }, {
                where: {
                    id: req.params.id
                }
            });

            res.redirect('/products');

        } catch (error) {
            console.log(error);
            res.send('Error al editar producto');
        }
    },
    destroy: async (req, res) => {
        try {
            const product = await db.Product.findByPk(req.params.id);

            if (!product) {
                return res.send('Producto no encontrado');
            }

            if (!req.session.userLogged) {
                return res.redirect('/users/login');
            }

            if (product.teacherId != req.session.userLogged.id && req.session.userLogged.category != 'admin') {
                return res.send('No tenés permiso para eliminar este producto');
            }

            await db.Product.destroy({
                where: {
                    id: req.params.id
                }
            });

            res.redirect('/products');

        } catch (error) {
            console.log(error);
            res.send('Error al eliminar producto');
        }
    },

    search: async (req, res) => {
        try {
            const search = req.query.keywords;

            const products = await db.Product.findAll({
                where: {
                    name: {
                        [Op.like]: `%${search}%`
                    }
                },
                include: [
                    { association: 'category' }
                ]
            });

            res.render('products/productsList', {
                products: products
            });

        } catch (error) {
            console.log(error);
            res.send('Error al buscar productos');
        }
    },
}
module.exports = productsController;