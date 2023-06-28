const productsService = require('../services/products.services');

const getAll = async (_req, res) => {
    const products = await productsService.getAll();
    res.status(200).json(products);
};

const getById = async (req, res) => {
    const { id } = req.params;
    const product = await productsService.getById(id);
    if (!product) return res.status(404).json({ message: 'Product not found' });
    res.status(200).json(product);
};

const getAllSales = async (_req, res) => {
    console.log(productsService);
    const sales = await productsService.getAllSales();
    res.status(200).json(sales);
};

const getSalesById = async (req, res) => {
    const { id } = req.params;
    const sales = await productsService.getSalesById(id);
    if (!sales.length) return res.status(404).json({ message: 'Sale not found' });
    res.status(200).json(sales);
};

const addNewProduct = async (req, res) => {
    const { name } = req.body;
    const product = await productsService.addNewProduct(name);
    res.status(201).json(product);
};

const addNewSale = async (req, res) => {
    const sale = req.body;
    const newSale = await productsService.addNewSale(sale);
    res.status(201).json({ id: newSale, itemsSold: sale });
};

const updateProduct = async (req, res) => {
    const { id } = req.params;
    const { name } = req.body;
    const allProducts = await productsService.getAll();
    const productExists = allProducts.find((product) => product.id === parseInt(id, 10));
    if (!productExists) return res.status(404).json({ message: 'Product not found' });
    await productsService.updateProduct(id, name);
    res.status(200).json({ id: parseInt(id, 10), name });
};

const deleteProduct = async (req, res) => {
    const { id } = req.params;
    const allProducts = await productsService.getAll();
    const productExists = allProducts.find((product) => product.id === parseInt(id, 10));
    if (!productExists) return res.status(404).json({ message: 'Product not found' });
    await productsService.deleteProduct(id);
    res.status(204).json(productExists);
};

const deleteSale = async (req, res) => {
    const { id } = req.params;
    const allSales = await productsService.getAllSales();
    const saleExists = allSales.find((sale) => sale.id === parseInt(id, 10));
    await productsService.deleteSale(id);
    res.status(204).json(saleExists);
};

const updateQuantity = async (req, res) => {
    const { id } = req.params;
    const { quantity } = req.body;
    const allProducts = await productsService.getAll();
    const productExists = allProducts.find((product) => product.id === parseInt(id, 10));
    if (!productExists) return res.status(404).json({ message: 'Product not found' });
    await productsService.updateQuantity(id, quantity);
    res.status(200).json({ id: parseInt(id, 10), quantity });
};

module.exports = {
    getAll,
    getById,
    getAllSales,
    getSalesById,
    addNewProduct,
    addNewSale,
    updateProduct,
    deleteProduct,
    deleteSale,
    updateQuantity,
};