const sinon = require('sinon');
const chai = require('chai');
const { expect } = require('chai');
const productsService = require('../../../src/services/products.services');
const productsModel = require('../../../src/models/products.models');

chai.use(require('sinon-chai'));

const Martelo = 'Martelo de Thor';

describe('Testando o product service', function () {
  beforeEach(function () {
    sinon.restore();
  });

  it('Testa o getAll, caso de sucesso', async function () {
    sinon.stub(productsModel, 'getAll').resolves([
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

    const result = await productsService.getAll();

    expect(result).to.be.deep.equal([
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
  });

  it('Testa o getById, caso de sucesso', async function () {
    sinon.stub(productsModel, 'findById').resolves({
      id: 1,
      name: Martelo,
    });

    const result = await productsService.getById(1);

    expect(result).to.be.deep.equal({
      id: 1,
      name: Martelo,
    });
  });

  it('Testa o getAllSales, caso de sucesso', async function () {
    sinon.stub(productsModel, 'getAllSales').resolves([
      {
        id: 1,
        quantity: 10,
        productId: 1,
      },
      {
        id: 2,
        quantity: 20,
        productId: 2,
      },
      {
        id: 3,
        quantity: 30,
        productId: 3,
      },
    ]);

    const result = await productsService.getAllSales();

    expect(result).to.be.deep.equal([
      {
        id: 1,
        quantity: 10,
        productId: 1,
      },
      {
        id: 2,
        quantity: 20,
        productId: 2,
      },
      {
        id: 3,
        quantity: 30,
        productId: 3,
      },
    ]);
  });

  it('Testa o getSalesById, caso de sucesso', async function () {
    sinon.stub(productsModel, 'getSalesById').resolves({
      id: 1,
      quantity: 10,
      productId: 1,
    });

    const result = await productsService.getSalesById(1);

    expect(result).to.be.deep.equal({
      id: 1,
      quantity: 10,
      productId: 1,
    });
  });

  it('Testa o addNewProduct, caso de sucesso', async function () {
    sinon.stub(productsModel, 'addNewProduct').resolves(1);

    const result = await productsService.addNewProduct(Martelo);

    expect(result).to.be.deep.equal({
      id: 1,
      name: Martelo,
    });
  });

  it('Testa o addNewSale, caso de sucesso', async function () {
    sinon.stub(productsModel, 'addNewSale').resolves({
      id: 1,
      quantity: 10,
      productId: 1,
    });

    const result = await productsService.addNewSale({
      quantity: 10,
      productId: 1,
    });

    expect(result).to.be.deep.equal({
      id: 1,
      quantity: 10,
      productId: 1,
    });
  });

  it('Testa o updateProduct, caso de sucesso', async function () {
    sinon.stub(productsModel, 'updateProduct').resolves({
      id: 1,
      name: Martelo,
    });

    const result = await productsService.updateProduct(1, Martelo);

    expect(result).to.be.deep.equal({
      id: 1,
      name: Martelo,
    });
  });

  afterEach(function () {
    sinon.restore();
  });
});