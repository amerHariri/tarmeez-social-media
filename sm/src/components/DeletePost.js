import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import Dialog from "@mui/material/Dialog";

import { useSnackbar } from "../contexts/SnackBarContext";
import { useUserInfo } from "../contexts/UserInfoContext";
import { useLoadPosts } from "../contexts/LoadPostsContext";
import { useDeletePost } from "../contexts/DeletePostContext";


import "../App.css";

import axios from "axios";

export default function DeletePost() {
  const { showDeleteDialog, setShowDeleteDialog, deletePostId } =
    useDeletePost();
  const { userInfo } = useUserInfo();
  const { handleOpen } = useSnackbar();
  const { goLoadPosta } = useLoadPosts();

  function deletePost() {
    const token = userInfo.token;

    const headers = {
      "content-type": "multipart/form-data",
      authorization: `Bearer ${token}`,
    };

    axios
      .delete(`https://tarmeezacademy.com/api/v1/posts/${deletePostId}`, {
        headers: headers,
      })
      .then((response) => {
        setShowDeleteDialog(false);
        goLoadPosta();
        handleOpen("Post has been deleted");
      });
  }

  function handlecloseDeleteDialog() {
    setShowDeleteDialog(false);
  }

  return (
    <Dialog open={showDeleteDialog} onClose={handlecloseDeleteDialog}>
      <Card sx={{ minWidth: "90%", width: "auto",padding:'15px' }}>
        <p style={{ textAlign: "center" }}>
          Are you sure about that ? It will be deleted forever.{" "}
        </p>
        <div
          style={{
            padding: "5px",
            display: "flex",
            justifyContent: "space-between",
          }}
        >
          <Button onClick={handlecloseDeleteDialog} variant="contained">
            Cancel
          </Button>

          <Button onClick={deletePost} variant="contained">
            Delete
          </Button>
        </div>
      </Card>
    </Dialog>
  );
}
