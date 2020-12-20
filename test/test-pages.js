const supertest = require('supertest');
const braintree = require('braintree');

const PORT = process.env.PORT || 3000;
const { get, post } = supertest(`http://localhost:${PORT}`);

  const gateway = new braintree.BraintreeGateway({
    environment: braintree.Environment.Sandbox,
    // Use your own credentials from the sandbox Control Panel here
    merchantId: '734by62hhkw66qwg',
    publicKey: '4ydfzw9zh6p87hmw',
    privateKey: '8b768f8c29dcccfc4c7a5d252445eee1'
  });

//var braintree = require('mock-braintree');
var assert = require('assert');

//
// describe('when there are transaction amount errors', function() {
//   describe('process error', function() {
//     var purchaseObj = {
//      paymentMethodToken: 'fake-valid-visa-nonce',
//      amount: 3000.12,
//      options: {
//        submitForSettlement: true,
//      }};
//
//     it('should return processorResponseCode = 3000', function(done) {
//       var responseCode;
//       braintree.transaction.sale(purchaseObj).then(result => {
//      console.log(result.transaction.processorResponseCode);
//      responseCode = Number(result.transaction.processorResponseCode);
//      console.log(responseCode);
//      assert.equal(responseCode,'3000');
//      done();
//   }).catch(done);
//   });
//
//   });
// });

  describe('unsuccessful card verification', function() {
    describe('unsuccessful visa card', function () {
    //   var cardObj = {
    //     customerId: "257590889",
    //     paymentMethodNonce: 'fake-processor-declined-amex-nonce',
    //     options: {
    //       verifyCard: true,
    //       verificationAmount: "1.00",
    //   }
    // };
    //   it('should return Do No Honor message', function(done){
    //     braintree.paymentMethod.create(cardObj).then(result => {
    //       console.log(result);
    //       done();
    //     }).catch(done);
    //   });

      it('displays processor declined for invalid card', () => {
        gateway.paymentMethod.create({
          customerId: "257590889",
          paymentMethodNonce: 'fake-processor-declined-visa-nonce',
          options: {
            verifyCard: true,
            verificationAmount: "1.00",
            }
          }, (err, result) => {
            if (result) {
              //console.log(result);
              //console.log(result.verification.status);
              assert.equal(result.verification.status,'processor_declined');
              //expect(result.verification.status).toMatch('processor_declined');
            }
          });
        // post('/checkout/')
        //   .send({
        //     user: 'fake-processor-declined-visa-nonce'
        //   })
        //   .then((res) => {
        //     console.log(res);
        //   });
      });
    });
  });

  // describe('unsuccessful card verification', function() {
  //   describe('unsuccessful visa card', function () {
  //     var cardObj = {
  //       customerId: "257590889",
  //       paymentMethodNonce: 'fake-processor-declined-amex-nonce',
  //       options: {
  //         verifyCard: true,
  //         verificationAmount: "1.00",
  //     }
  //   };
  //     it('should return Do No Honor message', function(done){
  //       braintree.paymentMethod.create(cardObj).then(result => {
  //         console.log(result);
  //         done();
  //       }).catch(done);
  //     });
  //   });
  // });

  // describe('invalid nonce',function(){
  //   var purchaseObj = {
  //    paymentMethodToken: 'fake-processor-declined-visa-nonce',
  //    amount: 150,
  //    options: {
  //      submitForSettlement: true,
  //    }};
  //    it('settlement declined', function(done) {
  //      var responseCode;
  //      braintree.transaction.sale(purchaseObj).then(result => {
  //        console.log(result);
  //     //console.log(result.transaction.processorResponseCode);
  //     //responseCode = Number(result.transaction.processorResponseCode);
  //   //  console.log(responseCode);
  //   //  assert.equal(responseCode,'3000');
  //     done();
  // });
  // // }).catch(done);
  //  });
  //
  // });
