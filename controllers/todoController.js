let bodyParser = require('body-parser')
let urlencodedParser = bodyParser.urlencoded({extended: false})
let mongoose = require('mongoose')

let data = [{item: 'Get Milk'}, {item: 'Work on Smartsheet app'}, {item: 'Walk Basil'}]

module.exports = function (app) {

  app.get('/todo', function (req, res) {
    res.render('todo', {todos: data})
  })

  app.post('/todo', urlencodedParser, function (req, res) {
    data.push(req.body)
    res.json(data)
  })

  app.delete('/todo/:item', function (req, res) {
    data = data.filter(function(todo) {
      return todo.item.replace(/ /g, '-') !== req.params.item
    })
    res.json(data)
  })
}
