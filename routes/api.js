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

module.exports = (app) => {
  let db;
  MongoClient.connect(CONNECTION_STRING, function(err, _db) {
    if (err) {
      console.error(err) 
      return
    }
    db = _db.db("eoskin-stocks")
  })

  app.route('/api/stock-prices')
    .get(async (req, res) => {
      const { stock: stocks, like } = req.query
      const { currentPrice: price, symbol: stock } = await getStockData(stocks)
      res.json({
        stockData: { stock: stock.toUpperCase(), price: price, likes } 
      })
    });
  const updateLikes = (stock, ip) => {
    db.collection('stock').findOneAndUpdate({ stock }, {likes: ip})
  }
  const getStockData = async (stock) => {
    const { currentPrice: price } = await lookupStock(stock)
    return { stock: stock.toUpperCase(), price }
  }
};
