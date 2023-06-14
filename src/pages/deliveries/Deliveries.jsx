import { Card, Typography } from "@material-tailwind/react";
import React, { useState, useEffect, useLayoutEffect } from "react";
import axios from "axios";

const TABLE_HEAD = ["Order ID", "Delivery Address", "Delivery Date", "Delivery Cart", "Order Price", "Delivered Date"];


export default function Example() {
  useLayoutEffect(() => {
    document.body.style.backgroundColor = '#d1c4e9';
  });

  const [deliveries, setDeliveries] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:3000/deliveries"); // Replace with your API endpoint
        const data = response.data;
        setDeliveries(data.results);
        console.log(data.results); // Log the fetched data in the console
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, []);

  console.log(deliveries);

  return (
    <Card className="overflow-scroll h-auto w-auto mx-16 my-8">
      <Typography variant="h1" className="p-4">
        Deliveries
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
          {deliveries.map(({ delivery_id, order_id, delivery_address, delivery_date, delivery_cart, delivery_price, delivered_date }, index) => {
            const isLast = index === deliveries.length - 1;
            const classes = isLast ? "p-4" : "p-4 border-b border-blue-gray-50";

            return (
              <tr key={delivery_id}>
                <td className={classes}>
                  <Typography
                    variant="small"
                    color="blue-gray"
                    className="font-normal"
                  >
                    {order_id}
                  </Typography>
                </td>
                <td className={`${classes} bg-blue-gray-50/50`}>
                  <Typography
                    variant="small"
                    color="blue-gray"
                    className="font-normal"
                  >
                    {delivery_address}
                  </Typography>
                </td>
                <td className={classes}>
                  <Typography
                    variant="small"
                    color="blue-gray"
                    className="font-normal"
                  >
                    {delivery_date}
                  </Typography>
                </td>
                <td className={`${classes} bg-blue-gray-50/50`}>
                  <Typography
                    variant="small"
                    color="blue-gray"
                    className="font-normal"
                  >
                    {delivery_cart}
                  </Typography>
                </td>
                <td className={classes}>
                  <Typography
                    variant="small"
                    color="blue-gray"
                    className="font-normal"
                  >
                    {delivery_price}
                  </Typography>
                </td>
                <td className={`${classes} bg-blue-gray-50/50`}>
                  <Typography
                    variant="small"
                    color="blue-gray"
                    className="font-normal"
                  >
                    {delivered_date}
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
