const products = require('../data/ProductData');
const _ = require('underscore');
const Product = require('../models/product');
const Category = require('../models/category');

exports.getAll = (req, res) => {
    Product.getAll().then(
        function (allProducts) {
            res.json(allProducts);
        }
    ).catch(err => {
        return res.status(400).send({
            error : "Error while getting all products"
        })
    })
    // res.json(products);
};

exports.getById = (req, res) => {
    Product.getById(req.params.id).then(
        function(product) {
            res.json(product);
        }
    ).catch(err => {
        return res.status(400).send({
            error : "Wrong product id specified!"
        })
    })
    //res.json(_.find(products, function (product) {return product.id == req.params.id}))
};

exports.store = (req, res) => {
    let newProduct = {
        //'id' : req.body.id, // wydaje mi sie, ze skoro id jest auto-increment to nie wysylamy tutaj
        'name' : req.body.name,
        'description' : req.body.description,
        'price' : req.body.price,
        'weight': req.body.weight,
        'category' : req.body.category
    }
    if (typeof newProduct.weight !== 'number' || typeof newProduct.price !== 'number'){
        return res.status(400).send({
            error : "price and weight have to be numbers!"
        })
    }

    if (newProduct.price <= 0 || newProduct.weight <= 0) {
        return res.status(400).send({
            error: "price and weight have to be positive numbers!"
        });
    }
    if (newProduct.name == null || newProduct.description == null) {
        return res.status(400).send({
            error: "name, description, price and weight have to be not null!"
        })
    }

    Category.getById(newProduct.category).then(
        function(category) {
            Product.create(newProduct).then(
                function (newProduct) {
                    res.json({
                        'status': 'saved!',
                        'product': newProduct,
                    });
                })
                .catch((err) => {
                    return res.status(400).send({
                        error: "Error during adding new product"
                    })
                })
        }
    ).catch(err => {
        return res.status(400).send({
            error : "Wrong category specified."
        })
    })
};

exports.updateById = (req, res) => {
    // Please note the API change!
    let prod = {
        'id' : req.body.id,
        'name' : req.body.name,
        'description' : req.body.description,
        'price' : req.body.price,
        'weight': req.body.weight,
        'category' : req.body.category
    }
    if (prod.id == null) {
        return res.status(400).send({
            error : "You have to specify id!"
        });
    }
    // console.log(typeof prod.weight)
    if (req.body.weight && typeof prod.weight !== 'number' || req.body.price && typeof prod.price !== 'number'){
        return res.status(400).send({
            error : "price and weight have to be numbers!"
        })
    }
    if (prod.price <= 0 || prod.weight <= 0) {
        return res.status(400).send({
            error : "price and weight have to be positive numbers!"
        });
    }
    // console.log(prod.description)
    // === bo wyłapujemy tylko null (jak undefined, czyli jak po prostu nie podamy w body tego parametru to przechodzi)
    if (prod.name === null || prod.description === null) {
        return res.status(400).send({
            error: "name, description, price and weight have to be not null!"
        })
    }
    Product.getById(prod.id).then(
        function (product) {
            Category.getById(prod.category).then(
                function(category) {
                    Product.update(prod).then(
                        function (product) {
                            res.json(product);
                        }
                    ).catch(err => {
                        return res.status(400).send({
                            error : "Error while updating product"
                        })
                    })
                }
            ).catch(err => {
                return res.status(400).send({
                    error : "Wrong category specified."
                })
            })
            // console.log(product)
            // if (product == null) {
            //     console.log("null")
            // }

        }
    ).catch( err => {
        return res.status(400).send({
            error : "Wrong id specified."
        })
    })

    //     .catch(err => { // nie wiem czy to wystarczy na sprawdzenie id
    //     return res.status(400).send({
    //         error: "Error updating product with specified id, make sure you enter a id that refers existing product."
    //     })
    // })
}
