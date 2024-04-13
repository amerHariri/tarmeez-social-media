import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardActions from '@mui/material/CardActions';
import { TextField } from "@mui/material";
import Button from "@mui/material/Button";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import { styled } from "@mui/material/styles";
import Typography from '@mui/material/Typography';

import { useState } from "react";
import axios from "axios";

import { useUserInfo } from "../contexts/UserInfoContext";
import { useSnackbar } from "../contexts/SnackBarContext";

export default function UserOption() {
  const { userInfo } = useUserInfo();
  const { handleOpen } = useSnackbar();

  const [userData, setUserData] = useState({
    name: userInfo.user.name,
    email: '',
    password: "",
    image: userInfo.user.profile_image,
  });

  console.log(userInfo);

  function updateUserData(){
    let formData = new FormData();
    formData.append("name", userData.name);
    formData.append("password", userData.password);
    formData.append("image", userData.image);
    formData.append('_method','put')
    const token = userInfo.token;

    const headers = {
      "content-type": "multipart/form-data",
      authorization: `Bearer ${token}`,
    };

    axios
      .post(`https://tarmeezacademy.com/api/v1/updatePorfile`, formData, {
        headers: headers,
      })
      .then((response) => {
        handleOpen("Post has been updated");
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
    <Card sx={{ minWidth: "70%" }}>
      <Typography sx={{padding:'15px 25px'}} variant="h5" component="div">
          Edite Your Profile
        </Typography>
      <CardContent sx={{display:'flex',flexDirection:'column'}}>
        <TextField
          autoFocus
          margin="dense"
          id="name"
          name="name"
          label="name"
          type="name"
          fullWidth
          variant="standard"
          value={userData.name}
          onChange={(e) => {
            setUserData({ ...userData, name: e.target.value });
          }}
        />

        <TextField
          autoFocus
          margin="dense"
          id="password"
          name="password"
          label="password"
          type="password"
          fullWidth
          variant="standard"
          value={userData.password}
          onChange={(e) => {
            setUserData({ ...userData, password: e.target.value });
          }}
        />

        <TextField
          autoFocus
          margin="dense"
          id="email"
          name="email"
          label="email"
          type="email"
          fullWidth
          variant="standard"
          value={userData.email}
          onChange={(e) => {
            setUserData({ ...userData, email: e.target.value });
          }}
        />
        <div style={{display:'flex',justifyContent:'flex-start',alignItems:'center',marginTop:'20px'}}>
        <Typography sx={{ fontSize: 16,marginRight:'20px' }} color="text.secondary" gutterBottom>
          change your image profile
        </Typography>
        <Button
        sx={{width:'30%'}}
          component="label"
          role={undefined}
          variant="contained"
          tabIndex={-1}
          startIcon={<CloudUploadIcon />}
          value={userData.image}
          onChange={(e) => {
            setUserData({ ...userData, image: e.target.files[0] });
          }}
        >
          Upload image
          <VisuallyHiddenInput type="file" />
        </Button>
        </div>
      </CardContent>
      <CardActions style={{display:'flex',justifyContent:'flex-end',padding:'15px 25px'}}>
      <Button onClick={updateUserData} variant="contained">
          Update
        </Button>
      </CardActions>
    </Card>
  );
}
