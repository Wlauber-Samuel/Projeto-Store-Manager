const connection = require('./connection');

const getAll = async () => {
    const [products] = await connection.execute('SELECT * FROM products');
    return products;
};

const findById = async (id) => {
    const [[product]] = await connection.execute('SELECT * FROM products WHERE id = ?', [id]);
    return product;
};

const getAllSales = async () => {
    const [sales] = await connection.execute(
        'SELECT sale_id AS saleId, date, product_id AS productId,quantity'
        + ' FROM StoreManager.sales_products INNER JOIN sales ON sales.id = sales_products.sale_id',
    );
    return sales;
};

const getSalesById = async (id) => {
    const [sales] = await connection.execute(
        'SELECT date, product_id AS productId,quantity'
        + ' FROM StoreManager.sales_products INNER JOIN sales ON sales.id = sales_products.sale_id'
        + ' WHERE sale_id = ?',
        [id],
    );
    return sales;
};

const addNewProduct = async (name) => {
    const [{ insertId }] = await connection.execute(
        'INSERT INTO products (name) VALUES (?)',
        [name],
    );
    return insertId;
};

const addNewSale = async (sale) => {
    const [{ insertId }] = await connection.execute(
        'INSERT INTO sales (date) VALUES (?)',
        [new Date()],
    );
    const result = sale.map((item) => connection.execute(
            'INSERT INTO sales_products (sale_id, product_id, quantity) VALUES (?, ?, ?)',
            [insertId, item.productId, item.quantity],
        ));
    await Promise.all(result);
    return insertId;
};

const updateProduct = async (id, name) => {
    await connection.execute(
        'UPDATE products SET name = ? WHERE id = ?',
        [name, id],
    );
};

const deleteProduct = async (id) => {
    await connection.execute(
        'DELETE FROM products WHERE id = ?',
        [id],
    );
};

const deleteSale = async (id) => {
    await connection.execute(
        'DELETE FROM sales WHERE id = ?',
        [id],
    );
};

const updateQuantity = async (saleId, productId, quantity) => {
    await connection.execute(
        'UPDATE sales_products SET quantity = ? WHERE sale_id = ? AND product_id = ?',
        [quantity, saleId, productId],
    );
};

module.exports = {
    getAll,
    findById,
    getAllSales,
    getSalesById,
    addNewProduct,
    addNewSale,
    updateProduct,
    deleteProduct,
    deleteSale,
    updateQuantity,
};