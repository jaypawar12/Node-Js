const signUpPage = (req, res) => {
    res.render('loginPage');
};
const loginPage = (req, res) => {
    res.render('signUpPage');
};
const dashboard = (req, res) => {
    res.render('dashboard');
}


module.exports = {
    loginPage,
    signUpPage,
    dashboard,
};