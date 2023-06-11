import React, { Fragment, useState, useEffect } from "react";
import axios from "axios";

import {
  Button,
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
} from "@material-tailwind/react";

const catalogImage = [
  {
    id: 1,
    name: "Kepiting Soka",
    href: { Dialog },
    imageSrc: "https://oss.mommyasia.id/photo/5cbfd47e8e4d537b0aca3218",
    imageAlt: "Kepiting Soka",
  },
  {
    id: 2,
    name: "Udang Bakar",
    href: "#",
    imageSrc:
      "https://i0.wp.com/resepkoki.id/wp-content/uploads/2017/10/Resep-Udang-Bakar-Madu.jpg?fit=1080%2C1194&ssl=1",
    imageAlt: "Udang Bakar",
  },
  {
    id: 3,
    name: "Kerang Saus Padang",
    href: "#",
    imageSrc:
      "https://img-global.cpcdn.com/recipes/cf4189da0a3d79c4/680x482cq70/kerang-saus-padang-foto-resep-utama.jpg",
    imageAlt: "Kerang Saus Padang",
  },
  {
    id: 4,
    name: "Ikan Gurame Goreng",
    href: "#",
    imageSrc:
      "https://sweetrip.id/wp-content/uploads/2021/04/135651803_422091019027872_4477950715494497760_n.jpg",
    imageAlt: "Ikan Gurame Goreng",
  },
  {
    id: 5,
    name: "Cumi-Cumi Asam Manis",
    href: "#",
    imageSrc:
      "https://sweetrip.id/wp-content/uploads/2021/04/135651803_422091019027872_4477950715494497760_n.jpg",
    imageAlt: "Cumi-Cumi Asam Manis",
  },
  {
    id: 6,
    name: "Sotong Goreng Tepung",
    href: "#",
    imageSrc:
      "https://cdn1-production-images-kly.akamaized.net/MQ8YtPmcnkbhLYeUifMde8iy0BM=/0x69:999x632/469x260/filters:quality(75):strip_icc():format(webp)/kly-media-production/medias/3572190/original/067097200_1631680231-shutterstock_236914093.jpg",
    imageAlt: "Sotong Goreng Tepung",
  },
  {
    id: 7,
    name: "Lobster Saus Tiram",
    href: "#",
    imageSrc:
      "https://img-global.cpcdn.com/recipes/e5da3143c419866b/1200x630cq70/photo.jpg",
    imageAlt: "Lobster Saus Tiram",
  },
  {
    id: 8,
    name: "Kerapu Bakar",
    href: "#",
    imageSrc: "https://cf.shopee.co.id/file/3d7872a842126d180d1e9406a895ab35",
    imageAlt: "Kerapu Bakar",
  },
  // More products...
];

export default function Example() {
  const [catalog, setCatalog] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:3000/catalog"); // Replace with your API endpoint
        const data = response.data;
        setCatalog(data.results);
        console.log(data.results); // Log the fetched data in the console
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, []);

  console.log(catalog);

  const [open, setOpen] = useState(false);

  const handleOpen = () => setOpen(!open);

  return (
    <div className="bg-white">
      <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-8 lg:max-w-7xl lg:px-8">
        <h2 className="text-2xl font-bold tracking-tight text-gray-900">
          Catalog
        </h2>

        <div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
          {catalog.map((product) => (
            <div key={product.catalog_id} className="group relative">
              {catalogImage
                .filter((innerItem) => innerItem.id === product.catalog_id)
                .map((image) => (
                  <div
                    key={image.id}
                    className="relative aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-md bg-gray-300 lg:aspect-none lg:h-80"
                  >
                    <img
                      src={image.imageSrc}
                      alt={image.imageAlt}
                      className="h-full w-full object-cover object-center lg:h-full lg:w-full"
                    />
                    <div className="absolute h-full w-full bg-black/20 flex items-center justify-center -bottom-10 group-hover:bottom-0 opacity-0 group-hover:opacity-100 transition-all duration-300">
                      <Button className="bg-black text-white py-2 px-5">
                        Text
                      </Button>
                    </div>
                  </div>
                ))}
              <div className="mt-4 flex justify-between">
                <div>
                  <h3 className="text-sm text-gray-700">
                    {/* <a href={product.href}> */}
                    {/* <span aria-hidden="true" className="absolute inset-0" /> */}
                    {product.catalog_name}
                    {/* </a> */}
                  </h3>
                  <p className="mt-1 text-sm text-gray-500">
                    {product.catalog_description}
                  </p>
                </div>
                <p className="text-sm font-medium text-gray-900">
                  Rp{product.catalog_price},-
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
