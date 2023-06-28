const productsModels = require('../models/products.models');

const getAll = async () => {
    const products = await productsModels.getAll();
    return products;
};

const getById = async (id) => {
    const product = await productsModels.findById(id);
    return product;
};

const getAllSales = async () => {
    const sales = await productsModels.getAllSales();
    return sales;
};

const getSalesById = async (id) => {
    const sales = await productsModels.getSalesById(id);
    return sales;
};

const addNewProduct = async (name) => {
    const product = await productsModels.addNewProduct(name);
    return { id: product, name };
};

const addNewSale = async (sale) => {
    const newSale = await productsModels.addNewSale(sale);
    return newSale;
};

const updateProduct = async (id, name) => {
   const result = await productsModels.updateProduct(id, name);
    return result;
};

const deleteProduct = async (id) => {
    await productsModels.deleteProduct(id);
};

const deleteSale = async (id) => {
    await productsModels.deleteSale(id);
};

const updateQuantity = async (id, quantity) => {
    await productsModels.updateQuantity(id, quantity);
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