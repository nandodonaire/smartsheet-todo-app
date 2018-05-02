let express = require('express')
let todoController = require('./controllers/todoController')

let app = express()

// setting up the template engine
app.set('view engine', 'ejs')

//static files

app.use(express.static('./public'))

// fire controllers

todoController(app)

//listen to port
app.listen(3000)
console.log('Listening to port 3000')
