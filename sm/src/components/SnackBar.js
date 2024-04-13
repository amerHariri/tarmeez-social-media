import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';


export default function SnackBar({open,message,severit}) {
  

  return (
    <div>
      
      <Snackbar open={open}>
        <Alert
          severity={severit}
          variant="filled"
          sx={{ width: '100%' }}
        >
          {message}
        </Alert>
      </Snackbar>
    </div>
  );
}
