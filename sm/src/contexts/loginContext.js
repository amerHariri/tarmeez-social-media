import { createContext } from "react";
import { useState, useEffect, useContext } from "react";

import Login from "../components/Login";

import axios from "axios";

import { useSnackbar } from "./SnackBarContext";
import { useUserInfo } from "./UserInfoContext";

const loginContext = createContext();

export const LoginProvider = ({ children }) => {
  const [openLoginDialog, setOpenLoginDialog] = useState(false);
  const [fieldsContent, setFieldsContent] = useState({
    username: "",
    password: "",
  });

  const { handleOpen } = useSnackbar();
  const { userInfo, setUserInfo } = useUserInfo();

  function doLogin() {
    // eslint-disable-next-line eqeqeq
    if (!fieldsContent.username == "" && !fieldsContent.password == "") {
      if (!JSON.parse(localStorage.getItem("token"))) {
        const param = {
          username: fieldsContent.username,
          password: fieldsContent.password,
        };

        axios
          .post("https://tarmeezacademy.com/api/v1/login", param)
          .then((response) => {
            const userData = response.data;
            setUserInfo(userData);
            closeLoginDialog();
            setFieldsContent({ username: "", password: ""});
            handleOpen("Login successfully");
          });
      }
    }
  }

  useEffect(() => {
    if (!userInfo.user.name == "") {
      localStorage.setItem("token", JSON.stringify(userInfo));
    }
  }, [userInfo]);

  function showLoginDialog() {
    setOpenLoginDialog(true);
  }

  function closeLoginDialog() {
    setOpenLoginDialog(false);
  }

  function logout() {
    localStorage.removeItem("token");
  }

  return (
    <loginContext.Provider
      value={{
        doLogin,
        fieldsContent,
        setFieldsContent,
        userInfo,
        setUserInfo,
        showLoginDialog,
        logout
      }}
    >
      <Login open={openLoginDialog} close={closeLoginDialog} />
      {children}
    </loginContext.Provider>
  );
};

export const useLogin = () => {
  return useContext(loginContext);
};
