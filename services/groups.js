exports.getGroup = (req, res, next) => {
    res.sendStatus(201)
};

exports.getAllGroup = (req, res, next) => {
    res.sendStatus(201)
};

exports.createGroup = (req, res, next) => {
    res.sendStatus(201)
};

exports.updateGroup = (req, res, next) => {
    res.sendStatus(201)
};

exports.getGroupInvite = (req, res, next) => {
    res.sendStatus(201)
};


exports.addAdmins = (req, res, next) => {
    console.log(req.params.id)
    console.log(req.body.wa_ids)
    res.sendStatus(400)
};