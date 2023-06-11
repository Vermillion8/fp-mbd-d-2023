import Carousel from "../../components/carousel/Carousel";
import { Button } from "@material-tailwind/react";
import { Typography } from "@material-tailwind/react";

import React, { useLayoutEffect } from 'react'

const Home = () => {
  useLayoutEffect(() => {
    document.body.style.backgroundColor = '#ad1457';
  });

  return (
    <div classname="mx-auto p-4">
      <Typography variant="h1" className="flex justify-center p-4 text-center">Online Seafood Restaurant</Typography>

      <Carousel />

      <Typography variant="paragraph" className="flex justify-center text-xl p-4 text-center mx-64">
        Welcome to our online seafood restaurant, where ocean delicacies are just a click away! Indulge in a feast of fresh and flavorful seafood delivered right to your doorstep.
      </Typography>
      <Typography variant="paragraph" className="flex justify-center text-xl p-4 text-center mx-64">
        At our online seafood restaurant, we offer a wide selection of the
        finest seafood sourced directly from the bountiful oceans. From
        succulent lobster and tender shrimp to exquisite salmon and delectable
        crab, our menu is a celebration of the ocean's treasures.
      </Typography>
      <Typography variant="paragraph" className="flex justify-center text-xl p-4 text-center mx-64">
        Our team of expert chefs meticulously prepares each dish with passion
        and creativity, ensuring that every bite is a burst of delightful
        flavors. Whether you crave a traditional seafood platter, a
        mouthwatering seafood pasta, or a grilled catch of the day, we have an
        enticing array of options to satisfy your cravings.
      </Typography>
      <Typography variant="paragraph" className="flex justify-center text-xl p-4 text-center mx-64">
        Ordering from our online seafood restaurant is effortless. Simply browse
        our menu, select your desired dishes, and proceed to checkout. We
        understand the importance of freshness, so rest assured that our seafood
        is carefully packaged and delivered to your doorstep in pristine
        condition.
      </Typography>
    </div>
  );
};

export default Home;
