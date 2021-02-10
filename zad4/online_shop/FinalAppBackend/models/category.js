const bookshelf= require('../config/bookshelf');

const OrderItems = bookshelf.Model.extend({
    tableName: 'order_items',
    orders: function() {
        return this.belongsTo(Order, 'id');
    }
});

const Order = bookshelf.Model.extend({
    tableName: 'orders',
    orderItems: function() {
        return this.hasMany(OrderItems, 'order_id');
    }
});
const Category = bookshelf.Model.extend({
    tableName: 'categories'
});

module.exports.getAll = () => {
    return Category.fetchAll();
}

module.exports.getById = (id) => {
    return Category.where({'id' : id}).fetch()
}