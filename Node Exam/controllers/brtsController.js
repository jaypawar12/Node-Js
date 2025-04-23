const brts = require('../model/brtsSchema');
const homePage = (req, res) => {
    res.render('homePage');
}

const addBrts = (req, res) => {
    res.render('addBrts');
}

const brtsInsert = (req,res) => {
    console.log(req.body);
    
}

module.exports = {
    homePage,
    addBrts,
    brtsInsert,
}
