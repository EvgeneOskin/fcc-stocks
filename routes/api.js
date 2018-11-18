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
      let stocksArray = stocks
      if (!(stocks instanceof Array)) {
        stocksArray = [stocksArray]
      }
      await updateLikes(stocksArray, req.ip)
      if (stocksArray.length === 1) {
        res.json({ stockData: await getStockData(stocksArray[0]) })
      } else {
        const [leftStock, rightStock] = stocksArray
        const leftStockData = await getStockData(leftStock)
        const rightStockData = await getStockData(rightStock)
        res.json({ stockData: [
          leftStockData, rightStockData
        ]})
      }
    });
  const updateLikes = async (stocks, ip) => {
    const collection = db.collection('stock')
    return await Promise.all(stocks.map(i => collection.findOneAndUpdate(
      { stock: i, ip }, {}, { upsert: true }
    )))
  }
  const getStockData = async (stock) => {
    const { currentPrice: price } = await lookupStock(stock)
    const collection = db.collection('stock')
    const likes = await collection.count({ stock })
    return { stock: stock.toUpperCase(), price, likes }
  }
};
