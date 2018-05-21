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

// Route to GET to do tasks from Smartsheet
  app.get('/todo', function (req, res) {
    // this is setting the 'options' that will be passed to 'getSheet' below
    let options = {
      id: sheetId
    }
    // This is the function to GET the sheet from the Smartsheet api
    smartsheet.sheets.getSheet(options)
    .then(function(sheetInfo) {
      // this is an empty array for the rows on the sheet
      let sheetRows = []
      sheetInfo.rows.forEach(function (row) {
        // for each row on the sheet, a 'task' will be created with the 'id' and values on the cells for the 3 columns.
        let task = new ToDo (row.id, row.cells[0].value, row.cells[1].value, row.cells[2].value)
        // each of these tasks will be added to the 'sheetRows' using 'push'.
        sheetRows.push(task)
      })
      // this will render the 'sheetRows' as 'todos'
      res.render('todo', {todos: sheetRows})
    })
    .catch(function(error) {
        console.log(error);
    });
  })

  // Route to POST to do tasks to Smartsheet
  app.post('/todo', urlencodedParser, function (req, res) {
    // here we define what a 'row' is and add the 'value' to the cells in each column.
    let row = [
      {
        "toTop": true,
        "cells": [
          {
            "columnId": config.TEXT_COLUMN_ID,
            "value": req.body.toDoText
          },
          {
            "columnId": config.STATUS_COLUMN_ID,
            "value": req.body.status,
          },
          {
            "columnId": config.DUEDATE_COLUMN_ID,
            "value": req.body.dueDate,
          }
        ]
      }
    ]
      // here we define what 'options' we'll pass to 'addRows'. We specify what sheet to POST to, and make the 'row' that we define above the 'body'.
      let options = {
        sheetId: config.SHEET_ID,
        body: row
      }
      // this is the function to POST the row to the Smartsheet api.
      smartsheet.sheets.addRows(options)
        .then(function(newRow) {
          let task = new ToDo (newRow.result[0].id, newRow.result[0].cells[0].value, newRow.result[0].cells[1].value, newRow.result[0].cells[2].value)
          res.status(200).send(task)
        })
        .catch(function(error) {
          console.log(error);
        })
    })
  // This is the route to DELETE a row from the sheet.
  app.delete('/todo/:item', urlencodedParser, function (req, res) {
    // Set 'options' to include the sheetId and the id of the row we want to delete.
    let options = {
      sheetId: config.SHEET_ID,
      rowId: req.body.id
    };

    // This is the function to delete the row
    smartsheet.sheets.deleteRow(options)
      .then(function(results) {
        console.log(results)
        res.status(200).send('Successfully deleted row!')
      })
      .catch(function(error) {
        console.log(error);
      });
  })
}
