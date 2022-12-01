/* https://www.researchgate.net/publication/229772769_Evaluating_the_Guest_Experience_at_Theme_Parks_An_Empirical_Investigation_of_Key_Attributes */
import React, { useState } from "react"

const ResearchForm = ({ setFilters }) => {
    const [properties, setProperties] = useState({
        namePark: "",
        visited: false,
        overall: "0",
        family: "0",
        theming: "0",
        entertainment: "0",
        rides: "0",
        food: "0",
    })

    const onChange = e => {
        setProperties(prev => {
            return { ...prev, [e.target.name]: e.target.value }
        })
        setFilters(prev => {
            return {
                ...prev,
                [e.target.name]: e.target.value
            }
        })

    }

    const handleClickCheckBox = () => {
        setProperties(prev => { return { ...prev, visited: !prev.visited } })
        setFilters(prev => { return { ...prev, visited: !prev.visited } })
    }

    return (
        <div className="sidebar-content">
            <form action='#' className="form-container">
                <div className="title">Filtres</div>
                <div className="form-group">
                    <label className="display-block">
                        Already visited
                        <input
                            type="checkbox"
                            className="check-visit"
                            name="visited"
                            value={properties.visited}
                            onClick={handleClickCheckBox}
                        />
                        <span className="toggle-switch"></span>
                    </label>

                </div>
                <div className="form-group">
                    <input
                        type="text"
                        className="input-name-park"
                        placeholder="Name"
                        value={properties.namePark}
                        name="namePark"
                        onChange={onChange}
                    />
                </div>
                <div className="form-group">
                    <select
                        className="input-overall-rating"
                        value={properties.overall}
                        name="overall"
                        onChange={onChange}
                        style={{
                            pointerEvents: properties.visited ? "" : "none",
                            border: properties.visited ? "" : "1px solid #999999",
                            backgroundColor: properties.visited ? "" : "#cccccc",
                            color: properties.visited ? "" : "#666666"
                        }}
                    >
                        <option value="0">Overall Rating</option>
                        <option value="1">at least 1</option>
                        <option value="2">at least 2</option>
                        <option value="3">at least 3</option>
                        <option value="4">at least 4</option>
                    </select>
                </div>

                <div className="form-group">
                    <select
                        className="input-family-rating"
                        value={properties.family}
                        name="family"
                        onChange={onChange}
                        style={{
                            pointerEvents: properties.visited ? "" : "none",
                            border: properties.visited ? "" : "1px solid #999999",
                            backgroundColor: properties.visited ? "" : "#cccccc",
                            color: properties.visited ? "" : "#666666"
                        }}
                    >
                        <option value="0">Family Rating</option>
                        <option value="1">at least 1</option>
                        <option value="2">at least 2</option>
                        <option value="3">at least 3</option>
                        <option value="4">at least 4</option>
                    </select>
                </div>

                <div className="form-group">
                    <select
                        className="input-rides-rating"
                        value={properties.rides}
                        name="rides"
                        onChange={onChange}
                        style={{
                            pointerEvents: properties.visited ? "" : "none",
                            border: properties.visited ? "" : "1px solid #999999",
                            backgroundColor: properties.visited ? "" : "#cccccc",
                            color: properties.visited ? "" : "#666666"
                        }}
                    >
                        <option value="0">Rides Rating</option>
                        <option value="1">at least 1</option>
                        <option value="2">at least 2</option>
                        <option value="3">at least 3</option>
                        <option value="4">at least 4</option>
                    </select>
                </div>

                <div className="form-group">
                    <select
                        className="input-theming-rating"
                        value={properties.theming}
                        name="theming"
                        onChange={onChange}
                        style={{
                            pointerEvents: properties.visited ? "" : "none",
                            border: properties.visited ? "" : "1px solid #999999",
                            backgroundColor: properties.visited ? "" : "#cccccc",
                            color: properties.visited ? "" : "#666666"
                        }}
                    >
                        <option value="0">Theming Rating</option>
                        <option value="1">at least 1</option>
                        <option value="2">at least 2</option>
                        <option value="3">at least 3</option>
                        <option value="4">at least 4</option>
                    </select>
                </div>

                <div className="form-group">
                    <select
                        className="input-entertainment-rating"
                        value={properties.entertainment}
                        name="entertainment"
                        onChange={onChange}
                        style={{
                            pointerEvents: properties.visited ? "" : "none",
                            border: properties.visited ? "" : "1px solid #999999",
                            backgroundColor: properties.visited ? "" : "#cccccc",
                            color: properties.visited ? "" : "#666666"
                        }}
                    >
                        <option value="0">Entertainment Rating</option>
                        <option value="1">at least 1</option>
                        <option value="2">at least 2</option>
                        <option value="3">at least 3</option>
                        <option value="4">at least 4</option>
                    </select>
                </div>

                <div className="form-group">
                    <select
                        className="input-food-rating"
                        value={properties.food}
                        name="food"
                        onChange={onChange}
                        style={{
                            pointerEvents: properties.visited ? "" : "none",
                            border: properties.visited ? "" : "1px solid #999999",
                            backgroundColor: properties.visited ? "" : "#cccccc",
                            color: properties.visited ? "" : "#666666"
                        }}
                    >
                        <option value="0">Food Rating</option>
                        <option value="1">at least 1</option>
                        <option value="2">at least 2</option>
                        <option value="3">at least 3</option>
                        <option value="4">at least 4</option>
                    </select>
                </div>
            </form>
        </div>

    )
}

export default ResearchForm