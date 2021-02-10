exports.home = (req, res) => {
    res.json({'status':'working very well!'});
}

exports.customgreeting = (req, res) => {
    let greet = req.params.greeting;
    let name = req.params.name;
    res.json({'greeting': greet + " " + name});
}