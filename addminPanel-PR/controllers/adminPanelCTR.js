const signInPage = (req, res) => {
    res.render('signInPage');
};
const signUpPage = (req, res) => {
    res.render('signUpPage');
};
const dashboard = (req, res) => {
    res.render('dashboard');
}
const addAdminPage = (req, res) => {
    res.render('addAdminPage')
}
const adminTable = (req, res) => {
    res.render('adminTable')
}


module.exports = {
    signInPage,
    signUpPage,
    dashboard,
    addAdminPage,
    adminTable,
};