const Pool = require("pg").Pool;
const pool = new Pool({
  user: "postgres",
  host: "localhost",
  database: "MBD Jaya",
  password: "8631",
  port: 5432,
});

const getCustomers = (request, response) => {
  pool.query(
    "SELECT * FROM restoran_seafood.customer ORDER BY customer_id ASC",
    (error, results) => {
      if (error) {
        throw error;
      }

      const customer = results.rows.map((row) => ({
        customer_id: row.customer_id,
        customer_name: row.customer_name,
        customer_age: row.customer_age,
        customer_address: row.customer_address,
        customer_phone: row.customer_phone,
      }));

      response.status(200).json({ results: customer });
    }
  );
};

const getCustomerById = (request, response) => {
  const id = parseInt(request.params.id);

  pool.query(
    "SELECT * FROM restoran_seafood.customer WHERE customer_id = $1",
    [id],
    (error, results) => {
      if (error) {
        throw error;
      }
      response.status(200).json(results.rows);
    }
  );
};

const getCatalog = (request, response) => {
  pool.query(
    "SELECT * FROM restoran_seafood.catalog ORDER BY catalog_id ASC",
    (error, results) => {
      if (error) {
        throw error;
      }

      const catalog = results.rows.map((row) => ({
        catalog_id: row.catalog_id,
        catalog_name: row.catalog_name,
        catalog_description: row.catalog_description,
        catalog_price: row.catalog_price,
        catalog_stock: row.catalog_stock,
      }));

      response.status(200).json({ results: catalog });
    }
  );
};

const getStaff = (request, response) => {
  pool.query(
    "SELECT * FROM restoran_seafood.karyawan ORDER BY karyawan_id ASC",
    (error, results) => {
      if (error) {
        throw error;
      }

      const staff = results.rows.map((row) => ({
        staff_id: row.karyawan_id,
        staff_name: row.karyawan_nama,
        staff_job: row.karyawan_job,
        staff_status: row.karyawan_status,
        staff_age: row.karyawan_age,
        staff_phone: row.karyawan_phone,
        staff_email: row.karyawan_email,
        staff_gender: row.karyawan_gender,
        staff_salary: row.karyawan_salary,
      }));

      response.status(200).json({ results: staff });
    }
  );
};

// add trigger to handle new staff status and salary
const createStaff = (request, response) => {
  const { name, job, status, age, phoneNumber, email, gender, salary } =
    request.body;

  // (karyawan_nama, karyawan_job, karyawan_status, karyawan_age, karyawan_phone, karyawan_email, karyawan_gender, karyawan_salary)
  pool.query(
    "INSERT INTO restoran_seafood.karyawan VALUES (default, $1, $2, $3, $4, $5, $6, $7, $8) RETURNING *",
    [name, job, status, age, phoneNumber, email, gender, salary],
    (error, results) => {
      if (error) {
        throw error;
      }
      response.status(201).send(`Staff added with ID: ${results.rows[0].id}`);
    }
  );
};

const getDetailedOrders = (request, response) => {
  pool.query(
    "SELECT * FROM restoran_seafood.detailed_order",
    (error, results) => {
      if (error) {
        throw error;
      }

      const orders = results.rows.map((row) => ({
        order_id: row.order_id,
        customer_name: row.customer_name,
        order_date: row.order_tanggal,
        order_status: row.order_status,
        order_price: row.order_totalprice,
      }));

      response.status(200).json({ results: orders });
    }
  );
};

const getDeliveries = (request, response) => {
  pool.query(
    "SELECT delivery_id, order_id, delivery_address, delivery_date, delivery_cart, delivery_price, delivered_date FROM restoran_seafood.delivery",
    (error, results) => {
      if (error) {
        throw error;
      }

      const deliveries = results.rows.map((row) => ({
        delivery_id: row.delivery_id,
        order_id: row.order_id,
        delivery_address: row.delivery_address,
        delivery_date: row.delivery_date,
        delivery_cart: row.delivery_cart,
        delivery_price: row.delivery_price,
        delivered_date: row.delivered_date,
      }));

      response.status(200).json({ results: deliveries });
    }
  );
};

const updateStaff = (request, response) => {
  const id = parseInt(request.params.id);
  const { name, email } = request.body;

  pool.query(
    "UPDATE users SET name = $1, email = $2 WHERE id = $3",
    [name, email, id],
    (error, results) => {
      if (error) {
        throw error;
      }
      response.status(200).send(`User modified with ID: ${id}`);
    }
  );
};

const createCustomers = (request, response) => {
  const { name, age, address, phoneNumber } = request.body;

  pool.query(
    "INSERT INTO restoran_seafood.customer VALUES (default, $1, $2, $3, $4) RETURNING *",
    [name, age, address, phoneNumber],
    (error, results) => {
      if (error) {
        throw error;
      }
      response
        .status(201)
        .send(`Customer added with ID: ${results.rows[0].id}`);
    }
  );
};

module.exports = {
  getCustomers,
  getCustomerById,
  getCatalog,
  getStaff,
  createCustomers,
  createStaff,
  getDetailedOrders,
  getDeliveries,
  updateStaff,
};
