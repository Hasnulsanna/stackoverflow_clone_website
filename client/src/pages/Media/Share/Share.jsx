import React from 'react'
import './Share.css'
import {PermMedia, Label,Room, EmojiEmotions,Cancel} from "@mui/icons-material"
import { useContext, useRef, useState } from "react";
import { AuthContext } from "../../../context/AuthContext";
import axios from "axios";

function Share() {

  const { user } = useContext(AuthContext);
  const PF = "http://localhost:3000/assets/"
  const desc = useRef();
  const [file, setFile] = useState(null);

  const submitHandler = async (e) => {
    e.preventDefault();
    const newPost = {
      userId: user._id,
      desc: desc.current.value,
    };
    if (file) {
      const data = new FormData();
      const fileName = Date.now() + file.name;
      data.append("name", fileName);
      data.append("file", file);
      newPost.img = fileName;
      console.log(newPost);
      try {
        await axios.post("http://localhost:5000/api/upload", data);
      } catch (err) {}
    }
    try {
      await axios.post("http://localhost:5000/api/posts", newPost);
      window.location.reload();
    } catch (err) {}
  };



  return (
    <div className="share">
      <div className="shareWrapper">
        <div className="shareTop">
          <img className="shareProfileImg" src={
              user.profilePicture
                ? PF + user.profilePicture
                : PF + "person/noAvatar.png"
            } alt="" />
          <input
            placeholder={"What's in your mind " + user.name + "?"}
            className="shareInput"
            ref={desc}
          />
        </div>
        <hr className="shareHr"/>
        {/* {file && (
          <div className="shareImgContainer">
            <img className="shareImg" src={URL.createObjectURL(file)} alt="" />
            <Cancel className="shareCancelImg" onClick={() => setFile(null)} />
          </div>
        )} */}
            {file && (
          <div className="shareImgContainer">
            {file.type.includes('video') ? (
              <video className="shareImg" controls>
                <source src={URL.createObjectURL(file)} type={file.type} />
              </video>
            ) : (
              <img
                className="shareImg"
                src={URL.createObjectURL(file)}
                alt=""
              />
            )}
            <Cancel className="shareCancelImg" onClick={() => setFile(null)} />
          </div>
        )}
        <form className="shareBottom" onSubmit={submitHandler}>
            <div className="shareOptions">
                <label htmlFor="file" className="shareOption">
                    <PermMedia htmlColor="tomato" className="shareIcon"/>
                    <span className="shareOptionText">Photo or Video</span>
                    <input
                style={{ display: "none" }}
                type="file"
                id="file"
                accept=".png, .jpeg, .jpg, .mp4, .avi, .mkv"
                onChange={(e) => setFile(e.target.files[0])}
              />
                </label>
                <div className="shareOption">
                    <Label htmlColor="blue" className="shareIcon"/>
                    <span className="shareOptionText">Tag</span>
                </div>
                <div className="shareOption">
                    <Room htmlColor="green" className="shareIcon"/>
                    <span className="shareOptionText">Location</span>
                </div>
                <div className="shareOption">
                    <EmojiEmotions htmlColor="goldenrod" className="shareIcon"/>
                    <span className="shareOptionText">Feelings</span>
                </div>
            </div>
            <button className="shareButton" type="submit">Share</button>
        </form>
      </div>
    </div>
  )
}

export default Share