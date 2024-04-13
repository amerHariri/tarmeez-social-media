import { createContext } from "react";
import { useState, useContext } from "react";

import PostCard from "../components/PostCard";

import axios from "axios";

const LoadPostsContext = createContext();

export const LoadPostsProvider = ({ children }) => {
  const [posts, setPosts] = useState([]);
  const[idFirstPost,setIdFirstPost] = useState()
  const [postLimit, setPostLimit] = useState(15);

  function goLoadPosta() {
    axios
      .get(`https://tarmeezacademy.com/api/v1/posts?limit=${postLimit}`)
      .then(function (response) {
        const apiPosts = response.data.data;
        const showPosts = apiPosts.map((post) => {
          return <PostCard key={post.id} post={post} />;
        });
        setPosts(showPosts);
        setIdFirstPost(apiPosts[0].id)
      })
      .then(() => {})
      .catch(function (error) {
        console.log(error);
      });

  }
  

  return (
    <LoadPostsContext.Provider
      value={{
        goLoadPosta,
        posts,
        setPostLimit,
        postLimit,
        idFirstPost,
      }}
    >
      {children}
    </LoadPostsContext.Provider>
  );
};

export const useLoadPosts = () => {
  return useContext(LoadPostsContext);
};
