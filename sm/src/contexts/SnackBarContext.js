import { createContext } from "react";
import { useState,useContext } from "react";
import SnackBar from "../components/SnackBar";


const SnackbarContext = createContext();


export const SnackProvider = ({ children }) => {
  const [open, setOpen] = useState(false);
  const [message,setMessage] = useState('')

  function handleOpen(message) {
    setOpen(true);
    setMessage(message)
    setTimeout(()=>{
        setOpen(false)
    },4000)
  }

  return (
    <SnackbarContext.Provider value={{handleOpen}}>
      <SnackBar open={open} message = {message} />
      {children}
    </SnackbarContext.Provider>
  );
};

export const useSnackbar = ()=>{
    return useContext(SnackbarContext)
}