import { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";

import Register from "../components/Register";

import { useSnackbar } from "./SnackBarContext";
import { useUserInfo } from "./UserInfoContext";

const RegisterContext = createContext();

export const RegisterProvider = ({ children }) => {
  const [openRegisterDialog, setOpenRegisterDialog] = useState(false);
  const [registerFieldContent, setRegisterFieldContent] = useState({
    name: "",
    username: "",
    password: "",
    image: ""
  });

  const { userInfo, setUserInfo } = useUserInfo();
  const { handleOpen } = useSnackbar();

  function doRegister() {
    if (
      !registerFieldContent.name == "" &&
      !registerFieldContent.username == "" &&
      !registerFieldContent.password == ""
    ) {
      if (!JSON.parse(localStorage.getItem("token"))) {

        let formData = new FormData();
        formData.append("name", registerFieldContent.name);
        formData.append("username", registerFieldContent.username);
        formData.append("password", registerFieldContent.password);
        formData.append("image", registerFieldContent.image);

        const headers = {
          "content-type": "multipart/form-data",
        };

        axios
          .post("https://tarmeezacademy.com/api/v1/register", formData,{
            headers: headers
          })
          .then((response) => {
            const regUserData = response.data;
            setUserInfo(regUserData);
            closeRegisterDialog();
            setRegisterFieldContent({ name: "", username: "", password: "",image:"" });
            handleOpen("New User Register successfully", "success");
          }).catch(function (error) {
            handleOpen(error.response.data.message,"error");
          });
      }
    }
  }

  useEffect(() => {
    if (!userInfo.user.name == "") {
      localStorage.setItem("token", JSON.stringify(userInfo));
    }
  }, [userInfo]);

  function closeRegisterDialog() {
    setOpenRegisterDialog(false);
  }

  return (
    <RegisterContext.Provider
      value={{
        openRegisterDialog,
        setOpenRegisterDialog,
        closeRegisterDialog,
        doRegister,
        registerFieldContent,
        setRegisterFieldContent,
      }}
    >
      <Register open={openRegisterDialog} />
      {children}
    </RegisterContext.Provider>
  );
};

export const useRegister = () => {
  return useContext(RegisterContext);
};
