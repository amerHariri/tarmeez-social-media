import Card from "@mui/material/Card";
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';

import { useEffect, useState } from "react";

import { useParams } from "react-router-dom";

import axios from "axios";

import PostCard from "./PostCard";

export default function UserProfile() {
  const [userData, setUserData] = useState([]);
  const [userPosts, setUserPosts] = useState([]);
  const { userId } = useParams();
  function LoadProfile() {
    const url = `https://tarmeezacademy.com/api/v1/users/${userId}`;

    axios
      .get(url)
      .then(function (response) {
        const userdata = response.data.data;
        setUserData(userdata);
      })

      .catch(function (error) {
        console.log(error);
      });
  }

  useEffect(() => {
    LoadProfile();
  }, []);

  function LoadUserPosts() {
    const url = `https://tarmeezacademy.com/api/v1/users/${userId}/posts`;

    axios
      .get(url)
      .then(function (response) {
        const userposts = response.data.data;
        setUserPosts(userposts);
      })

      .catch(function (error) {
        console.log(error);
      });
  }

  useEffect(() => {
    LoadUserPosts();
  }, []);

  return (
    <>

    <Card  sx={{
          minWidth: '90%',
          margin: "0 0 10px 0",
        }}>

<Box
      sx={{
        display: 'flex',
        '& > :not(style)': {
          m: 1,
          width: 128,
          height: 158,
        },
        
      }}
      style={{height:'150px'}}
    >
      
      <Paper style={{width:'25%',height:'90%',display:'flex',justifyContent:'center',alignItems:'center',minWidth:'120px'}}><img
            src={userData.profile_image}
            alt=""
            style={{
              border: "0.8px solid #f7f7f7",
              marginRight: "10px",
              backgroundColor: "#305252",
              minWidth:'100px',
              width: "100px",
              height: "100px",
              borderRadius: "50%",
            }}
          ></img></Paper>
      <Paper style={{width:'40%',height:'90%',minWidth:'140px'}}>

      <p>{userData.email}</p>
            <p>{userData.name}</p>
            <p>{userData.username}</p>
      </Paper>

      <Paper style={{width:'28%',height:'90%',minWidth:'150px'}}>

      <div
            style={{ display: "flex", flexDirection: "column",justifyContent:'center',alignItems:'center',padding:'10px' }}
          >
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                height:'55px',
              }}
            >
              <p style={{ fontSize: "20px",marginRight:'1vw' }}>{userData.posts_count}</p>
              <p style={{fontSize:'20px'}}>Posts</p>
            </div>

            <div
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                height:'55px',
              }}
            >
              <p style={{ fontSize:"20px",marginRight:'1vw' }}>{userData.comments_count}</p>
              <p style={{fontSize:'20px'}}>comments</p>
            </div>
          </div>
      </Paper>
      
    </Box>

        </Card>
    



      {userPosts.map((post) => {
        return <PostCard key={post.id} post={post} />;
      })}
    </>
  );
}
