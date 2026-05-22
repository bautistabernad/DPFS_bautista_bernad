const db = require('../../../database/models');

const apiProductsController = {
    list: async (req, res) => {
        try {
            const products = await db.Product.findAll({
                include: [
                    { association: 'category' }
                ]
            });

            const categories = await db.Category.findAll({
                include: [
                    { association: 'products' }
                ]
            });

            const countByCategory = {};

            categories.forEach(category => {
                countByCategory[category.name] = category.products.length;
            });

            const productsData = products.map(product => {
                return {
                    id: product.id,
                    name: product.name,
                    description: product.description,
                    category: product.category ? product.category.name : null,
                    detail: `http://localhost:3000/api/products/${product.id}`
                };
            });

            return res.json({
                count: products.length,
                countByCategory: countByCategory,
                products: productsData
            });

        } catch (error) {
            console.log(error);
            return res.status(500).json({
                error: 'Error al obtener productos'
            });
        }
    },

    detail: async (req, res) => {
        try {
            const product = await db.Product.findByPk(req.params.id, {
                include: [
                    { association: 'category' },
                    { association: 'teacher' }
                ]
            });

            if (!product) {
                return res.status(404).json({
                    error: 'Producto no encontrado'
                });
            }

            return res.json({
                id: product.id,
                name: product.name,
                description: product.description,
                image: `http://localhost:3000/images/products/${product.image}`,
                level: product.level,
                price: product.price,
                category: product.category ? product.category.name : null,
                teacher: product.teacher ? `${product.teacher.firstName} ${product.teacher.lastName}` : null,
                createdAt: product.createdAt,
                updatedAt: product.updatedAt
            });

        } catch (error) {
            console.log(error);
            return res.status(500).json({
                error: 'Error al obtener producto'
            });
        }
    }
};

module.exports = apiProductsController;