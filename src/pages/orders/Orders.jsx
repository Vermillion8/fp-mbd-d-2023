import { Card, Typography } from "@material-tailwind/react";
import React, { useState, useEffect, useLayoutEffect } from "react";
import axios from "axios";

const TABLE_HEAD = ["Customer", "Order Date", "Order Status", "Order Price"];

export default function Example() {
  useLayoutEffect(() => {
    document.body.style.backgroundColor = '#d1c4e9';
  });


  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:3000/orders"); // Replace with your API endpoint
        const data = response.data;
        setOrders(data.results);
        console.log(data.results); // Log the fetched data in the console
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, []);

  console.log(orders);

  return (
    <Card className="overflow-scroll h-auto w-auto mx-16 my-16">
      <Typography variant="h1" className="p-4">
        Orders
      </Typography>
      <table className="w-full min-w-max table-auto text-left">
        <thead>
          <tr>
            {TABLE_HEAD.map((head) => (
              <th
                key={head}
                className="border-b border-blue-gray-100 bg-blue-gray-50 p-4"
              >
                <Typography
                  variant="small"
                  color="blue-gray"
                  className="font-normal leading-none opacity-70"
                >
                  {head}
                </Typography>
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {orders.map(({ order_id, customer_name, order_date, order_status, order_price }, index) => {
            const isLast = index === orders.length - 1;
            const classes = isLast ? "p-4" : "p-4 border-b border-blue-gray-50";

            return (
              <tr key={order_id}>
                <td className={classes}>
                  <Typography
                    variant="small"
                    color="blue-gray"
                    className="font-normal"
                  >
                    {customer_name}
                  </Typography>
                </td>
                <td className={`${classes} bg-blue-gray-50/50`}>
                  <Typography
                    variant="small"
                    color="blue-gray"
                    className="font-normal"
                  >
                    {order_date}
                  </Typography>
                </td>
                <td className={classes}>
                  <Typography
                    variant="small"
                    color="blue-gray"
                    className="font-normal"
                  >
                    {order_status}
                  </Typography>
                </td>
                <td className={`${classes} bg-blue-gray-50/50`}>
                  <Typography
                    variant="small"
                    color="blue-gray"
                    className="font-normal"
                  >
                    {order_price}
                  </Typography>
                </td>
                {/* <td className={`${classes} bg-blue-gray-50/50`}>
                  <Typography
                    as="a"
                    href="#"
                    variant="small"
                    color="blue"
                    className="font-medium"
                  >
                    Edit
                  </Typography>
                </td> */}
              </tr>
            );
          })}
        </tbody>
      </table>
    </Card>
  );
}
