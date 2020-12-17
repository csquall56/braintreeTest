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

router.post('/', (req, res, next) => {

  // Use the payment method nonce here
  const nonceFromTheClient = req.body.paymentMethodNonce;
  // Create a new transaction for $10
  const newTransaction = gateway.transaction.sale({
    amount: '56.00',
    paymentMethodNonce: nonceFromTheClient,
    options: {
      // This option requests the funds from the transaction
      // once it has been authorized successfully
      submitForSettlement: true
    }
  }, (error, result) => {
      if (result) {
        res.send(result);
      } else {
        res.status(500).send(error);
      }
  });
});

module.exports = router;
