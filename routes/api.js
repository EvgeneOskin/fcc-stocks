/*
*
*
*       Complete the API routing below
*
*
*/

'use strict';

const expect = require('chai').expect;
const MongoClient = require('mongodb');
const googleStocks = require('google-stocks');
 
const CONNECTION_STRING = process.env.DB; //MongoClient.connect(CONNECTION_STRING, function(err, db) {});

module.exports = function (app) {

  app.route('/api/stock-prices')
    .get(async (req, res) => {
      const stocks = await googleStocks(['AAPL'])
      res.json({
        stockData: { stock: "GOOG", price: "786.90", likes: 1 } 
      })
    });
    
};
