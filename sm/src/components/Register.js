import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import CloudUploadIcon from "@mui/icons-material/CloudUpload";

import { styled } from "@mui/material/styles";

import { useRegister } from '../contexts/RegisterContext';
import { Typography } from '@mui/material';

export default function Register() {
  const {openRegisterDialog,setOpenRegisterDialog,doRegister,registerFieldContent,setRegisterFieldContent} = useRegister()
  
  
  function handlecloseRegisterDialog (){
    setOpenRegisterDialog();
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
    <>
      <Dialog open={openRegisterDialog} onClose={handlecloseRegisterDialog}>
        <DialogTitle>Register New User</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            required
            margin="dense"
            id="name"
            name="name"
            label="name"
            type="username"
            fullWidth
            variant="standard"
            value={registerFieldContent.name}
            onChange={(e) => {
              setRegisterFieldContent({
                ...registerFieldContent,
                name: e.target.value,
              });
            }}
          />

          <TextField
            autoFocus
            required
            margin="dense"
            id=""
            name="username"
            label="username"
            type="username"
            fullWidth
            variant="standard"
            value={registerFieldContent.username}
            onChange={(e) => {
              setRegisterFieldContent({
                ...registerFieldContent,
                username: e.target.value,
              });
            }}
          />

          <TextField
            autoFocus
            required
            margin="dense"
            id="Password"
            name="Password"
            label="Password"
            type="password"
            fullWidth
            variant="standard"
            value={registerFieldContent.password}
            onChange={(e) => {
              setRegisterFieldContent({
                ...registerFieldContent,
                password: e.target.value,
              });
            }}
          />
          
          <Button
          sx={{marginTop:'25px'}}
            component="label"
            role={undefined}
            variant="contained"
            tabIndex={-1}
            startIcon={<CloudUploadIcon />}
            value={registerFieldContent.image}
            onChange={(e) => {
              setRegisterFieldContent({ ...registerFieldContent, image: e.target.files[0] });
            }}
          >
            Upload Profile image
            <VisuallyHiddenInput type="file" />
          </Button>

          
          
          

          <div style={{ color: "red" }}>{registerFieldContent.message}</div>
        </DialogContent>
        <DialogActions>
          <Button variant="contained" onClick={handlecloseRegisterDialog}>Cancel</Button>
          <Button variant="contained" onClick={doRegister}>Login</Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
