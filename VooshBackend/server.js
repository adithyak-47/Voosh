const Express = require('express');
const cors = require('cors');
const app = Express();
const PORT = process.env.PORT || 5000;
const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config();
const url = process.env.MONGODB_URL;
const addUser = require('./routes/addUser');
const Login = require('./routes/Login');
const addOrder = require('./routes/addOrder');
const getOrder = require('./routes/getOrder');

app.use(cors());
app.use(Express.json());
mongoose.connect(url);

app.use('/api/add-user', addUser);
app.use('/api/login-user', Login);
app.use('/api/add-order', addOrder);
app.use('/api/get-order', getOrder);

app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});