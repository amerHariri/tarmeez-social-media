import "./App.css";

import Container from "@mui/material/Container";

import Posts from "./components/Posts";
import PostDetails from "./components/PostDetails";
import UserProfile from "./components/UserProfile";
import About from "./components/About";
import Bar from "./components/Bar";
import UserOption from "./components/UserOption";

import { SnackProvider } from "./contexts/SnackBarContext";
import { LoginProvider } from "./contexts/loginContext";
import { RegisterProvider } from "./contexts/RegisterContext";
import { UseInfoProvider } from "./contexts/UserInfoContext";
import { LoadPostsProvider } from "./contexts/LoadPostsContext";
import { EditePostProvider } from "./contexts/EditePostContext";
import { DeletePostProvider } from "./contexts/DeletePostContext";

import { createTheme, ThemeProvider } from "@mui/material/styles";

import { HashRouter  as Router, Route, Routes } from "react-router-dom";
import { BrowserRouter } from "react-router-dom";


const theme = createTheme({
  palette: {
    primary: {
      main: "#305252",
    }
  },
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <Router>
        <SnackProvider>
          <LoadPostsProvider>
            <UseInfoProvider>
              <RegisterProvider>
                <LoginProvider>
                  <EditePostProvider>
                    <DeletePostProvider>
                      <div className="App">
                        <div className="main">
                          <Container maxWidth="md">
                            <div
                              style={{
                                paddingTop: "120px",
                                display: "flex",
                                flexDirection: "column",
                                justifyContent: "center",
                                alignItems: "center",
                              }}
                            >
                              <Bar />
                              
                              <Routes>
                                <Route
                                  path="/users/:userId"
                                  element={<UserProfile />}
                                />
                                <Route
                                  path="/posts/:postId"
                                  element={<PostDetails />}
                                />
                                <Route path="/" element={<Posts />} />
                                <Route path="/about" element={<About />} />
                                <Route path="/option" element={<UserOption />} />
                                </Routes>
                              
                            </div>
                          </Container>
                        </div>
                      </div>
                    </DeletePostProvider>
                  </EditePostProvider>
                </LoginProvider>
              </RegisterProvider>
            </UseInfoProvider>
          </LoadPostsProvider>
        </SnackProvider>
      </Router>
    </ThemeProvider>
  );
}

export default App;
