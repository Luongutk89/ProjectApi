require('dotenv').config();
const axios = require('axios');
const bodyParser = require('body-parser');
const connection = require('./src/config/database');
const apiRouter = require('./src/routes/index');

const express = require('express');
const app = express();
const cors = require('cors');
const path = require('path');

const port = process.env.PORT || 8888;

app.use(express.static(path.join('./src', 'public')));
app.use(cors({ origin: '*' }));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.get('/', (req, res) => {
    res.send('Đang Call API cloudHub!')
});

const crossCall = async () => {
    try {
        const response = await axios.get('https://cloudhub.onrender.com');
        console.log(response.data);
    } catch (error) {
        console.error(error);
    }
};

setInterval(crossCall, 5 * 60 * 1000);

apiRouter(app);

(async () => {
    try {
        await connection();
        app.listen(port, () => {
            console.log(`Server running http://localhost:${port}/`);
        });
    } catch (error) {
        console.log("Error connecting to DB: ", error);
    }
})();
