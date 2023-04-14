
import Carousel from 'react-bootstrap/Carousel';

function CardsCarousel({ photos }) {
  return (
    <Carousel>
      {photos.map((photo, index) => (
        <Carousel.Item key={index} className="card-carousel-tin" style={{ backgroundImage: `url('${photo}')` }}>
          <div className='imageCoversOfCarts' style={{ backgroundImage: `url('${photo}')` }}>
            <div className='overlay-tin'></div>
          </div>
        </Carousel.Item>
      ))}
    </Carousel>
  );
}

export default CardsCarousel;