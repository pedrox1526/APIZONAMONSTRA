const express = require('express');
const routes = express.Router();

const ProductController = require('./controllers/ProductController')
routes.get('/products/:id', ProductController.showone);
routes.get('/products', ProductController.index);
routes.post('/products/add', ProductController.store);
routes.put('/products/update/:id', ProductController.update);
routes.delete('/products/delete/:id', ProductController.delete);



module.exports = routes;