import { useEffect, useState } from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import RefreshIcon from '@mui/icons-material/Refresh';

import logo from '../logo.png'
import "./Bar.css";

import { Link } from 'react-router-dom';

import { useSnackbar } from '../contexts/SnackBarContext';
import { useRegister } from '../contexts/RegisterContext';
import { useUserInfo } from '../contexts/UserInfoContext';
import { useLoadPosts } from '../contexts/LoadPostsContext';
import { useLogin } from '../contexts/loginContext';

import axios from 'axios';


export default function Bar() {
  const [anchorElNav, setAnchorElNav] = useState(null);
  const [anchorElUser, setAnchorElUser] = useState(null);
  const [newPostRelease, setNewPostReleas] = useState(false);

  const {handleOpen} = useSnackbar()
  const {showLoginDialog,logout} = useLogin()
  const {setOpenRegisterDialog} = useRegister();
  const {userInfo,setUserInfo} = useUserInfo();
  const {goLoadPosta,idFirstPost} = useLoadPosts();


  useEffect(()=>{
    if(localStorage.getItem('token')){
      setUserInfo(JSON.parse(localStorage.getItem('token')));
    }
    
  },[idFirstPost])

  const MINUTE_MS = 180000;

  useEffect(()=>{
    
    const postsNotifcationTimer = setInterval(() => {
      function testIfNewPostAppear() {
        axios
          .get(`https://tarmeezacademy.com/api/v1/posts?limit=1`)
          .then(function (response) {
            const apiPosts = response.data.data;
            const newPostId = apiPosts[0].id;
            if (idFirstPost !== newPostId) {
              setNewPostReleas(true);
            }
          })
          .catch(function (error) {
            console.log(error);
          });
      }
      testIfNewPostAppear()
    }, MINUTE_MS);
    

    return ()=> clearInterval(postsNotifcationTimer);
  },[idFirstPost])


  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  function openLoginDia(){
    showLoginDialog()
  }

  function handleLogout(){
    logout()
    handleOpen('Logout successfully')
    handleCloseUserMenu()
    setUserInfo({
      user:{
        comments_count:0,
        email:'',
        id:0,
        name:'',
        posts_count:0,
        profile_image:{},
        username:''
      }
    })
  }

  function showRegisterDialog(){
    setOpenRegisterDialog(true)
  }

  function refreshPosts(){
    goLoadPosta();
    setNewPostReleas(false);
  }

  return (
    <AppBar position="static">
      <Container
        maxWidth="xl"
        style={{
          backgroundColor: "#305252",
          position: "fixed",
          top: "0",
          left: "0",
          minWidth: "100%",
          zIndex: "100",
        }}
      >
        <Toolbar disableGutters>
          <Link style={{ textDecoration: "none", color: "inherit" }} to={`/`}>
            <img
              className="first-logo"
              src={logo}
              alt=""
              style={{ mr: 1, width: "150px", marginRight: "20px" }}
            />
          </Link>
          
          <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "left",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "left",
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: "block", md: "none" },
              }}
            >
              {/* List */}
              <Link style={{ textDecoration: "none" }} to={`/`}>
                <Button
                  sx={{
                    my: 2,
                    color: "black",
                    width: "100%",
                    display: "block",
                    textAlign:'left',
                    paddingRight:'40px',
                  }}
                >
                  Home
                </Button>
              </Link>

              <Link
                style={{ textDecoration: "none", color: "inherit" }}
                to={`/users/${userInfo.user.id}`}
              >
                <Button
                  sx={{
                    my: 2,
                    color: "black",
                    width: "100%",
                    display: "block",
                    textAlign:'left'
                  }}
                >
                  Profile
                </Button>
              </Link>

              <Link
                style={{ textDecoration: "none", color: "inherit" }}
                to={`/about`}
              >
                <Button
                  sx={{
                    my: 2,
                    color: "black",
                    width: "100%",
                    display: "block",
                    textAlign:'left',
                  }}
                >
                  About
                </Button>
              </Link>
              {/* End List */}
            </Menu>
            {/*logo*/}
            <div>
            <Link style={{ textDecoration: "none", color: "inherit" }} to={`/`}>
              <img
                className="second-logo"
                src={logo}
                alt="logo"
                style={{ mr: 1, width: "140px" }}
              />
              </Link>
          </div>
          {/*logo*/}
          </Box>

          <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
            <Link style={{ textDecoration: "none", color: "inherit" }} to={`/`}>
              <Button sx={{ my: 2, color: "white", display: "block" }}>
                Home
              </Button>
            </Link>

            <Link
              style={{ textDecoration: "none", color: "inherit" }}
              to={`/users/${userInfo.user.id}`}
            >
              <Button sx={{ my: 2, color: "white", display: "block" }}>
                Profile
              </Button>
            </Link>

            <Link
              style={{ textDecoration: "none", color: "inherit" }}
              to={`/about`}
            >
              <Button sx={{ my: 2, color: "white", display: "block" }}>
                About
              </Button>
            </Link>
          </Box>
          {localStorage.getItem("token") ? (
            ""
          ) : (
            <div style={{display:'flex'}}>
              <button
                style={{ my: 2, color: "white", display: "block",backgroundColor:'transparent',border:'none',cursor:'pointer',fontSize:'18px'}}
                onClick={openLoginDia}
              >
                Login
              </button>

              <button
                style={{ my: 2, color: "white", display: "block",backgroundColor:'transparent',border:'none',cursor:'pointer',fontSize:'18px'}}
                onClick={showRegisterDialog}
              >
                Register
              </button>
            </div>
          )}

          {/*new Post Notifcation*/}
          {!newPostRelease == false ? (
            <Button
              sx={{
                my: 2,
                color: "white",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                padding:'0'
              }}
              onClick={refreshPosts}
            >
              <RefreshIcon />
            </Button>
          ) : (
            ""
          )}

          {/*End new Post Notifcation*/}

          {/* user Icon */}
          {localStorage.getItem("token") ? (
            <Box sx={{ flexGrow: 0 }}>
              <Tooltip
                title="Open settings"
                style={{ display: "flex", alignItems: "center" }}
              >
                {!userInfo.user.name == "" ? userInfo.user.name : ""}
                <IconButton
                  onClick={handleOpenUserMenu}
                  sx={{ p: 0, marginLeft: "10px" }}
                >
                  <Avatar alt="user" src={userInfo.profile_image} />
                </IconButton>
              </Tooltip>
              <Menu
                sx={{ mt: "45px" }}
                id="menu-appbar"
                anchorEl={anchorElUser}
                anchorOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                open={Boolean(anchorElUser)}
                onClose={handleCloseUserMenu}
              >
                <Link
                  style={{ textDecoration: "none", color: "inherit" }}
                  to={"/option"}
                >
                  <MenuItem>
                    <Typography textAlign="center">Option</Typography>
                  </MenuItem>
                </Link>
                <MenuItem onClick={handleLogout}>
                  <Typography textAlign="center">Logout</Typography>
                </MenuItem>
              </Menu>
            </Box>
          ) : (
            ""
          )}
        </Toolbar>
      </Container>
    </AppBar>
  );
}