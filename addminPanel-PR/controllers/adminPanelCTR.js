const loginPage = (req, res) => {
    res.render('signUpPage');
};
const signUpPage = (req, res) => {
    res.render('loginPage');
};


module.exports = {
    loginPage,
    signUpPage,
};