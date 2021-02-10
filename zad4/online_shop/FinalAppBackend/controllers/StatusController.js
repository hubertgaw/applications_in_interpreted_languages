const Status = require('../models/status');

exports.getAll = (req, res) => {
    Status.getAll().then(
        function (allStatus) {
            res.json(allStatus);
        }
    ).catch(err => {
        return res.status(400).send({
            error : "Error while getting all statuses from database."
        })
    })
};