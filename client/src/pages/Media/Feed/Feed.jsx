import { useContext,useEffect, useState }  from 'react'
import './Feed.css'
import Share from '../Share/Share'
import Post from '../Post/Post'
import axios from "axios";
// import { Posts } from "../../dummyData";
import { AuthContext } from "../../../context/AuthContext";



function Feed({name}) {
  const [posts, setPosts] = useState([]);
  const { user } = useContext(AuthContext);
  console.log(user);
  useEffect(() => {
    const fetchPosts = async () => {
      const res = name
      ? await axios.get("http://localhost:5000/api/posts/profile/" + name)
      : await axios.get("http://localhost:5000/api/posts/timeline/"+ user._id);
      setPosts(
        res.data.sort((p1, p2) => {
          return new Date(p2.createdAt) - new Date(p1.createdAt);
        })
      );
    }
    fetchPosts();
  },[name, user._id])

  return (
    <div className="feed">
      <br/>
      <br/>
    <div className="feedWrapper">

    {(!name || name === user.name) && <Share />}
      {posts.map((p) => (
        <Post key={p._id} post={p} />
      ))}
    </div>
  </div>
  )
}

export default Feed