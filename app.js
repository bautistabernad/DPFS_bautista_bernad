const express = require('express');
const path = require('path');
const methodOverride = require('method-override');
const session = require('express-session');
const cookieParser = require('cookie-parser');
const userLoggedMiddleware = require('./src/middlewares/userLoggedMiddleware');
const cors = require('cors');

const app = express();

app.use(cors());

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'src/views'));

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(methodOverride('_method'));

app.use(cookieParser());

app.use(session({
    secret: 'tempo secreto',
    resave: false,
    saveUninitialized: false
}));

app.use(userLoggedMiddleware);


const apiProductsRoutes = require('./src/routes/api/apiProductsRoutes');
const apiUsersRoutes = require('./src/routes/api/apiUsersRoutes');
const mainRoutes = require('./src/routes/mainRoutes');
const productsRoutes = require('./src/routes/productsRoutes');
const usersRoutes = require('./src/routes/usersRoutes');

app.use('/', mainRoutes);
app.use('/products', productsRoutes);
app.use('/users', usersRoutes);
app.use('/api/users', apiUsersRoutes);
app.use('/api/products', apiProductsRoutes);

app.listen(3000, () => {
    console.log('Servidor corriendo en http://localhost:3000');
});