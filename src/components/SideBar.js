import React, { useState } from "react"
import "../App.css"
import { MdClose } from "react-icons/md"
import { FiMenu } from "react-icons/fi"
import ResearchForm from "./ResearchForm"

const SideBar = ({setFilters}) => {
  const [navbarOpen, setNavbarOpen] = useState(false)

  const handleToggle = () => {
    setNavbarOpen(prev => !prev)
  }



  return (
    <nav className="navBar">
      <button onClick={handleToggle} >{navbarOpen ? (
        <MdClose style={{ color: "#fff", width: "40px", height: "40px" }} />
      ) : (
        <FiMenu style={{ color: "#7b7b7b", width: "40px", height: "40px" }} />
      )}</button>
      <div className={`menuNav ${navbarOpen ? " showMenu" : ""}`}>
            <ResearchForm setFilters={setFilters}/>
      </div>
    </nav>
  )
}
export default SideBar