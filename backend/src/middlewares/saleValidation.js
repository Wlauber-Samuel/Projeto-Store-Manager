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

const productIdIsRequired = (sales) => {
    for (let i = 0; i < sales.length; i += 1) {
        if (!sales[i].productId) {
            return { type: 400, message: '"productId" is required' };
        }
    }
};

const quantityValidation = (sales) => {
    for (let i = 0; i < sales.length; i += 1) {
        if (sales[i].quantity === undefined) {
            return { type: 400, message: '"quantity" is required' };
        }
    }
};

const quantityLessThanZero = (sales) => {
    for (let i = 0; i < sales.length; i += 1) {
        if (sales[i].quantity <= 0) {
            return { type: 422, message: '"quantity" must be greater than or equal to 1' };
        }
    }
};

const salesValidation = (req, res, next) => {
    const sale = req.body;
    const validate = quantityValidation(sale);
    const productId = productIdIsRequired(sale);
    const quantity = quantityLessThanZero(sale);
    if (validate) {
        return res.status(validate.type).json({ message: validate.message });
    }
    if (productId) {
        return res.status(productId.type).json({ message: productId.message });
    }
    if (quantity) {
        return res.status(quantity.type).json({ message: quantity.message });
    }
    next();
};

module.exports = {
    validateSales,
    salesValidation,
};