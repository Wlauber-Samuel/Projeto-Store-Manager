const express = require('express');
const productsController = require('./controllers/products.controllers');
const productValidation = require('./middlewares/productValidation');
const { validateSales, salesValidation } = require('./middlewares/saleValidation');

const app = express();
app.use(express.json());

// não remova esse endpoint, é para o avaliador funcionar
app.get('/', (_request, response) => {
  response.json({ status: 'Store Manager UP!' });
});

app.get('/products', productsController.getAll);

app.get('/products/:id', productsController.getById);

app.get('/sales', productsController.getAllSales);

app.get('/sales/:id', productsController.getSalesById);

app.post('/products', productValidation, productsController.addNewProduct);

app.post('/sales', salesValidation, validateSales, productsController.addNewSale);

app.put('/products/:id', productValidation, productsController.updateProduct);

app.delete('/products/:id', productsController.deleteProduct);

app.delete('/sales/:id', productsController.deleteSale);

app.put('/sales/:saleId/products/:productId/quantity', productsController.updateQuantity);

module.exports = app;
// first commit