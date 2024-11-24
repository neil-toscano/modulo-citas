import { useRef } from "react";
import Autoplay from "embla-carousel-autoplay";
import { Carousel } from "@mantine/carousel";
import "@mantine/carousel/styles.css";
import One from "@/assets/login/1.webp";
import Two from "@/assets/login/2.webp";
import Three from "@/assets/login/3.webp";
import Four from "@/assets/login/4.webp";
import Five from "@/assets/login/5.webp";
import Six from "@/assets/login/6.webp";
import Seven from "@/assets/login/7.webp";

const SwiperImg = () => {
  const autoplay = useRef(
    Autoplay({
      delay: 3000,
      stopOnMouseEnter: true,
      stopOnFocusIn: true,
      stopOnInteraction: false,
    })
  );

  const images = [One, Two, Three, Four, Five, Six, Seven];

  return (
    <Carousel loop  slideSize="100%" style={{ height: "100%" }} plugins={[autoplay.current]}>
      {images.map((img, index) => (
        <Carousel.Slide key={index}>
          <img
            className="img-login-swiper"
            src={img}
            alt={"Jesús maldonado modulo de cita"}
            style={{ width: "100%", height: "100%", objectFit: "cover" }}
          />
        </Carousel.Slide>
      ))}
    </Carousel>
  );
};

export default SwiperImg;
