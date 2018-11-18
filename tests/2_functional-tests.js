/*
*
*
*       FILL IN EACH FUNCTIONAL TEST BELOW COMPLETELY
*       -----[Keep the tests in the same order!]-----
*       (if additional are added, keep them at the very end!)
*/

var chaiHttp = require('chai-http');
var chai = require('chai');
var assert = chai.assert;
var server = require('../server');

chai.use(chaiHttp);

suite('Functional Tests', function() {
    
    suite('GET /api/stock-prices => stockData object', function() {
      
      test('1 stock', function(done) {
       chai.request(server)
        .get('/api/stock-prices')
        .query({stock: 'goog'})
        .end(function(err, res){
          assert.property(res.body, 'stockData')
          assert.property(res.body.stockData, 'stock')
          assert.property(res.body.stockData, 'price')
          assert.property(res.body.stockData, 'likes')
          done();
        });
      });
      
      test('1 stock with like', function(done) {
       chai.request(server)
        .get('/api/stock-prices')
        .query({ stock: 'goog', like: true })
        .end(function(err, res){
          assert.property(res.body, 'stockData')
          assert.property(res.body.stockData, 'stock')
          assert.property(res.body.stockData, 'price')
          assert.property(res.body.stockData, 'likes')
          assert.equal(res.body.stockData.likes, 1)
          done();
        });
      });
      
      test('1 stock with like again (ensure likes arent double counted)', function(done) {
       chai.request(server)
        .get('/api/stock-prices')
        .query({ stock: 'goog', like: true })
        .end(function(err, res){
          assert.property(res.body, 'stockData')
          assert.property(res.body.stockData, 'stock')
          assert.property(res.body.stockData, 'price')
          assert.property(res.body.stockData, 'likes')
          assert.equal(res.body.stockData.likes, 1)
          done();
        });
      });
      
      test('2 stocks', function(done) {
       chai.request(server)
        .get('/api/stock-prices')
        .query({ stock: ['goog', 'qqq']})
        .end(function(err, res){
          assert.property(res.body, 'stockData')
          assert.isAray(res.body.stockData)
          res.body.stockData.forEach(i => {
            assert.property(i, 'stock')
            assert.property(i, 'price')
            assert.property(i, 'rel_likes')
          })
          done();
        });
      });
      
      test('2 stocks with like', function(done) {
       chai.request(server)
        .get('/api/stock-prices')
        .query({ stock: ['goog', 'qqq'], like: true })
        .end(function(err, res){
          assert.property(res.body, 'stockData')
          assert.isAray(res.body.stockData)
          res.body.stockData.forEach(i => {
            assert.property(i, 'stock')
            assert.property(i, 'price')
            assert.property(i, 'rel_likes')
          })
          assert.equal(res.body.stockData[0], res.body.stockData[1])
          assert.equal(res.body.stockData[0], res.body.stockData[1])
          done();
        });

      });
      
    });

});
