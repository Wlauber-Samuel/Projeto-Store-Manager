const chai = require('chai');
const sinon = require('sinon');
const { expect } = require('chai');
chai.use(require('sinon-chai'));
const productsController = require('../../../src/controllers/products.controllers');
const productsService = require('../../../src/services/products.services');

const Martelo = 'Martelo de Thor';

describe('Testando o product controller', function () {
  beforeEach(function () { return sinon.restore(); });

  describe('Testando funções products', function () {
    afterEach(function () {
      return sinon.restore();
    });

    it('Testa se o getAll caso de sucesso', async function () {
      const req = {};
      const res = {
        status: sinon.stub().returnsThis(),
        json: sinon.stub().returns(),
      };
      sinon.stub(productsService, 'getAll').resolves([
        {
          id: 1,
          name: 'Produto test',
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
      await productsController.getAll(req, res);

      expect(res.status.calledWith(200)).to.be.equal(true);
      expect(res.json.calledWith([
        {
          id: 1,
          name: 'Produto test',
        },
        {
          id: 2,
          name: 'Traje de encolhimento',
        },
        {
          id: 3,
          name: 'Escudo do Capitão América',
        },
      ])).to.be.equal(true);
    });
  });

  it('Testa se o getById caso de sucesso', async function () {
    const req = {
      params: {
        id: 1,
      },
    };
    const res = {
      status: sinon.stub().returnsThis(),
      json: sinon.stub().returns(),
    };
    sinon.stub(productsService, 'getById').resolves({ id: 1, name: 'Produto X' });
    await productsController.getById(req, res);

    expect(res.status.calledWith(200)).to.be.equal(true);
    expect(res.json.calledWith({ id: 1, name: 'Produto X' })).to.be.equal(true);
  });

  it('Testa se o addNewProduct caso de sucesso', async function () {
    const req = {
      body: {
        name: Martelo,
      },
    };
    const res = {
      status: sinon.stub().returnsThis(),
      json: sinon.stub().returns(),
    };
    sinon.stub(productsService, 'addNewProduct').resolves({ id: 1, name: Martelo });
    await productsController.addNewProduct(req, res);

    expect(res.status.calledWith(201)).to.be.equal(true);
    expect(res.json.calledWith({ id: 1, name: Martelo })).to.be.equal(true);
  });

  it('Testa se o updateProduct caso de sucesso', async function () {
    const req = {
      params: {
        id: 1,
      },
      body: {
        name: Martelo,
      },
    };
    const res = {
      status: sinon.stub().returnsThis(),
      json: sinon.stub().returns(),
    };

    sinon.stub(productsService, 'getAll').resolves([
      {
        id: 1,
        name: 'Martelo de Thor',
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

    sinon.stub(productsService, 'updateProduct');
    await productsController.updateProduct(req, res);

    expect(res.status.calledWith(200)).to.be.equal(true);
    expect(res.json.calledWith({
      id: 1,
      name: 'Martelo de Thor',
    })).to.be.equal(true);
  });

  // it('Testa se o deleteProduct caso de sucesso', async function () {
  //   const req = {
  //     params: {
  //       id: 1,
  //     },
  //   };
  //   const res = {
  //     status: sinon.stub().returnsThis(),
  //     json: sinon.stub().returns(),
  //   };
  //   sinon.stub(productsService, 'deleteProduct').resolves({ id: 1, name: Martelo });
  //   await productsController.deleteProduct(req, res);

  //   expect(res.status.calledWith(200)).to.be.equal(true);
  //   expect(res.json.calledWith({ id: 1, name: Martelo })).to.be.equal(true);
  // });
});