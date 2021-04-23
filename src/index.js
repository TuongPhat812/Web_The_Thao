const path = require('path');
const express = require('express');
const morgan = require('morgan');
const methodOverride = require('method-override');
const handlebars = require('express-handlebars');

const app = express();
const port = 3000;
const route = require('./routes/');
const db = require('./config/db/index') //chứa hàm connect()
db.connect();

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({
    extended: true
}));
app.use(express.json());
//HTTP logger
app.use(morgan('combined'));

app.use(methodOverride('_method'));

//Template engine
app.engine('handlebars', handlebars());
app.set('view engine', 'handlebars');
app.set('views', path.join(__dirname, 'resources', 'views'));

route(app);

//connect db


var hello = () => "Hello"

function HelloWorld(name) {
    return name
}

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})