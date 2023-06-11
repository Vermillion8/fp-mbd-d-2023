import { Carousel } from "@material-tailwind/react";
import KepitingSoka from "../../assets/kepitingsoka.jpg";
import CumiCumi from "../../assets/cumicumiasammanis.jpg";
import KerapuBakar from "../../assets/kerapubakar.jpg";

export default function Example() {
  return (
    <Carousel transition={{ duration: 1 }} autoplay="true" autoplayDelay="5000" loop="true" className="rounded-xl mx-auto max-w-xl">
      <img
        src={KepitingSoka}
        alt="image 1"
        className="h-full w-full object-cover"
      />
      <img
        src={CumiCumi}
        alt="image 2"
        className="h-full w-full object-cover"
      />
      <img
        src={KerapuBakar}
        alt="image 3"
        className="h-full w-full object-cover"
      />
    </Carousel>
  );
}