const productModel = require('../models/products.models');

const mapValidations = async (sales) => {
    const validations = sales.map((item) => productModel.findById(item.productId));
    const result = await Promise.all(validations);
    return result;
};

const validateSales = async (req, res, next) => {
    const { body } = req;
    const validations = await mapValidations(body);
    const validate = validations.every((item) => item !== undefined);
    if (!validate) {
        return res.status(404).json({ message: 'Product not found' });
    }
    next();
};

const itemSaleValidation = async (sales) => {
    sales.find((item) => {
        if (!item.productId) {
            return { type: 400, message: '"productId" is required' };
        }

        if (!item.quantity) {
            return { type: 400, message: '"quantity" is required' };
        }

        if (item.quantity <= 0) {
            return { type: 422, message: '"quantity" must be greater than or equal to 1' };
        }

        return null;
    });
};

const salesValidation = async (req, res, next) => {
    const sale = req.body;
    const validate = await itemSaleValidation(sale);
    console.log(validate);
    if (validate) {
        return res.status(validate.type).json({ message: validate.message });
    }
    next();
};

module.exports = {
    salesValidation,
    validateSales,
};