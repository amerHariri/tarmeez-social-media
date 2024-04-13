import { createContext } from "react";
import { useState,useContext } from "react";
import SnackBar from "../components/SnackBar";


const SnackbarContext = createContext();


export const SnackProvider = ({ children }) => {
  const [open, setOpen] = useState(false);
  const [message,setMessage] = useState('')
  const [severityType,setSeverityType] = useState('')

  function handleOpen(message,severityType) {
    setOpen(true);
    setMessage(message);
    setSeverityType(severityType);
    setTimeout(()=>{
        setOpen(false)
    },4000)
  }

  return (
    <SnackbarContext.Provider value={{handleOpen}}>
      <SnackBar open={open} message = {message} severit = {severityType}/>
      {children}
    </SnackbarContext.Provider>
  );
};

export const useSnackbar = ()=>{
    return useContext(SnackbarContext)
}