import React, { useState } from 'react';
import { HiStar } from "react-icons/hi"
import "../App.css"

const StarRating = ({ setProperties, nameParam, value }) => {

    const [rating, setRating] = useState(value || 1);
    const [hoverFill, setHoverFill] = useState(null);


    return (
        <div className="rating-stars">
            {[...Array(5)].map((_, index) => {
                const ratingValue = index + 1 

                if (nameParam === "finalRating") {
                    return (
                        <div className="star" key={index}>
                            <span
                                style={{
                                    color:
                                        ratingValue <= (hoverFill || rating) ? "#ffe101" : "white",
                                }}
                                value={ratingValue}
                            ><HiStar style={{
                                height: "25px",
                                width: "25px",
                            }} />
                            </span>
                        </div>

                    )
                }
                else {
                    return (
                        <div className="star" key={index}>
                            <button
                                type="button"
                                key={index}
                                onMouseEnter={() => setHoverFill(ratingValue)}
                                onMouseLeave={() => setHoverFill(null)}
                                onClick={() => {
                                    setRating(ratingValue); setProperties(prev => {
                                        return { ...prev, [nameParam]: ratingValue}
                                    });
                                }}
                            >
                                <span
                                    style={{
                                        color:
                                            ratingValue <= (hoverFill || rating) ? "#ffe101" : "white",
                                    }}
                                    onChange={() => { setRating(ratingValue) }}
                                ><HiStar style={{
                                    height: "25px",
                                    width: "25px",
                                }} />
                                </span>
                            </button>
                        </div>

                    )
                }

            })}
        </div>
    )

}

export default StarRating