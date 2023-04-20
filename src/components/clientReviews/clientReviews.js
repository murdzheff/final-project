import React from 'react';
import './styles.css'
import { useKeenSlider } from "keen-slider/react"
import "keen-slider/keen-slider.min.css"

export default function ClientReviews() {
  const [sliderRef] = useKeenSlider({
    loop: true,
    mode: "free-snap",
    slides: {
      perView: 3,
      spacing: 15,
    },
  })

  return (
    <div className='reviewsContainer'>

      <div ref={sliderRef} className="keen-slider">
        <div className="keen-slider__slide number-slide1">

          <div className="card testimonial-card">
            <div className="card-up" style={{ backgroundColor: "rgb(253,54,117)" }}></div>
            <div className="avatar mx-auto bg-white">
              <img src="https://mdbcdn.b-cdn.net/img/Photos/Avatars/img%20(6).webp"
                className="rounded-circle img-fluid" />
            </div>
            <div className="card-body">
              <h4 className="mb-4">Maria Smantha</h4>
              <hr />
              <p className="dark-grey-text mt-4">
                <i className="fas fa-quote-left pe-2"></i>Lorem ipsum dolor sit amet eos adipisci,
                consectetur adipisicing elit.
              </p>
            </div>
          </div>

        </div>

        <div className="keen-slider__slide number-slide2">

          <div className="card testimonial-card">
            <div className="card-up" style={{ backgroundColor: "rgb(253,54,117)" }}></div>
            <div className="avatar mx-auto bg-white">
              <img src="https://mdbcdn.b-cdn.net/img/Photos/Avatars/img%20(5).webp"
                className="rounded-circle img-fluid" />
            </div>
            <div className="card-body">
              <h4 className="mb-4">Maria Smantha</h4>
              <hr />
              <p className="dark-grey-text mt-4">
                <i className="fas fa-quote-left pe-2"></i>Lorem ipsum dolor sit amet eos adipisci,
                consectetur adipisicing elit.
              </p>
            </div>
          </div>

        </div>
        <div className="keen-slider__slide number-slide3">

          <div className="card testimonial-card">
            <div className="card-up" style={{ backgroundColor: "rgb(253,54,117)" }}></div>
            <div className="avatar mx-auto bg-white">
              <img src="https://mdbcdn.b-cdn.net/img/Photos/Avatars/img%20(4).webp"
                className="rounded-circle img-fluid" />
            </div>
            <div className="card-body">
              <h4 className="mb-4">Maria Smantha</h4>
              <hr />
              <p className="dark-grey-text mt-4">
                <i className="fas fa-quote-left pe-2"></i>Lorem ipsum dolor sit amet eos adipisci,
                consectetur adipisicing elit.
              </p>
            </div>
          </div>



        </div>
        <div className="keen-slider__slide number-slide4">

          <div className="card testimonial-card">
            <div className="card-up" style={{ backgroundColor: "rgb(253,54,117)" }}></div>
            <div className="avatar mx-auto bg-white">
              <img src="https://mdbcdn.b-cdn.net/img/Photos/Avatars/img%20(3).webp"
                className="rounded-circle img-fluid" />
            </div>
            <div className="card-body">
              <h4 className="mb-4">Maria Smantha</h4>
              <hr />
              <p className="dark-grey-text mt-4">
                <i className="fas fa-quote-left pe-2"></i>Lorem ipsum dolor sit amet eos adipisci,
                consectetur adipisicing elit.
              </p>
            </div>
          </div>

        </div>
        <div className="keen-slider__slide number-slide5">

          <div className="card testimonial-card">
            <div className="card-up" style={{ backgroundColor: "rgb(253,54,117)" }}></div>
            <div className="avatar mx-auto bg-white">
              <img src="https://mdbcdn.b-cdn.net/img/Photos/Avatars/img%20(2).webp"
                className="rounded-circle img-fluid" />
            </div>
            <div className="card-body">
              <h4 className="mb-4">Maria Smantha</h4>
              <hr />
              <p className="dark-grey-text mt-4">
                <i className="fas fa-quote-left pe-2"></i>Lorem ipsum dolor sit amet eos adipisci,
                consectetur adipisicing elit.
              </p>
            </div>
          </div>

        </div>
        <div className="keen-slider__slide number-slide6">

          <div className="card testimonial-card">
            <div className="card-up" style={{ backgroundColor: "rgb(253,54,117)" }}></div>
            <div className="avatar mx-auto bg-white">
              <img src="https://mdbcdn.b-cdn.net/img/Photos/Avatars/img%20(9).webp"
                className="rounded-circle img-fluid" />
            </div>
            <div className="card-body">
              <h4 className="mb-4">Maria Smantha</h4>
              <hr />
              <p className="dark-grey-text mt-4">
                <i className="fas fa-quote-left pe-2"></i>Lorem ipsum dolor sit amet eos adipisci,
                consectetur adipisicing elit.
              </p>
            </div>
          </div>

        </div>
      </div>



    </div>

  )
}


