import React, { useState, useEffect } from "react";
import {
  ComposableMap,
  Geographies,
  Geography,
  ZoomableGroup,
  Marker

} from "react-simple-maps";
import { HiMinus, HiPlus } from "react-icons/hi"
import Reader from "./CsvReader"
import '../App.css'
import Modal from "./Modal"
import SideBar from "./SideBar"


const geoUrl = "https://raw.githubusercontent.com/deldersveld/topojson/master/world-countries-sans-antarctica.json"

const MapChart = () => {
  const [position, setPosition] = useState({ coordinates: [30, 40], zoom: 1 })
  const [parks, setParks] = useState() // retrieve data from csv file
  const [openModal, setOpenModal] = useState(false)
  const [currentPark, setCurrentPark] = useState()
  const [infoParks, setInfoParks] = useState(getInfoList())
  const [newInfo, setNewInfo] = useState()
  const [filters, setFilters] = useState({
    namePark: "",
    visited: false,
    overall: "0",
    family:"0",
    theming:"0",
    entertainment:"0",
    rides:"0",
    food: "0",
  })

  useEffect(() => {
    if (newInfo && !infoParks.some(elem => elem.name === newInfo.name)) {
      setInfoParks([...infoParks, newInfo])
    }
  }, [infoParks, newInfo])

  useEffect(() => {
    window.localStorage.setItem('parks', JSON.stringify(infoParks));
  }, [infoParks]);

  function getInfoList() {
    // getting stored items
    const temp = localStorage.getItem("parks")
    const savedParks = JSON.parse(temp)
    return (savedParks !== null ? savedParks : [])
  }

  const addInfoPark = (park, properties) => {
    const newInfo = {
      name: park,
      food: properties.food,
      atmosphere: properties.atmosphere,
      theming: properties.theming,
      family: properties.family,
      rides: properties.rides,
      entertainment: properties.entertainment,
      comment: properties.comment,
      finalRating: Math.round((properties.foodRating + 
        properties.atmosphereRating + 
        properties.entertainmentRating + 
        properties.themingRating + 
        properties.familyRating + 
        properties.ridesRating) / 6),
      foodRating: properties.foodRating,
      atmosphereRating: properties.atmosphereRating,
      entertainmentRating: properties.entertainmentRating,
      themingRating: properties.themingRating,
      familyRating: properties.familyRating,
      ridesRating: properties.ridesRating,
      visited: true,
    }
    setNewInfo(newInfo)
  }

  const setUpdate = (updatedInfo, parkName) => {
    setInfoParks(
      infoParks.map(park => {
        if (park.name === parkName) {
          return {
            ...park,
            food: updatedInfo.food,
            atmosphere: updatedInfo.atmosphere,
            theming: updatedInfo.theming,
            family: updatedInfo.family,
            rides: updatedInfo.rides,
            entertainment: updatedInfo.entertainment,
            comment: updatedInfo.comment,
            finalRating: Math.round((updatedInfo.foodRating + 
              updatedInfo.atmosphereRating + 
              updatedInfo.entertainmentRating+ 
              updatedInfo.themingRating+ 
              updatedInfo.familyRating+ 
              updatedInfo.ridesRating) / 6),
            foodRating: updatedInfo.foodRating,
            atmosphereRating: updatedInfo.atmosphereRating,
            entertainmentRating: updatedInfo.entertainmentRating,
            themingRating: updatedInfo.themingRating,
            familyRating: updatedInfo.familyRating,
            ridesRating: updatedInfo.ridesRating,
          }
        }
        return park
      })
    )
  }
  const getParks = childData => {
    setParks(childData)
  }

  /* Handle */
  const handleClick = (marker) => () => {
    setOpenModal(!openModal)
    setCurrentPark(marker)
  }
  const handleZoomIn = () => {
    if (position.zoom >= 4) return;
    setPosition(prev => ({ ...prev, zoom: prev.zoom * 2 }));
  }

  const handleZoomOut = () => {
    if (position.zoom <= 1) return;
    setPosition(prev => ({ ...prev, zoom: prev.zoom / 2 }));
  }

  const handleMoveEnd = position => {
    setPosition(position);
  }

  return (
    <>
      <SideBar setFilters={setFilters} />
      <div className="map-wrapper">
        <ComposableMap className="map" projection="geoMercator" projectionConfig={{
          scale: 400,
        }}
          style={{ width: "100%", height: "auto" }} >
          <ZoomableGroup
            zoom={position.zoom}
            center={position.coordinates}
            onMoveEnd={handleMoveEnd}
          >
            <Geographies geography={geoUrl}>
              {({ geographies }) =>
                geographies.map((geo) => (
                  <Geography key={geo.rsmKey}
                    geography={geo}
                    fill="#EAEAEC"
                    stroke="#D6D6DA"
                    style={{ pressed: { outline: "none" }, default: { outline: "none" }, hover: { outline: "none" } }}
                  />
                ))
              }
            </Geographies>
            {parks?.data.map((elem, idx) => {
              if (!filters.visited) {
                return ((filters.namePark === "" ? elem.Park.match(/.*?/) : elem.Park.toLowerCase().includes(filters.namePark.toLowerCase())) &&
                  <Marker key={idx} coordinates={[elem.longitude, elem.latitude]} className="marker-park" >
                    <text
                      textAnchor="middle"
                      y={position.zoom > 3 ? 4 : 8}
                      style={{ fontFamily: "system-ui", fill: "#5D5A6D", fontSize: position.zoom > 3 ? "3px" : "10px" }}
                    >
                      {elem.Park}
                    </text>
                    <circle r={2 / position.zoom > 0.3 ? 2 / position.zoom : 0.3} fill="#F00" stroke="#fff" strokeWidth={0} style={{ cursor: "pointer" }} onClick={handleClick(elem)} />

                  </Marker>
                )
              }
              else {
                return (infoParks.find(x => x.name === elem.Park) &&
                  (infoParks.filter(x => x.name === elem.Park && 
                    x.visited && 
                    x.finalRating >= parseInt(filters.overall) &&
                    x.entertainmentRating >= parseInt(filters.entertainment) &&
                    x.foodRating >= parseInt(filters.food) &&
                    x.ridesRating >= parseInt(filters.rides) &&
                    x.themingRating >= parseInt(filters.theming) &&
                    x.familyRating >= parseInt(filters.family)).length > 0) &&
                  <Marker key={idx} coordinates={[elem.longitude, elem.latitude]} className="marker-park" >
                    <text
                      textAnchor="middle"
                      y={position.zoom > 3 ? 4 : 8}
                      style={{ fontFamily: "system-ui", fill: "#5D5A6D", fontSize: position.zoom > 3 ? "3px" : "10px" }}
                    >
                      {elem.Park}
                    </text>
                    <circle r={2 / position.zoom > 0.3 ? 2 / position.zoom : 0.3} fill="#F00" stroke="#fff" strokeWidth={0} style={{ cursor: "pointer" }} onClick={handleClick(elem)} />

                  </Marker>
                )
              }

            })}
          </ZoomableGroup>
        </ComposableMap>
        {openModal && <Modal setIsOpen={setOpenModal} currentPark={currentPark} addInfo={addInfoPark} setUpdate={setUpdate} infoPark={infoParks.find(x => x.name === currentPark.Park)} />}
        <Reader parentCallback={getParks} />
        <div className="map-wrapper__controls">
          <button onClick={handleZoomIn} className="plusButton"><HiPlus style={{ color: "#ccc", width: "40px", height: "40px" }} /></button>
          <button onClick={handleZoomOut} className="minusButton"><HiMinus style={{ color: "#ccc", width: "40px", height: "40px" }} /></button>
        </div>
      </div>
    </>
  );
};

export default MapChart;

