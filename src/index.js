const path = require('path');
const express = require('express');
const morgan = require('morgan');
const methodOverride = require('method-override');
const handlebars = require('express-handlebars');
const authentication = require('./app/middlewares/authentication')
const session = require('express-session');

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
//app.use(morgan('combined'));

app.use(methodOverride('_method'));

//Template engine
app.engine('handlebars', handlebars({
    helpers: require('./util/helpers')
}));
app.set('view engine', 'handlebars');
app.set('views', path.join(__dirname, 'resources', 'views'));

app.use(session({ secret: 'this-is-a-secret-token', cookie: { maxAge: 10000 }}));
app.use(authentication)


route(app);




app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})