import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import { styled } from "@mui/material/styles";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";


import { useSnackbar } from "../contexts/SnackBarContext";
import { useUserInfo } from "../contexts/UserInfoContext";
import { useLoadPosts } from "../contexts/LoadPostsContext";


import "../App.css";

import axios from "axios";
import { useState } from "react";

export default function NewPost() {

  const [newPost, setNewPost] = useState({
    body: "",
    image: "",
  });


  const { userInfo } = useUserInfo();
  const { handleOpen } = useSnackbar();
  const {goLoadPosta} = useLoadPosts();

  function sendNewPost() {
    let formData = new FormData();
    formData.append("body", newPost.body);
    formData.append("image", newPost.image);
    const token = userInfo.token;

    const headers = {
      "content-type": "multipart/form-data",
      authorization: `Bearer ${token}`,
    };

    axios
      .post("https://tarmeezacademy.com/api/v1/posts", formData, {
        headers: headers,
      })
      .then((response) => {
        setNewPost({ body: "", image: "" });
        handleOpen("New Post Send successfully", "success");
        goLoadPosta()
      }).catch(function (error) {
        handleOpen(error.response.data.message,"error");
      });
      
  }


  const VisuallyHiddenInput = styled("input")({
    clip: "rect(0 0 0 0)",
    clipPath: "inset(50%)",
    height: 1,
    overflow: "hidden",
    position: "absolute",
    bottom: 0,
    left: 0,
    whiteSpace: "nowrap",
    width: 1,
  });

  return (
    <Card sx={{ minWidth: "90%" }}>
      <textarea
        id="text-area"
        required
        style={{
          resize: "none",
          width: "99%",
          height: "150px",
          border: "none",
          fontSize: "16px",
        }}
        value={newPost.body}
        onChange={(e) => {
          setNewPost({ ...newPost, body: e.target.value });
        }}
      />
      <div
        style={{
          backgroundColor: "#f1f1f1",
          padding: "5px",
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        <Button
          component="label"
          role={undefined}
          variant="contained"
          tabIndex={-1}
          startIcon={<CloudUploadIcon />}
          value={newPost.image}
          onChange={(e) => {
            setNewPost({ ...newPost, image: e.target.files[0] });
          }}
        >
          Upload image
          <VisuallyHiddenInput type="file" />
        </Button>
        <Button onClick={sendNewPost} variant="contained">
          Post
        </Button>
      </div>
    </Card>
  );
}
