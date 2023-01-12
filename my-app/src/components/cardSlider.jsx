import React, {useRef, useState} from "react";
import {AiOutlineLeft,AiOutlineRight} from "react-icons/ai";
import Card from "./card";

export default React.memo(function CardSlider ({data,title}) {

    const listRef = useRef();
    const [sliderPosition, setSliderPosition] = useState(0);
    const [showControls, setShowControls] = useState(false);
    const handleDirection = (direction) => {
    let distance = listRef.current.getBoundingClientRect().x - 70;
    if (direction === "left" && sliderPosition > 0) {
      listRef.current.style.transform = `translateX(${230 + distance}px)`;
      setSliderPosition(sliderPosition - 1);
    }
    if (direction === "right" && sliderPosition < 4) {
      listRef.current.style.transform = `translateX(${-230 + distance}px)`;
      setSliderPosition(sliderPosition + 1);
    }
  };

    return(
        <div className="position-relative">
            <div className="flex column" showControls={showControls}
        onMouseEnter={() => setShowControls(true)}
        onMouseLeave={() => setShowControls(false)}
        >
            <h2 className="ms-4 mt-5">{title}</h2>
            
            <div className="wrapper">
            <div className="slider-action-left">
            <AiOutlineLeft onClick={() => handleDirection("left")} />
            </div>
            <div className="card-slider d-flex me-4" ref={listRef}>
            {data.map((movie, index) => {
                return <Card movieData={movie} index={index} key={movie.id} />;
            })}
            </div>
            <div className="slider-action-right">
            <AiOutlineRight onClick={() => handleDirection("right")} />
            </div>
            </div>
        </div>
        </div>
    )
});