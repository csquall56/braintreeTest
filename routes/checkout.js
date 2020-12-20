const express = require('express');
const router = express.Router();
const braintree = require('braintree');

const gateway = new braintree.BraintreeGateway({
  environment: braintree.Environment.Sandbox,
  // Use your own credentials from the sandbox Control Panel here
  merchantId: '734by62hhkw66qwg',
  publicKey: '4ydfzw9zh6p87hmw',
  privateKey: '8b768f8c29dcccfc4c7a5d252445eee1'
});

// router.post('/login',(req, res) => {
//   console.log('log');
//   var user_name = req.body.user;
//   var password = req.body.password;
//   console.log("User name = "+user_name+", password is "+password);
//   res.end("yes");
// });

router.get('/api/braintree/v1/getToken', async function(req, res) {
  try {
    gateway.clientToken.generate({}, function(err, response) {
      if (err) {
        res.status(500).send(err);
      } else {
        res.send(response);
      }
    });
  } catch (err) {
    res.status(500).send(err);
  }
});

router.post('/paymentMethod', (req, res, next) => {

  const nonceFromTheClient = req.body.nonce;
  console.log(req.body.nonce);
  const newPayment = gateway.paymentMethod.create({
    customerId: "257590889",
    paymentMethodNonce: nonceFromTheClient,
    options: {
      verifyCard: true,
      verificationAmount: "1.00",
      }
    }, (err, result) => {
      if (result.success) {
        console.log('result is');
        console.log(result);
        res.send('Verified');
      } else {
        console.log('unsuccessful result is');
        console.log(result);
        res.send('Invalid Card Verification');
      }
      //  console.log(result.verification.status);
      //   if (result.verification.status == 'processor_declined') {
      //   res.send('Processor Declined');
      // } else {
      //   res.send('Verified');
      // }
      // } else {
      //   console.log('error is');
      // //  console.log(err.message);
      //   res.status(500).send(error);
      // }
  });
});

router.post('/', (req, res, next) => {

  // Use the payment method nonce here

   const nonceFromTheClient = req.body.paymentMethodNonce;
   console.log('nonce is:');
   console.log(nonceFromTheClient);

//
//   const newPayment = gateway.paymentMethod.create({
//   customerId: "257590889",
//   paymentMethodNonce: nonceFromTheClient,
//   options: {
//     verifyCard: true,
//     verificationAmount: "1.00",
//     }
//   }, (err, result) => {
//     if (result) {
//       console.log('result is');
//       console.log(result.verification.status);
//       if (result.verification.status == 'processor_declined') {
//       res.send(result);
//     } else {
//       res.send('Verified');
//     }
//     } else {
//       console.log('error is');
//       console.log(err);
//       res.status(500).send(error);
//     }
// });
  // Create a new transaction for $10
  const newTransaction = gateway.transaction.sale({
    amount: '44.00',
    paymentMethodNonce: nonceFromTheClient,
    options: {
      // This option requests the funds from the transaction
      // once it has been authorized successfully
      submitForSettlement: true
      //verifyCard: true
    }
  }, (error, result) => {
      if (result) {
        console.log(result);
        res.send(result);
      } else {
        console.log(result);
        res.status(500).send(error);
      }
  });
});

module.exports = router;
