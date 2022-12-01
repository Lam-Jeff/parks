import React, { useState } from "react";
import { HiOutlineX } from "react-icons/hi"
import StarRating from "./StarRating"


const Modal = ({ setIsOpen, currentPark, addInfo, setUpdate, infoPark }) => {
    const [properties, setProperties] = useState(getInfoList())

    function getInfoList() {
        const defaultValue = {
            food: "",
            atmosphere: "",
            entertainment: "",
            theming: "",
            family: "",
            rides: "",
            comment: "",
            finalRating: 1,
            foodRating: 1,
            atmosphereRating: 1,
            entertainmentRating: 1,
            themingRating: 1,
            familyRating: 1,
            ridesRating: 1,
            visited: false,
        }
        return infoPark !== undefined ? infoPark : defaultValue
    }


    const onChange = e => {
        console.log (properties.atmosphere,properties.ridesRating)
        setProperties(prev => {
            return { ...prev, [e.target.name]: e.target.value }
        })
    }

    const handleSubmit = e => {
        e.preventDefault()
        addInfo(currentPark.Park, properties)
        setUpdate(properties, currentPark.Park)
        setIsOpen(false)
    }

    return (
        <div className="modal-container">
            <div className="modal-container__inner">
                <button onClick={() => setIsOpen(false)} className="modal-container__btn-close-modal"><HiOutlineX style={{ color: "black", width: "30px", height: "30px" }} /></button>
                <h1 className="modal-container__title">{currentPark.Park}</h1>
                <div className="modal-container__mark"><StarRating setProperties={setProperties} nameParam={"finalRating"} value={properties.finalRating} /></div>
                <form onSubmit={handleSubmit} className="modal-container__form">
                    <div className="modal-container__form-group">
                        <label className="modal-container__label-food" onClick={e => e.stopPropagation()}>
                            Food:
                            <StarRating className="star-rating-food" setProperties={setProperties} nameParam={"foodRating"} value={properties.foodRating} />
                            <textarea
                                className="input-food-text"
                                placeholder={properties.food || "..."}
                                value={properties.food || ""}
                                name="food"
                                onChange={onChange}
                            />
                        </label>
                    </div>

                    <div className="modal-container__form-group">
                        <label className="modal-container__label-atmosphere">
                            Courtesy, cleanliness, safety and security:
                            <StarRating className="star-rating-atmosphere" setProperties={setProperties} nameParam={"atmosphereRating"} value={properties.atmosphereRating} />
                            <textarea
                                className="input-atmosphere-text"
                                placeholder={properties.atmosphere || "..."}
                                value={properties.atmosphere || ""}
                                name="atmosphere"
                                onChange={onChange}
                            />
                        </label>
                    </div>

                    <div className="modal-container__form-group">
                        <label className="modal-container__label-entertainment">
                            Entertainement:
                            <StarRating className="star-rating-entertainment" setProperties={setProperties} nameParam={"entertainmentRating"} value={properties.entertainmentRating} />
                            <textarea
                                className="input-atmosphere-text"
                                placeholder={properties.entertainment || "..."}
                                value={properties.entertainment || ""}
                                name="entertainment"
                                onChange={onChange}
                            />
                        </label>
                    </div>

                    <div className="modal-container__form-group">
                        <label className="modal-container__label-entertainment">
                            Theming & Design:
                            <StarRating className="star-rating-theming" setProperties={setProperties} nameParam={"themingRating"} value={properties.themingRating} />
                            <textarea
                                className="input-atmosphere-text"
                                placeholder={properties.theming || "..."}
                                value={properties.theming || ""}
                                name="theming"
                                onChange={onChange}
                            />
                        </label>
                    </div>

                    <div className="modal-container__form-group">
                        <label className="modal-container__label-entertainment">
                            Family-oriented:
                            <StarRating className="star-rating-family" setProperties={setProperties} nameParam={"familyRating"} value={properties.familyRating} />
                            <textarea
                                className="input-atmosphere-text"
                                placeholder={properties.family || "..."}
                                value={properties.family || ""}
                                name="family"
                                onChange={onChange}
                            />
                        </label>
                    </div>

                    <div className="modal-container__form-group">
                        <label className="modal-container__label-entertainment">
                            Rides:
                            <StarRating className="star-rating-rides" setProperties={setProperties} nameParam={"ridesRating"} value={properties.ridesRating} />
                            <textarea
                                className="input-atmosphere-text"
                                placeholder={properties.rides || "..."}
                                value={properties.rides || ""}
                                name="rides"
                                onChange={onChange}
                            />
                        </label>
                    </div>

                    <div className="modal-container__form-group">
                        <label className="modal-container__label-comment">
                            Comment:
                            <textarea
                                className="input-comment-text"
                                placeholder={properties.comment || "..."}
                                value={properties.comment || ""}
                                name="comment"
                                onChange={onChange}
                            />
                        </label>
                    </div>
                    <div className="modal-container__input">
                        <button className="modal-container__input-confirm">Confirm</button>
                    </div>

                </form>
            </div>

        </div>
    )
}

export default Modal