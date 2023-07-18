import React from 'react'
import './Rightbar.css'
import { Users } from "../../../dummyData";
import { useContext, useEffect, useState } from "react";
import Online from "../online/Online";
import { Link } from "react-router-dom";
import { AuthContext } from "../../../context/AuthContext";
import axios from "axios";
import { Add, Remove } from "@mui/icons-material";



function Rightbar({user}) {
  const PF = "http://localhost:3000/assets/"
  const [friends, setFriends] = useState([]);
  const { user: currentUser, dispatch } = useContext(AuthContext);
  const [followed, setFollowed] = useState(false); // Initially not followed


  console.log("sanna",friends[0],currentUser.followings);
  useEffect(() => {
    console.log("rightbarsanna");
    const checkFollowStatus = () => {
      setFollowed(currentUser.followings.includes(user?._id));
      };
    const getFriends = async () => {
      try {
        const friendList = await axios.get("http://localhost:5000/api/users/friends/" + user._id);
        setFriends(friendList.data);
      } catch (err) {
        console.log(err);
      }
    };
    checkFollowStatus();
    getFriends();
  }, [user,currentUser]);

  console.log("currentuser",currentUser);

  console.log(followed);
  const handleClick = async () => {
    try {
      if (followed) {

        await axios.put(`http://localhost:5000/api/users/${user._id}/unfollow`, {
          userId: currentUser._id,
        });
        dispatch({ type: "UNFOLLOW", payload: user._id });
      } else {
        await axios.put(`http://localhost:5000/api/users/${user._id}/follow`, {
          userId: currentUser._id,
        });
        dispatch({ type: "FOLLOW", payload: user._id });
      }
      setFollowed(!followed);
    } catch (err) {
      console.log(err);
    }
  };

  const HomeRightbar = () => {
    return (
      
      <>
      <br/>
      <br/>
        <div className="birthdayContainer">
          <img className="birthdayImg" src={PF + "/gift.png"} alt="" />
          <span className="birthdayText">
            <b>Pola Foster</b> and <b>3 other friends</b> have a birhday today.
          </span>
        </div>
        <img className="rightbarAd" src={PF + "/ad.png"} alt="" />
        <h4 className="rightbarTitle">Online Friends</h4>
        <div className="rightbarFriendList">
          <div className='rightBarFriend'>
            <div className='rightbarProfileImgContainer'>
              <img className='rightbarProfileImg' src={PF + "/post/3.jpeg"} alt="" />
            <span className='rightbarOnline'></span>
            </div>
            <span className='rightbarUsername'>John Carter</span>
          </div>
          {Users.map((u) => (
            <Online key={u.id} user={u} />
          ))}
        </div>
      </>
    );
  };

  const ProfileRightbar = () => {
    return (
      <>
       {user.name !== currentUser.name ?
          <button className="rightbarFollowButton" onClick={handleClick}>
            {followed ? "Unfollow" : "Follow"}
            {followed ? <Remove /> : <Add />}
          </button>
          :<button className="rightbarFollowButton">
          Profile
        </button>
        }
        <h4 className="rightbarTitle">User information</h4>
        <div className="rightbarInfo">
          <div className="rightbarInfoItem">
            <span className="rightbarInfoKey">City:London</span>
            {/* <span className="rightbarInfoValue">{user.city}</span> */}
          </div>
          <div className="rightbarInfoItem">
            <span className="rightbarInfoKey">From:Madrid</span>
            {/* <span className="rightbarInfoValue">{user.from}</span> */}
          </div>
          <div className="rightbarInfoItem">
            <span className="rightbarInfoKey">Relationship:Single</span>
            {/* <span className="rightbarInfoValue"> {user.relationship === 1
                ? "Single"
                : user.relationship === 1
                ? "Married"
                : "-"}</span> */}
          </div>
        </div>
        <h4 className="rightbarTitle">User friends</h4>
        <div className="rightbarFollowings">
          <div className="rightbarFollowing">
          {friends.map((friend) => (
            <Link
              to={"/media/profile/" + friend.name}
              style={{ textDecoration: "none" ,color:"black",fontWeight:"bold",fontSize:"18px"}}
            >
              <div className="rightbarFollowing">
                <img
                  src={
                    friend.profilePicture
                      ? PF + friend.profilePicture
                      : PF + "person/noAvatar.png"
                  }
                  alt=""
                  className="rightbarFollowingImg"
                />
                <span className="rightbarFollowingName">{friend.name}</span>
              </div>
            </Link>
          ))}
          </div>
          
        </div>
      </>
    );
  };
  return (
    <div className="rightbar">
      <div className="rightbarWrapper">
      {user ? <ProfileRightbar /> : <HomeRightbar />}
      </div>
    </div>
  );
}

export default Rightbar