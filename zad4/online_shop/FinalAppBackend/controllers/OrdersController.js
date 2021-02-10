const Order = require('../models/order');
const Product = require('../models/product');

exports.getAll = (req, res) => {
    Order.getAll().then(
        function (allOrders) {
            res.json(allOrders);
        }
    ).catch(err => {
        return res.status(400).send({
            error: "Error while getting all orders"
        })
    })
};

exports.getByStatus = (req, res) => {
    Order.getByStatus(req.params.id).then(
        function (orders) {
            res.json(orders);
        }
    ).catch(err => {
        return res.status(400).send({
            error: "Error while getting order with specified status, check if you enter valid status id."
        })
    })
}

exports.store = (req, res) => {
    let newOrder = {
        'status': req.body.status,
        'approval_date': req.body.approval_date,
        'username': req.body.username,
        'email': req.body.email,
        'phone_number': req.body.phone_number,
    }
    // Próba dodania zamówienia z pustymi polami dotyczącymi użytkownika
    if (newOrder.username == null || newOrder.email == null ||
        newOrder.phone_number == null) {
        return res.status(400).send({
            error: "Fields cannot be empty!"
        })
    }
    if (newOrder.status == null) {
        return res.status(400).send({
            error: "Status is empty!"
        })
    }
    // Próba dodania zamówienia z niewłaściwie wypełnionymi polami dotyczącymi użytkownika (np.
    // numer telefonu zawiera litery)
    if (!(/^\d+$/.test(newOrder.phone_number))) { //sprawdzamy czy w stringu sa tylko cyfry
        return res.status(400).send({
            error: "Phone number contains incorrect characters"
        })
    }
    // Próba dodania zamówienia z ujemnymi, zerowymi lub zawierającymi liczby ilościami towarów
    for (let i = 0; i < req.body.orderItems.length; i++) {
        if (!Number.isInteger(req.body.orderItems[i].amount)) {
            return res.status(400).send({
                error: "Specified amount has to be an integer"
            })
        }
    }
    for (let i = 0; i < req.body.orderItems.length; i++) {
        if (req.body.orderItems[i].amount <= 0) {
            return res.status(400).send({
                error: "Specified amount has to be positive number."
            })
        }
    }


    // Próba dodania zamówienia z towarami, których identyfikatorów nie ma w bazie danych
    Product.getAll().then(
        function (products) {
            let jsonStrProducts = JSON.stringify(products);
            //console.log(JSON.stringify(products))
            let jsonObjProducts = JSON.parse(jsonStrProducts);
            // console.log(jsonObj.length);
            const idExistingArray = [];
            for (let i = 0; i < jsonObjProducts.length; i++) {
                idExistingArray.push(jsonObjProducts[i].id);
            }
            // console.log(idArray);
            console.log(req.body.orderItems);
            const idNewArray = [];
            for (let i = 0; i < req.body.orderItems.length; i++) {
                idNewArray.push(req.body.orderItems[i].product_id);
                if (!idExistingArray.includes(idNewArray[i])) {
                    return res.status(400).send({
                        error: "Item in order with that item does not exists."
                    })
                }
            }
            // console.log(idNewArray);
            Order.create(newOrder).then(function (newOrder) {
                for (items of req.body.orderItems) {
                    const newOrderItems = Order.createItems({
                        'order_id': newOrder.id,
                        'product_id': items.product_id,
                        'amount': items.amount
                    });
                }
                res.json({
                    'status': 'saved!',
                    'order': newOrder
                });
            }).catch(err => {
                return res.status(400).send({
                    error : "Error while saving order."
                })
            })
            // console.log(idExistingArray.includes(idNewArray))
        }
    ).catch(err => {
        return res.status(400).send({
            error : "Error while getting all products from database."
        })
    })


};

exports.updateStatus = (req, res) => {
    let ord = {
        'id': req.params.id,
        'status': req.body.status,
    }
    //Próba aktualizacji stanu zamówienia o nieistniejącym identyfikatorze
    Order.getAll().then(
        function (orders) {
            let jsonStrOrders = JSON.stringify(orders);
            //console.log(JSON.stringify(products))
            let jsonObjOrders = JSON.parse(jsonStrOrders);
            // console.log(jsonObj.length);
            const idExistingArray = [];
            for (let i = 0; i < jsonObjOrders.length; i++) {
                idExistingArray.push(jsonObjOrders[i].id);
            }
            // console.log(idExistingArray);
            if (!idExistingArray.includes(ord.id)) {
                return res.status(400).send({
                    error : "Order with that id does not exists"
                })
            }
        }
    ).catch(err => {
        return res.status(400).send({
            error : "Error while getting all orders from database."
        })
    })
    Order.getById(ord.id).then(
        function (order) {
            // Zmiana statusu po anulowaniu zamówienia:
            let jsonStr = JSON.stringify(order);
            let orderStatus;
            let jsonObj = JSON.parse(jsonStr)
            orderStatus = jsonObj.status
            if (orderStatus === 3) { //zmienic na id anulowanego
                return res.status(400).send({
                    error: "You cannot change status of cancelled order"
                })
            }
            // Zmiana statusu "wstecz", np. ze "ZREALIZOWANE" na "NIEZATWIERDZONE"
            if (ord.status < orderStatus) {
                return res.status(400).send({
                    error : "Cannot change status in that way (backwards)"
                })
            }
            Order.updateStatus(ord).then(
                function (order) {
                    res.json({
                        'status': 'saved!',
                        'order': order
                    });
                }).catch(err => {
                    return res.status(400).send({
                        error : "Error while updating status."
                    });
            })
        }).catch(err => {
            return res.status(400).send({
                error : "Error while getting order with specified id from database"
            })
    })
};