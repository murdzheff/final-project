
import Carousel from 'react-bootstrap/Carousel';

function CardsCarousel({ photos }) {
  console.log(photos)

  return (
    <Carousel>
      {photos.map((photo, index) => (
        <Carousel.Item key={index} className="card-carousel-tin" style={{ backgroundImage: `url(${photo})` }}>
          {/* No caption */}
        </Carousel.Item>
      ))}
    </Carousel>
  );
}

export default CardsCarousel;
