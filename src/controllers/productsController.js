const fs = require('fs');
const path = require('path');

const productsFilePath = path.join(__dirname, '../../data/products.json');

const products = JSON.parse(
    fs.readFileSync(productsFilePath, 'utf-8')
);

const productsController = {

    detail: (req, res) => {
        const products = JSON.parse(
            fs.readFileSync(productsFilePath, 'utf-8')
        );

        const product = products.find(product => product.id == req.params.id);

        res.render('products/productDetail', {
            product: product
        });
    },

    cart: (req, res) => {
        res.render('products/productCart');
    },

    create: (req, res) => {
        res.render('products/productCreate');
    },

    edit: (req, res) => {
        const products = JSON.parse(
            fs.readFileSync(productsFilePath, 'utf-8')
        );

        const product = products.find(product => product.id == req.params.id);

        res.render('products/productEdit', {
            product: product
        });
    },
    list: (req, res) => {
        const products = JSON.parse(
            fs.readFileSync(productsFilePath, 'utf-8')
        );

        res.render('products/productsList', {
            products: products
        });
    },
    store: (req, res) => {
        const products = JSON.parse(
            fs.readFileSync(productsFilePath, 'utf-8')
        );

        const newProduct = {
            id: products.length > 0 ? products[products.length - 1].id + 1 : 1,
            name: req.body.name,
            description: req.body.description,
            image: req.body.image,
            category: req.body.category,
            level: req.body.level,
            price: Number(req.body.price)
        };

        products.push(newProduct);

        fs.writeFileSync(productsFilePath, JSON.stringify(products, null, 2));

        res.redirect('/products');
    },
    update: (req, res) => {
        const products = JSON.parse(
            fs.readFileSync(productsFilePath, 'utf-8')
        );

        const id = req.params.id;

        const updatedProducts = products.map(product => {
            if (product.id == id) {
                return {
                    id: product.id,
                    name: req.body.name,
                    description: req.body.description,
                    image: req.body.image,
                    category: req.body.category,
                    level: req.body.level,
                    price: Number(req.body.price)
                };
            }

            return product;
        });

        fs.writeFileSync(productsFilePath, JSON.stringify(updatedProducts, null, 2));

        res.redirect('/products');
    },
    destroy: (req, res) => {
        const products = JSON.parse(
            fs.readFileSync(productsFilePath, 'utf-8')
        );

        const id = req.params.id;

        const finalProducts = products.filter(product => product.id != id);

        fs.writeFileSync(productsFilePath, JSON.stringify(finalProducts, null, 2));

        res.redirect('/products');
    },
}
module.exports = productsController;