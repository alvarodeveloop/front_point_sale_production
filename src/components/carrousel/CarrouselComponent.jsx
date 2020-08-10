import React from 'react';
import {
  Carousel,
} from 'react-bootstrap';

const CarrouselComponent = (props) => {

  const slides = props.items.map(item => {
    return (
      <Carousel.Item
        key={item.src}
      >
        <img src={item.src} alt={item.altText} className={props.imgClass} />
        <Carousel.Caption>
          <h3>{item.caption}</h3>
        </Carousel.Caption>
      </Carousel.Item>
    );
  });

  return (
    <Carousel>
      {slides}
    </Carousel>
  );
}

export default CarrouselComponent;
