import React from 'react'
import "./Topbar.css";
import { Search, Person, Chat, Notifications } from "@mui/icons-material";
import { Link } from "react-router-dom";
import { useContext,useState } from "react";
import { AuthContext } from "../../../context/AuthContext";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import bars from "../../../assets/bars-solid.svg";

function Topbar({handleSlideIn}) {
  const { dispatch } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch({ type: "LOGOUT" });
    navigate("/");
  }

  const [searchInput, setSearchInput] = useState("");
  const [searchResult, setSearchResult] = useState(null);

  const handleSearch = async () => {
    try {
      const response = await axios.get(`http://localhost:5000/api/users/?name=${searchInput}`);
      setSearchResult(response.data);
      if(searchResult){
        navigate(`/media/profile/${searchResult.name}`)
      }
    } catch (error) {
      console.log(error);
    }
  };
  const { user } = useContext(AuthContext);
  const PF = "http://localhost:3000/assets/"
  return (
    <div className="topbarContainer">
      <button className="slide-in-icon" onClick={() => handleSlideIn()}>
          <img src={bars} alt="bars" width="15" />
        </button>
      <div className="topbarLeft">
      <Link to="/home" style={{ textDecoration: "none" }}>
          <span className="logo">SocialGlobe</span>
        </Link>
      </div>
      <div className="topbarCenter">
      <div className="searchbar">
          <Search className="searchIcon" onClick={handleSearch}/>
          <input
            placeholder="Search for friend!"
            className="searchInput"
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
          />
        </div>
      </div>
      <div className="topbarRight">
          <div className="topbarLinks">
          <Link to="/home" style={{ textDecoration: "none",color:"white"}}><span className="topbarLink">Homepage</span></Link>
          <span className="topbarLink" onClick={handleLogout}>Logout</span>
        </div>
        <div className="topbarIcons">
          <div className="topbarIconItem">
            <Person />
            <span className="topbarIconBadge">1</span>
          </div>
          <div className="topbarIconItem">
            <Chat />
            <span className="topbarIconBadge">2</span>
          </div>
          <div className="topbarIconItem">
            <Notifications />
            <span className="topbarIconBadge">1</span>
          </div>
        </div>
        <Link to={`/media/profile/${user?.name}`}>
        <img src={
              user?.profilePicture
                ? PF + user?.profilePicture
                : PF + "person/noAvatar.png"
            } alt="" className="topbarImg"/>
        </Link>
      </div>
    </div>
  )
}

export default Topbar