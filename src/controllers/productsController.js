const productsController = {

    detail: (req, res) => {
        res.render('products/productDetail');
    },

    cart: (req, res) => {
        res.render('products/productCart');
    },

    create: (req, res) => {
        res.render('products/productCreate');
    },

    edit: (req, res) => {
        res.render('products/productEdit');
    },
    list: (req, res) => {
        res.render('products/productsList');
    },
};

module.exports = productsController;