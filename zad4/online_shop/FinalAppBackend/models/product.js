const bookshelf= require('../config/bookshelf');


const Product = bookshelf.Model.extend({
    tableName: 'products',
    category: function() {
        return this.belongsTo(Category, 'category');
    }
})

const Category = bookshelf.Model.extend({
    tableName: 'categories',
    products: function() {
        return this.hasOne(Product);
    }
});


module.exports.getAll = () => {
    return Product.fetchAll({withRelated: ['category']});
}

module.exports.getById = (id) => {
    return new Product({'id':id}).fetch();
}

module.exports.create = (product) => {
    return new Product({
        name: product.name,
        description: product.description,
        price: product.price,
        weight: product.weight,
        category: product.category
    }).save();
};

module.exports.update = (product) => {
    return new Product({
        id: product.id
    }).save( {
            name: product.name,
            description: product.description,
            price: product.price,
            weight: product.weight,
            category: product.category
        },
        {patch: true}
    );
}