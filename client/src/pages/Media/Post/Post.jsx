import React from 'react'
import { MoreVert } from "@mui/icons-material";
import './Post.css'
import { format } from "timeago.js";
import axios from "axios";
import { Link } from "react-router-dom";
import { useContext,useState,useEffect,useRef } from "react";
import { AuthContext } from "../../../context/AuthContext";


function Post({ post }) {
  
  const [like,setLike] = useState(post.likes.length)
  const [isLiked,setIsLiked] = useState(false)
  const [user, setUser] = useState({});
  const PF = "http://localhost:3000/assets/"
  const PPF = "http://localhost:5000/public/images/";
  const videoRef = useRef(null);

  const { user: currentUser } = useContext(AuthContext);

  useEffect(() => {
    setIsLiked(post.likes.includes(currentUser._id));
  }, [currentUser._id, post.likes]);



  const likeHandler =()=>{
    try {
      axios.put("http://localhost:5000/api/posts/" + post._id + "/like", { userId: currentUser._id });
    } catch (err) {console.log(err);}
    setLike(isLiked ? like - 1 : like + 1);
    setIsLiked(!isLiked);
  }


  useEffect(() => {
    const fetchUser = async () => {
      const res = await axios.get(`http://localhost:5000/api/users?userId=${post.userId}`);
      // const response = await axios.get(`http://localhost:5000/images/${post.userId}`);
      setUser(res.data);
    };
    fetchUser();
  }, [post.userId]);
  
  useEffect(() => {
    if (post.img && post.img.includes('.mp4')) {
      videoRef.current.src = PPF + post.img;
    }
  }, [post.img, PPF]);

  return (
    <div className="post">
    <div className="postWrapper">
      <div className="postTop">
        <div className="postTopLeft">
         <Link to={`/media/profile/${user.name}`}> <img
            className="postProfileImg" 
            src={
              user.profilePicture
              ? PF + user.profilePicture
              : PF + "person/noAvatar.png"
            }
            alt=""
          /></Link> 
          <span className="postUsername">
            {user.username}
          </span>
          <span className="postDate">{format(post.createdAt)}</span>
        </div>
        <div className="postTopRight">
          <MoreVert />
        </div>
      </div>
      <div className="postCenter">
        <span className="postText">{post?.desc}</span>
        {post.img && post.img.includes('.mp4') ? (
            <video className="postImg" ref={videoRef} controls />
          ) : (
            <img className="postImg" src={PPF + post.img} alt="" />
          )}
      </div>
      <div className="postBottom">
        <div className="postBottomLeft">
          <img className="likeIcon" src={PF + "like.png"} onClick={likeHandler} alt="" />
          <img className="likeIcon" src={PF+"heart.png"} onClick={likeHandler} alt="" />
          <span className="postLikeCounter">{like} people like it</span>
        </div>
        <div className="postBottomRight">
          <span className="postCommentText">{post.comment} comments</span>
        </div>
      </div>
    </div>
  </div>
  )
}

export default Post