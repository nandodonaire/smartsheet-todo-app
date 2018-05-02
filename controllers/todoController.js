let bodyParser = require('body-parser')
let urlencodedParser = bodyParser.urlencoded({extended: false})
let mongoose = require('mongoose')

const config = require('../config.json')

// requiring Smartsheet
let client = require('smartsheet')
let smartsheet = client.createClient({ accessToken: config.SMARTSHEET_ACCESS_TOKEN})
let sheetId = config.SHEET_ID

// constructor function to create each 'ToDo'
const ToDo = function (id, task, status, dueDate) {
  this.id = id
  this.toDoText = task
  this.status = status
  this.dueDate = dueDate
}

module.exports = function (app) {

// Route to get to do tasks from Smartsheet
  app.get('/todo', function (req, res) {
    // res.render('todo', {todos: data})
    let options = {
      id: sheetId
    }
    smartsheet.sheets.getSheet(options)
    .then(function(sheetInfo) {
      let sheetRows = []
      sheetInfo.rows.forEach(function (row) {
        let task = new ToDo (row.id, row.cells[0].value, row.cells[1].value, row.cells[2].value)
        sheetRows.push(task)
      })
      console.log(sheetRows);
      res.render('todo', {todos: sheetRows})
    })
    .catch(function(error) {
        console.log(error);
    });
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
