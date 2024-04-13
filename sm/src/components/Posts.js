import { useLoadPosts } from "../contexts/LoadPostsContext";
import { useEffect } from "react";


import NewPost from "./NewPost";

import { useUserInfo } from "../contexts/UserInfoContext";


export default function Posts() {
  const {goLoadPosta,posts,setPostLimit,postLimit} = useLoadPosts()
  const{userInfo} = useUserInfo()
  
//////////////////////////// for normal create posts line ///////////////////
  useEffect(()=>{
    goLoadPosta()
  },[])


/////////////////////////// for auto pagination //////////////////////////

    useEffect(()=>{
      function scrollMorePosts(){
        if(window.scrollY + window.innerHeight +1 >= document.documentElement.scrollHeight){
          setPostLimit(postLimit +15);
        }
      }
      window.addEventListener('scroll',scrollMorePosts);
      return ()=> window.removeEventListener('scroll',scrollMorePosts);
    })

    useEffect(()=>{
      goLoadPosta();
    },[postLimit])

    ///////////////////////////////////

  return (
    <>
      {!userInfo.user.name ==''?<NewPost />:''}
      {posts}
    </>
  );
}
