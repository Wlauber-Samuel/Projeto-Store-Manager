const chai = require('chai');
const sinon = require('sinon');
const { expect } = require('chai');
chai.use(require('sinon-chai'));
const productsController = require('../../../src/controllers/products.controllers');
const productsService = require('../../../src/services/products.services');

const date = '2023-06-12T22:04:31.000Z';

describe('Testando funções sales', function () {
  it('Testa se o getAllSales caso de sucesso', async function () {
    const req = {};
    const res = {
      status: sinon.stub().returnsThis(),
      json: sinon.stub().returns(),
    };
    sinon.stub(productsService, 'getAllSales').resolves([
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
    ]);
    await productsController.getAllSales(req, res);

    expect(res.status.calledWith(200)).to.be.equal(true);
    expect(res.json.calledWith([
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
    ])).to.be.equal(true);
  });

  it('Testa se o getSalesById caso de sucesso', async function () {
    const req = {
      params: {
        id: 1,
      },
    };
    const res = {
      status: sinon.stub().returnsThis(),
      json: sinon.stub().returns(),
    };
    sinon.stub(productsService, 'getSalesById').resolves([
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
    await productsController.getSalesById(req, res);

    expect(res.status.calledWith(200)).to.be.equal(true);
    expect(res.json.calledWith([
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
    ])).to.be.equal(true);
  });

  it('Testa se o addNewSale caso de sucesso', async function () {
    const req = {
      body: [{
        productId: 1,
        quantity: 5,
      }],
    };
    const res = {
      status: sinon.stub().returnsThis(),
      json: sinon.stub().returns(),
    };
    sinon.stub(productsService, 'addNewSale').resolves(1);
    await productsController.addNewSale(req, res);

    expect(res.status.calledWith(201)).to.be.equal(true);
    expect(res.json.calledWith({
      id: 1,
      itemsSold: [{
        productId: 1,
        quantity: 5,
      }],
    })).to.be.equal(true);
  });

  // it('Testa se o deleteSale caso de sucesso', async function () {
  //   const req = {
  //     params: {
  //       id: 1,
  //     },
  //   };
  //   const res = {
  //     status: sinon.stub().returnsThis(),
  //     json: sinon.stub().returns(),
  //   };
  //   sinon.stub(productsService, 'deleteSale').resolves(1);
  //   await productsController.deleteSale(req, res);

  //   expect(res.status.calledWith(200)).to.be.equal(true);
  //   expect(res.json.calledWith({
  //     id: 1,
  //     itemsSold: [{
  //       productId: 1,
  //       quantity: 5,
  //     }],
  //   })).to.be.equal(true);
  // });
});