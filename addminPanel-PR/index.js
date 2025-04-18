const express = require('express');
const app = express();
const port = 8000;

app.set('view engine', 'ejs');

app.use('/', require('./routes/adminRoutes'));

app.use(express.static(__dirname + '/public'));

app.listen(port, (err) => {
    if(err){
        console.log("Something Went Wrong In Server...", err);
    } else {
        console.log(`Server is Started At http://localhost:${port}`);
    }
});
