import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';

import { useLogin } from '../contexts/loginContext';


export default function Login({open,close}) {
  const{doLogin,fieldsContent,setFieldsContent} = useLogin()
  
  function handlecloseLoginDialog (){
    close();
  }

  return (
    <>
      <Dialog
        open={open}
        onClose={handlecloseLoginDialog}
      >
        <DialogTitle sx={{textAlign:'center',fontWeight:'bold',fontSize:'25px'}}>Login</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            required
            margin="dense"
            id="name"
            name="username"
            label="username"
            type="username"
            fullWidth
            variant="standard"
            value={fieldsContent.username}
            onChange={(e)=>{setFieldsContent({...fieldsContent,username : e.target.value})}}
          />

          <TextField
            required
            margin="dense"
            id="name"
            name="Password"
            label="Password"
            type="password"
            fullWidth
            variant="standard"
            value={fieldsContent.password}
            onChange={(e)=>{setFieldsContent({...fieldsContent,password: e.target.value})}}
          />
        </DialogContent>
        <DialogActions>
          <Button variant="contained" onClick={handlecloseLoginDialog}>Cancel</Button>
          <Button variant="contained" onClick={doLogin}>Login</Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
