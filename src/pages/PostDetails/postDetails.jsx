import React, { useEffect, useState } from "react";
import "./postDetails.css";
import Navbar from "../../components/Navbar/navbar";
import LeftSideBar from "../../components/LeftSideBar/leftSideBar";
import RightSideBar from "../../components/RightSideBar/rightSideBar";
import { useParams } from "react-router-dom";
import axios from "axios";
import PostCard from "../../components/PostCard/postCard";

const PostDetails = () => {
  document.title = "tech-social | Post Details";

  const [singlePostLoading, setSinglePostLoading] = useState(false);
  const [postDetails, setPostDetails] = useState({});

  const {postID} = useParams();

  const getPostDetails = async () => {
    try {
        setSinglePostLoading(true);
        const {data, status} = await axios.get(`/api/posts/${postID}`);
        if(status === 200) {
            setPostDetails(data?.post);
            setSinglePostLoading(false);
        }
    }catch(e) {
        console.error(e);
    }
  };
 
  useEffect(() => {
    getPostDetails();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  },[]);

  return (
    <div className="post-details">
      <Navbar />
      <div className="post-details-content">
        <LeftSideBar />
        <div className="post-details-main">
            {
                singlePostLoading ? <p>Loading...</p> :
                postDetails &&
                <PostCard key={postDetails._id} post={postDetails}/>
            }
        </div>
        <RightSideBar />
      </div>
    </div>
  );
};

export default PostDetails;
