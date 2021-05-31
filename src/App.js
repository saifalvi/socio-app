import React, { useState, useEffect } from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import Posts from "./components/post/posts";
import NotFound from "./components/notFound";
import NavBar from "./components/navBar";
import PostForm from "./components/post/postForm";
import Login from "./components/login";
import PostDetail from "./components/post/postDetail";
import ProtectedRoute from "./components/common/protectedRoute";
import auth from "./services/authService";
import CssBaseline from "@material-ui/core/CssBaseline";
import Container from "@material-ui/core/Container";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  const [user, setUser] = useState();

  useEffect(() => {
    try {
      const user = auth.getCurrentUser();
      setUser(user);
    } catch (ex) {}
  }, []);

  return (
    <>
      <CssBaseline />
      <ToastContainer />
      <NavBar user={user} />
      <Container maxWidth="lg">
        <Switch>
          <Route path="/login" component={Login} />
          <ProtectedRoute path="/posts/:id" component={PostForm} />
          <ProtectedRoute path="/post-detail/:id" component={PostDetail} />
          <ProtectedRoute path="/posts" component={Posts} />
          <Route path="/not-found" component={NotFound} />
          <Redirect exact from="/" to="/posts" />
          <Redirect to="/not-found" />
        </Switch>
      </Container>
    </>
  );
}

export default App;
