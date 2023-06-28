const chai = require('chai');
const sinon = require('sinon');
const sinonChai = require('sinon-chai');

const productValidation = require('../../../src/middlewares/productValidation');

const { expect } = chai;

chai.use(sinonChai);

describe('Testa o middleware productValidation', function () {
    it('Testa o nameValidation com o campo name vazio', function () {
        const req = {
            body: {
                name: '',
            },
        };
        const res = {
            status: sinon.stub().returnsThis(),
            json: sinon.stub(),
        };
        const next = sinon.stub();

        productValidation(req, res, next);

        expect(res.status).to.have.been.calledWith(400);
        expect(res.json).to.have.been.calledWith({ message: '"name" is required' });
    });

    it('Testa o nameValidation com o campo name menor que 5', function () {
        const req = {
            body: {
                name: 'oi',
            },
        };
        const res = {
            status: sinon.stub().returnsThis(),
            json: sinon.stub(),
        };
        const next = sinon.stub();

        productValidation(req, res, next);

        expect(res.status).to.have.been.calledWith(422);
        expect(res.json).to.have.been
        .calledWith({ message: '"name" length must be at least 5 characters long' });
    });
});