const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const todos = [];
const workTodos = [];

app.set('view engine', 'ejs');
app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended:true}));

app.get('/', function(req, res){
    const options = {
        weekday: "long",
        month: "long",
        day: "numeric",
        year: "numeric"
    }
    
    const date = new Date()
    const title = date.toLocaleDateString("en-US", options);
    const submit = "nothing";
    res.render("list", {title:title, submit:submit, todos:todos});
});

app.post('/', function (req, res) {
    const todo = req.body.task;
    if (req.body.submit === "value") {
        workTodos.push(todo);
        res.redirect('/work');
    } else {
        todos.push(todo);
        res.redirect('/');
    }
    
  
})

app.get('/work', function (req, res) {
    const title = "Work Todo";
    const submit = "value";
    res.render('list', {title:title, submit:submit, todos:workTodos});
})

app.post('/work', function (req, res) {
    const todo = req.body.task;
    workTodos.push(todo);
    res.redirect('/work');
    
})

app.listen(3000, function () {
    console.log("app is on");
})

