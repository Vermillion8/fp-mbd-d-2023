const Pool = require('pg').Pool
const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'MBD Jaya',
  password: '8631',
  port: 5432,
})

const getCustomers = (request, response) => {
  pool.query('SELECT * FROM restoran_seafood.customer ORDER BY customer_id ASC', (error, results) => {
    if (error) {
      throw error
    }

    const customer = results.rows.map((row) => ({
      customer_id: row.customer_id,
      customer_name: row.customer_name,
      customer_age: row.customer_age,
      customer_address: row.customer_address,
      customer_phone: row.customer_phone
    }))

    response.status(200).json({results: customer})
  })
}

const getCustomerById = (request, response) => {
  const id = parseInt(request.params.id)

  pool.query('SELECT * FROM restoran_seafood.customer WHERE customer_id = $1', [id], (error, results) => {
    if (error) {
      throw error
    }
    response.status(200).json(results.rows)
  })
}

const getCatalog = (request, response) => {
  pool.query('SELECT * FROM restoran_seafood.catalog ORDER BY catalog_id ASC', (error, results) => {
    if (error) {
      throw error
    }

    const catalog = results.rows.map((row) => ({
      catalog_id: row.catalog_id,
      catalog_name: row.catalog_name,
      catalog_description: row.catalog_description,
      catalog_price: row.catalog_price,
      catalog_stock: row.catalog_stock
    }))

    response.status(200).json({results: catalog})
  })
}

const createUser = (request, response) => {
  const { name, email } = request.body

  pool.query('INSERT INTO users (name, email) VALUES ($1, $2) RETURNING *', [name, email], (error, results) => {
    if (error) {
      throw error
    }
    response.status(201).send(`User added with ID: ${results.rows[0].id}`)
  })
}

const updateUser = (request, response) => {
  const id = parseInt(request.params.id)
  const { name, email } = request.body

  pool.query(
    'UPDATE users SET name = $1, email = $2 WHERE id = $3',
    [name, email, id],
    (error, results) => {
      if (error) {
        throw error
      }
      response.status(200).send(`User modified with ID: ${id}`)
    }
  )
}

const deleteUser = (request, response) => {
  const id = parseInt(request.params.id)

  pool.query('DELETE FROM users WHERE id = $1', [id], (error, results) => {
    if (error) {
      throw error
    }
    response.status(200).send(`User deleted with ID: ${id}`)
  })
}

module.exports = {
  getCustomers,
  getCustomerById,
  getCatalog,
  createUser,
  updateUser,
  deleteUser,
}