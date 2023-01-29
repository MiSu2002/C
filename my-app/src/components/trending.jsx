import React from "react";
import Carousel from "../components/carousel";

const Trending = () => {

    return(

        // Top Trending Content 
        <div className="trending-content-div p-0 g-0 m-0">

            <div className="d-none d-xl-block">
            <div className="trending-heading text-white fw-bolder position-absolute">
                    TOP TRENDING
                </div>

    <div className="position-relative col-12 carousel-xxl ms-5">
        <Carousel/>
</div>

            </div>

                <div className="d-block d-xl-none m-0 p-0 container-fluid">
            <div className="ms-3 ms-lg-4 text-white mt-5 fw-bold trending-heading-sm">
                    TOP TRENDING
                </div>

            <div className="mt-4">
                <Carousel/>
            </div>
            </div>
            
        </div>
    );
}

export default Trending;