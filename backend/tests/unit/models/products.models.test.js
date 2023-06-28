const sinon = require('sinon');
const { expect } = require('chai');
const productModel = require('../../../src/models/products.models');
const connection = require('../../../src/models/connection');

const date = '2023-06-14T00:10:19.000Z';
const Martelo = 'Martelo de Thor';

describe('Testando o product model', function () {
  beforeEach(function () {
    sinon.restore();
  });

  it('Testa o getAll, caso de sucesso', async function () {
    sinon.stub(connection, 'execute').resolves([
      {
        id: 1,
        name: Martelo,
      },
      {
        id: 2,
        name: 'Traje de encolhimento',
      },
      {
        id: 3,
        name: 'Escudo do Capitão América',
      },
    ]);
    await productModel.getAll();
  });

  it('Testa o findById, caso de sucesso', async function () {
    sinon.stub(connection, 'execute').resolves([[{ id: 2, name: 'Traje de encolhimento' }]]);
    const result = await productModel.findById(2);
    expect(result).to.be.deep.equal({ id: 2, name: 'Traje de encolhimento' });
  });

  it('Testa o getAllSales, caso de sucesso', async function () {
    sinon.stub(connection, 'execute').resolves([
      {
        saleId: 1,
        date,
        productId: 1,
        quantity: 5,
      },
      {
        saleId: 1,
        date,
        productId: 2,
        quantity: 10,
      },
      {
        saleId: 2,
        date,
        productId: 3,
        quantity: 15,
      },
      {
        saleId: 3,
        date: '2023-06-14T13:39:02.000Z',
        productId: 1,
        quantity: 1,
      },
      {
        saleId: 3,
        date: '2023-06-14T13:39:02.000Z',
        productId: 2,
        quantity: 5,
      },
      {
        saleId: 4,
        date: '2023-06-14T14:39:05.000Z',
        productId: 1,
        quantity: 1,
      },
      {
        saleId: 4,
        date: '2023-06-14T14:39:05.000Z',
        productId: 2,
        quantity: 5,
      },
    ]);
    await productModel.getAllSales();
  });

  it('Testa o getSalesById, caso de sucesso', async function () {
    sinon.stub(connection, 'execute').resolves([
      {
        date,
        productId: 1,
        quantity: 5,
      },
      {
        date,
        productId: 2,
        quantity: 10,
      },
    ]);
    const result = await productModel.getSalesById(1);
    expect(result).to.be.deep.equal(
      {
        date,
        productId: 1,
        quantity: 5,
      },
      {
        date,
        productId: 2,
        quantity: 10,
      },
    );
  });

  it('Testa o addNewProduct, caso de sucesso', async function () {
    sinon.stub(connection, 'execute').resolves([{ insertId: 1 }]);
    const result = await productModel.addNewProduct(Martelo);
    expect(result).to.be.equal(1);
  });

  it('Testa o addNewSale, caso de sucesso', async function () {
    sinon.stub(connection, 'execute').resolves([{ insertId: 1 }]);
    const result = await productModel.addNewSale([
      {
        productId: 1,
        quantity: 5,
      },
      {
        productId: 2,
        quantity: 10,
      },
    ]);
    expect(result).to.be.equal(1);
  });

  it('Testa o updateProduct, caso de sucesso', async function () {
    const product = [
      {
        id: 1,
        name: Martelo,
      },
    ];

    sinon.stub(productModel, 'getAll').resolves(product);
    sinon.stub(connection, 'execute').resolves([{ affectedRows: 1 }]);
    const result = await productModel.updateProduct(1, Martelo);
    expect(result).to.be.equal(undefined);
  });

  it('Testa o deleteProduct, caso de sucesso', async function () {
    const product = [
      {
        id: 1,
        name: Martelo,
      },
    ];

    sinon.stub(productModel, 'getAll').resolves(product);
    sinon.stub(connection, 'execute').resolves([{ affectedRows: 1 }]);

    const result = await productModel.deleteProduct(1);
    expect(result).to.be.equal(undefined);
  });

  afterEach(function () {
    sinon.restore();
  });
});