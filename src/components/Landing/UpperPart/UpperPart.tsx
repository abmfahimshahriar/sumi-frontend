import React from 'react';
import "./UpperPart.css";
import animatedImage from "../../../utility/images/animated.jpg"
const UpperPart = () => {
    return (
        <div className="upper-part-wrapper">
            <div className="headline-text">
                <h1>
                    The project management tool you need.
                </h1>
            </div>
            <div className="animated-img-wrapper">
                <img className="animated-img" src={animatedImage} alt="animated"/>
            </div>
        </div>
    )
}

export default UpperPart;