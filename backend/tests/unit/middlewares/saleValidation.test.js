// const chai = require('chai');
// const sinon = require('sinon');
// const sinonChai = require('sinon-chai');

// const { salesValidation } = require('../../../src/middlewares/saleValidation');

// const { expect } = chai;

// chai.use(sinonChai);

// describe('Testa o middleware salesValidation', function () {
//     it('Testa o salesValidation com o campo productId vazio', function () {
//         const req = {
//             body: [{
//                 productId: '',
//                 quantity: 1,
//             }],
//         };
//         const res = {
//             status: sinon.stub().returnsThis(),
//             json: sinon.stub(),
//         };
//         const next = sinon.stub();

//         salesValidation(req, res, next);

//         expect(res.status).to.have.been.calledWith(400);
//         expect(res.json).to.have.been.calledWith({ message: '"productId" is required' });
//     });

//     it('Testa o salesValidation com o campo quantity vazio', function () {
//         const req = {
//             body: [{
//                 productId: '1',
//                 quantity: undefined,
//             }],
//         };
//         const res = {
//             status: sinon.stub().returnsThis(),
//             json: sinon.stub(),
//         };
//         const next = sinon.stub();

//         salesValidation(req, res, next);

//         expect(res.status).to.have.been.calledWith(400);
//         expect(res.json).to.have.been.calledWith({ message: '"quantity" is required' });
//     });

//     it('Testa o salesValidation com o campo quantity igual a 0', function () {
//         const req = {
//             body: [{
//                 productId: '1',
//                 quantity: 0,
//             }],
//         };
//         const res = {
//             status: sinon.stub().returnsThis(),
//             json: sinon.stub(),
//         };
//         const next = sinon.stub();

//         salesValidation(req, res, next);

//         expect(res.status).to.have.been.calledWith(422);
//         expect(res.json).to.have.been
//             .calledWith({ message: '"quantity" must be greater than or equal to 1' });
//     });
// });