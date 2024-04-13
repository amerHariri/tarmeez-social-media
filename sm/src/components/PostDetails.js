import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Collapse from "@mui/material/Collapse";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import DeleteIcon from '@mui/icons-material/Delete';
import { Button } from "@mui/material";

import KeyboardReturnIcon from "@mui/icons-material/KeyboardReturn";

import EditIcon from "@mui/icons-material/Edit";
import CommentIcon from "@mui/icons-material/Comment";

import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";

import { useEditePost } from "../contexts/EditePostContext";
import { useDeletePost } from "../contexts/DeletePostContext";


import { useEffect, useState } from "react";
import { useUserInfo } from "../contexts/UserInfoContext";

import axios from "axios";

export default function PostDetails() {
  const { postId } = useParams();
  const { userInfo } = useUserInfo();
  const {setShowEditeDialog,setEditePost} = useEditePost()
  const {setShowDeleteDialog,setDeletePostId} = useDeletePost()

  const [author, setAuthor] = useState([]);
  const [allPost, setAllPost] = useState([]);
  const [tags, setTags] = useState([]);
  const [comments, setComments] = useState([]);

  const [newComment, setNewComment] = useState({
    body: "",
  });

  function LoadPost(){
    const url = `https://tarmeezacademy.com/api/v1/posts/${postId}`;

    axios
      .get(url)
      .then(function (response) {
        setAllPost(response.data.data);
        setAuthor(response.data.data.author);
        setTags(response.data.data.tags);
        setComments(response.data.data.comments);
      })
      .then(() => {})
      .catch(function (error) {
        console.log(error);
      });
  }

  useEffect(() => {
    LoadPost()
  }, []);


  function sendNewComment() {
    const params = {
      body: newComment.body,
    };

    const token = userInfo.token;
    const url = `https://tarmeezacademy.com/api/v1/posts/${postId}/comments`;
    axios
      .post(url, params, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        LoadPost();
      });
  }
  function showEditePostDialog(){
    setShowEditeDialog(true);
    setEditePost(allPost);
  }

  function showDeletePostDialog(){
    setShowDeleteDialog(true);
    setDeletePostId(allPost.id);
  }

  return (
    <>
      <Card sx={{ maxWidth: "90%", minWidth: "90%", margin: "5px 0" }}>
        <div
          id="post-header"
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            padding: "10px 15px",
          }}
        >
          <div
            id="user-info"
            style={{
              display: "flex",
              justifyContent: "left",
              alignItems: "center",
            }}
          >
            <img
              src={author.profile_image}
              alt=""
              style={{
                border: "0.8px solid #f7f7f7",
                marginRight: "10px",
                backgroundColor: "#305252",
                width: "50px",
                height: "50px",
                borderRadius: "50%",
              }}
            ></img>
            <div style={{ fontWeight: "bold" }}>{author.name}</div>
          </div>

          <div>{allPost.created_at}</div>
        </div>
        <img
          src={allPost.image}
          alt=""
          style={{
            backgroundSize: "cover",
            border: "0.8px solid #f7f7f7",
            marginRight: "10px",
            backgroundColor: "#305252",
            height: "auto",
            width: "100%",
          }}
        ></img>

        <CardContent>
          <Typography variant="body5" color="text.secondary">
            {allPost.body}
          </Typography>
        </CardContent>
        <CardActions
          disableSpacing
          style={{
            display: "flex",
            justifyContent: "space-between",
            padding: "15px",
          }}
        >
          <div style={{ display: "flex" }}>
          {userInfo.user.name == author.name ? (
            <>
              <IconButton
                onClick={showEditePostDialog}
                aria-label="update post"
                style={{ color: "#305252" }}
              >
                <EditIcon />
              </IconButton>

              <IconButton
                onClick={showDeletePostDialog}
                aria-label="delete post"
                style={{ color: "#305252" }}
              >
                <DeleteIcon />
              </IconButton>
            </>
          ) : (
            ""
          )}
            <IconButton aria-label="share" style={{ color: "#305252" }}>
              <CommentIcon />
              <div style={{ fontSize: "18px", marginLeft: "8px" }}>
                {allPost.comments_count}
              </div>
            </IconButton>

            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              {tags.map((tag) => (
                <div
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    marginLeft: "8px",
                    backgroundColor: "#305252",
                    fontSize: "16px",
                    color: "white",
                    padding: "5px 8px",
                    borderRadius: "25px",
                  }}
                >
                  {tag.name}
                </div>
              ))}
            </div>
          </div>
        </CardActions>

        <Collapse>
          <CardContent></CardContent>
        </Collapse>
      </Card>

      <Link
        style={{
          position: "fixed",
          right: "35px",
          bottom: "35px",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: "#305252",
          color: "#fff",
          padding: "15px",
          borderRadius: "50%",
          boxShadow: "0px 2px 5px rgba(0,0,0,0.5)",
          cursor: "pointer",
          zIndex:'100',
        }}
        to={`/`}
      >
        <KeyboardReturnIcon />
      </Link>

      {comments.map((comment) => (
        <Card sx={{ maxWidth: "90%", minWidth: "90%", margin: "5px 0" }}>
          <CardContent>
            <div
              id="user-info"
              style={{
                display: "flex",
                justifyContent: "left",
                alignItems: "center",
                marginBottom: "10px",
              }}
            >
              <img
                src={comment.author.profile_image}
                alt=""
                style={{
                  border: "0.8px solid #f7f7f7",
                  marginRight: "10px",
                  backgroundColor: "#305252",
                  width: "50px",
                  height: "50px",
                  borderRadius: "50%",
                }}
              ></img>
              <div style={{ fontWeight: "bold" }}>{comment.author.name}</div>
            </div>
            <div style={{ textAlign: "left" }}>{comment.body}</div>
          </CardContent>
        </Card>
      ))}
      {!userInfo.user.name == ''?<Card sx={{ maxWidth: "90%", minWidth: "90%", margin: "5px 0" }}>
        <CardContent>
          <textarea
            id="text-area"
            required
            style={{
              resize: "none",
              width: "99%",
              height: "80px",
              border: "0.5px solid #f2f2f2",
              borderRadius: "5px",
              fontSize: "16px",
            }}
            value={newComment.body}
            onChange={(e) => {
              setNewComment({ ...newComment, body: e.target.value });
            }}
          />
          
        </CardContent>
        <CardActions
            style={{ display: "flex", justifyContent: "right" }}
          >
            <Button onClick={sendNewComment} variant="contained">
              Send
            </Button>
          </CardActions>
      </Card>:''}
      
    </>
  );
}
