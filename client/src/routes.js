import React from 'react';
import axios from 'axios';
import {Switch, Route} from 'react-router-dom';
import Home from './component/home/index.js';
import Layout from './HOC/layout';
import RegisterLogin from './component/Register_login';
import Register from './component/Register_login/register';
import UserDashboard from './component/User';
import Auth from './HOC/auth';
import Shop from './component/shop';

const Routes = () =>{
  return(
    
    <Layout>
      <Switch>
        <Route path="/user/dashboard" exact component={Auth(UserDashboard,true)}/>
        <Route path="/register" exact component={Auth(Register,false)}/>
        <Route path="/register_login" exact component={Auth(RegisterLogin,false)}/>
        <Route path="/" exact component={Home}/>
        <Route path="/shop" exact component={Shop}/>
      </Switch>
    </Layout>
  )
}

export default Routes;
