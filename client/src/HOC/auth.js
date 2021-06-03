import React, { Component } from 'react';
import {connect} from 'react-redux';
import { auth } from '../actions/user_actions';
//import CircularProgress from '@material-ui/core/CircularProgress';
import users from '../appUsers';
export default function(ComposedClass,reload,adminRoute=null){
    class authenticationCheck extends Component {
        state={
            loading:false
        }
        componentWillMount(){
                // let user = users[0];
                // console.log("here i am!")
                // //console.log(user);
                // if(!user.isAuth){
                //     if(reload){
                //         this.props.history.push('/register_login')
                //     }
                // }
                // else{
                //     if(adminRoute && user.role){
                //         this.props.history.push('/user/dashboard');
                //     }
                //     else
                //     {
                //         if(!reload){
                //         this.props.history.push('/user/dashboard');
                //         }
                //         // else{
                //         //     this.props.history.push('/');
                //         // }
                //     }
                // }
                // this.setState({loading:false})
                // this.props.user.userData = users[0];
            this.props.dispatch(auth()).then(response =>{
                // console.log("authorization")
                // console.log(this.props.user);
                let user = this.props.user.userData;
                console.log("here i am!")
                // console.log(user);
                if(!user.isAuth){
                    if(reload){
                        this.props.history.push('/register_login')
                    }
                }
                else{
                    if(adminRoute && user.isAdmin){
                        this.props.history.push('/user/dashboard');
                    }
                    else
                    {
                        if(!reload){
                        this.props.history.push('/user/dashboard');
                        }
                    }
                }
                
                this.setState({loading:false})
            })
        }
        render() {
            if(this.state.loading){
                return(
                    <div className="main_loader">
                        {/* <CircularProgress /> */}
                        <h1>Loading...</h1>
                    </div>
                )
            }
            return (
                <div>
                    <ComposedClass {...this.props} user={this.props.user} />
                </div>
            );
        }
    }
function mapStateToProps(state){
    return{
        user:state.user
    }
}
    return connect(mapStateToProps)(authenticationCheck)
}

