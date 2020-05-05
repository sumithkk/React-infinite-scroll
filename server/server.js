const express = require('express');
const app = express();
const products = require('./data/products.js');
const cors = require('cors')
const corsOptions = {
    origin: 'http://localhost:3000',
    optionsSuccessStatus: 200
}
app.use(cors(corsOptions))

app.get('/', function (req, res) {
    console.log(req.query);
    console.log(typeof req.query.search != 'undefined');
    var response = [];
    if (typeof req.query.search != 'undefined') {
        response = products.filter((product) => {
            let title = product.title.toLowerCase();
            if (title.includes(req.query.search)) {
                return product;
            }
        });
    } else {
        response = products
    }
    res.json(response);
});

app.listen(8000, function () {
    console.log('Example app listening on port 8000!')
});