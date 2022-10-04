require('dotenv').config()
const midtransClient = require('midtrans-client')

const index = async (req, res, next) => {
  let snap = new midtransClient.Snap({
    isProduction: false,
    serverKey: process.env.SECRETS_SERVER,
    clientKey: process.env.SECRETS_CLIENT
  });
  let parameter = {
    "transaction_details": {
      "order_id": "order-id-node-" + Math.round((new Date()).getTime() / 1000),
      "gross_amount": 200000
    }, "credit_card": {
      "secure": true
    }
  };
  // create snap transaction token
  snap.createTransactionToken(parameter)
    .then((transactionToken) => {
      // pass transaction token to frontend
      res.status(200).json({
        token: transactionToken,
        clientKey: snap.apiConfig.clientKey
      })
    })
}

module.exports = { index }
