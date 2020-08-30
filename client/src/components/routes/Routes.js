import React from "react";
import { Switch } from "react-router-dom";
import PrivateRoutes from "./PrivateRoutes";
import Header from "../Header";
import Alert from "../Alert";
import Profile from "../../layout/Profile";
import EditProfile from "../profile/EditProfile";
import Profiles from "../../layout/Profiles";
import Posts from "../../layout/Posts";
import NotFound from "../../layout/NotFound";
import Post from "../../layout/Post";

const Routes = () => {
  return (
    <section className='container'>
      <Header />
      <Alert />
      <Switch>
        <PrivateRoutes exact path='/profiles' component={Profiles} />
        <PrivateRoutes exact path='/profile/:id' component={Profile} />
        <PrivateRoutes exact path='/edit-profile' component={EditProfile} />
        <PrivateRoutes exact path='/posts' component={Posts} />
        <PrivateRoutes exact path='/post/:id' component={Post} />
        <PrivateRoutes component={NotFound} />
      </Switch>
    </section>
  );
};

export default Routes;
