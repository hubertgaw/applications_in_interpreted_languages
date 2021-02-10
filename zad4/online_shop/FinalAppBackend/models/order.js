const bookshelf= require('../config/bookshelf');
// const OrderItems = require('./order_item');

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


module.exports.getAll = () => {
    return Order.forge().fetchAll({withRelated: ['orderItems']});
}

module.exports.getByStatus = (id) => {
    return Order.where({'status': id}).fetchAll({withRelated: ['orderItems']});
}

module.exports.getById = (id) => {
    return Order.where({'id' : id}).fetch({withRelated: ['orderItems']})
}

module.exports.create = (order) => {
    return new Order({
        status: order.status,
        approval_date: order.approval_date,
        username: order.username,
        email: order.email,
        phone_number: order.phone_number
    }).save();
};

module.exports.createItems = (order_item) => {
    return new OrderItems({
        order_id: order_item.order_id,
        product_id: order_item.product_id,
        amount: order_item.amount
    }).save();
};


module.exports.updateStatus = (order) => {
    return new Order({
        id: order.id
    }).save({
        status: order.status,
    },
    {patch: true });
}


