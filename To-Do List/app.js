const express = require('express');
const port = 8000;
const app = express();
const path = require('path');

const allTask = [
    {
        id: Math.floor(Math.random() * 1000),
        task: 'Complete Pending Projects',
        status: false
    }
];

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.get('/',(req, res) => {
    return res.render('index', { allTask });
});

app.post('/insertTask',(req, res) => {
    allTask.push({
        id: Math.floor(Math.random() * 1000),
        task: req.body.task,
        status: false
    });
    return res.redirect('/');
});

app.post('/updateTask/:id', (req, res) => {
    const index = allTask.findIndex(item => item.id == req.params.id);
    if (index !== -1) {
        allTask[index].task = req.body.task;
    }
    return res.redirect('/');
});


app.get('/completeTask/:id',(req, res) => {
    allTask.forEach((item) => { 
        if (item.id == req.params.id) {
            item.status = true;
        }
    });
    return res.redirect('/');
});

app.get('/edittask/:id', (req, res) => {
    const task = allTask.find(item => item.id == req.params.id);
    console.log("Requested Task ID:", req.params.id);
    console.log("Found Task:", task);
    
    if (task) {
        return res.render('edit', { task });
    } else {
        console.log("Task not found, redirecting...");
        return res.redirect('/');
    }
});


app.get('/deleteTask/:id',(req, res) => {  
    const index = allTask.findIndex(item => item.id == req.params.id);
    if (index !== -1) {
        allTask.splice(index, 1);
    }
    return res.redirect('/');
});

app.listen(port, err => console.log(err ? err : "Server running at http://localhost:" + port));
