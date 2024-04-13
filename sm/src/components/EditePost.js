import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import { styled } from "@mui/material/styles";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import Dialog from '@mui/material/Dialog';

import { useSnackbar } from "../contexts/SnackBarContext";
import { useUserInfo } from "../contexts/UserInfoContext";
import { useLoadPosts } from "../contexts/LoadPostsContext";
import { useEditePost } from "../contexts/EditePostContext";


import axios from "axios";


export default function EditePost() {
  const {showEditeDialog,setShowEditeDialog,editePost,setEditePost} = useEditePost();
  const { userInfo } = useUserInfo();
  const { handleOpen } = useSnackbar();
  const {goLoadPosta} = useLoadPosts();
  
  function updatePost() {
    let formData = new FormData();
    formData.append("body", editePost.body);
    formData.append("image", editePost.image);
    formData.append('_method','put')
    const token = userInfo.token;

    const headers = {
      "content-type": "multipart/form-data",
      authorization: `Bearer ${token}`,
    };

    axios
      .post(`https://tarmeezacademy.com/api/v1/posts/${editePost.id}`, formData, {
        headers: headers,
      })
      .then((response) => {
        setShowEditeDialog(false)
        goLoadPosta()
        handleOpen("Post has been updated", "success");
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

  function handlecloseEditeDialog(){
    setShowEditeDialog(false);
  }

  return (
    <Dialog
        open={showEditeDialog}
        onClose={handlecloseEditeDialog}
        sx={{"& .MuiDialog-container": {
          "& .MuiPaper-root": {
            width: "100%",
            maxWidth: "740px",  // Set your width here
          },
        },}}
      >
    <Card>
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
        value={editePost.body}
        onChange={(e) => {
          setEditePost({ ...editePost, body: e.target.value });
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
          value={editePost.image}
          onChange={(e) => {
            setEditePost({ ...editePost, image: e.target.files[0] });
          }}
        >
          Upload image
          <VisuallyHiddenInput type="file" />
        </Button>
        <Button onClick={updatePost} variant="contained">
          Update
        </Button>
      </div>
    </Card>
    </Dialog>
  );
}
