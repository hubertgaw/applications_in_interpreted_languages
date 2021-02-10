const Categories = require('../models/category');

exports.getAll = (req, res) => {
    Categories.getAll().then(
        function (allCategories) {
            res.json(allCategories);
        }
    ).catch(err => {
        return res.status(400).send({
            error : "Error while getting all categories from database."
        })
    })
};