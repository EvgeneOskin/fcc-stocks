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
const { lookup: lookupStock } = require('yahoo-stocks');
 
const CONNECTION_STRING = process.env.DB; //MongoClient.connect(CONNECTION_STRING, function(err, db) {});

module.exports = function (app) {

  app.route('/api/stock-prices')
    .get(async (req, res) => {
      const { stock, like } = req.query
      const { currentPrice: price, symbol: stock} = await lookupStock(stock)
      console.log(stockData)
      likes
      res.json({
        stockData: { stock: stock.toUpperCase(), price: price, likes } 
      })
    });
  const updateLikes = (stocks, ip) => {
    
  }
};
