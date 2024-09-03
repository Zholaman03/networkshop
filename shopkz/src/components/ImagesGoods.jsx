import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import "../css/CustomCarousel.css"
const ImagesGoods = ({ images }) => {
    return (
        <div className="col-md">
            <div className="">
                <div id="carouselExampleControls" className="carousel slide">
                    <div className="carousel-inner">
                        {JSON.parse(images).map((image, index) => (
                            <div className={`carousel-item ${index === 0 ? 'active' : ''}`} key={index}>
                                <img
                                src={`http://localhost:3050/images/` + image}
                                className="w-100 product-image"
                                alt={`Slide ${index}`}
                                    
                                />
                            </div>
                        ))}
                    </div>
                </div>
                <div className='d-flex justify-content-around mt-2'>
                    <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleControls" data-bs-slide="prev">
                    <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                    <span className="visually-hidden">Previous</span>
                    </button>
                    <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleControls" data-bs-slide="next">
                        <span className="carousel-control-next-icon" aria-hidden="true"></span>
                        <span className="visually-hidden">Next</span>
                    </button>
                </div>
            </div>     
        </div>
  );
    
};

export default ImagesGoods;
