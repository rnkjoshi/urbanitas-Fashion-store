import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import {logoutUser} from '../../../actions/user_actions';
class Header extends Component {

    state = {
        page:[
            {
                name:"Home",
                linkTo:'/',
                public:true
            },
            {
                name:"dashboard",
                linkTo:'/shop',
                public:true
            },
        ],
        user:[
            {
                name:"Cart",
                linkTo:'/user/cart',
                public:false
            },
            {
                name:"Account",
                linkTo:'/user/dashboard',
                public:false
            },
            {
                name:"Login",
                linkTo:'/register_login',
                public:true
            },
            {
                name:"Logout",
                linkTo:'',
                public:false
            }
        ]
    }
    logoutHandler = () => {
        //this.props.history.push('/register_login');
        this.props.dispatch(logoutUser()).then(response=>{
            if(response.payload.success){
                this.props.history.push('/register_login');
            }
        })
    }

    cartLink = (item,i)=>{

        return(
            <div className="cart_link" key={i}>
            <span>{this.props.user.cart ? this.props.user.cart.length:0}</span>
            <Link to={item.linkTo} key={i}>
                {item.name}
            </Link>
            </div>
        )
    }
    defaultLink = (item,i)=>(
        item.name === 'Logout' ?
            <div className="log_out_link" key={i} onClick={()=>this.logoutHandler()}>
                {item.name}
            </div>
        :
          <Link to={item.linkTo} key={i}>
                {item.name}
            </Link>
        
    )
    showLinks = (type) =>{
        let lists = [];
        console.log(this.props.user);
        if(this.props.user.userData){
            console.log("inside it")
            type.forEach((item)=>{
                if(!this.props.user.userData.isAuth){
                    if(item.public===true){
                        lists.push(item);
                    }
                }else{
                    if(item.name !== 'Login'){
                        lists.push(item);
                    }
                }
            });
        }
        return lists.map((item,i)=>{
            if(item.name !== 'Cart'){
                return this.defaultLink(item,i)
            }
            else{
                return this.cartLink(item,i)
            }
        })
    }

    render() {
        return (
            <header>
                <div className="bck_b_dark">
                    <div className="container">
                        <div className="left">
                            <div className="logo">
                                urbanitas
                            </div>
                        </div>
                        <div className="right">
                            <div className="top">
                            {this.showLinks(this.state.page)}                           
                            </div>
                            <div className="bottom">
                                {this.showLinks(this.state.user)}
                            </div>
                        </div>
                    </div>
                </div>
            </header>
        );
    }
}
function mapStateToProps(state){
    return {user:state.user}
}
export default connect(mapStateToProps)(withRouter(Header));