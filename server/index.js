const express = require('express')
const bodyParser = require('body-parser')
const app = express()
const db = require('./queries')
const port = 3000
const cors = require('cors');

app.use(cors());
app.use(bodyParser.json())
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
)

app.get('/', (request, response) => {
  response.json({ info: 'Node.js, Express, and Postgres API' })
})

app.get('/customers', db.getCustomers)
app.post('/customers', db.createCustomers)
app.get('/customers/:id', db.getCustomerById)
app.get('/catalog', db.getCatalog)
app.get('/staff', db.getStaff)
app.post('/staff', db.createStaff)
// app.put('/users/:id', db.updateUser)
app.delete('/users/:id', db.deleteUser)
app.get('/orders', db.getDetailedOrders)
app.get('/deliveries', db.getDeliveries)


app.listen(port, () => {
  console.log(`App running on port ${port}.`)
})
