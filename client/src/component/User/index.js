import React from 'react';
import UserLayout from '../../HOC/user'
import MyButton from '../utils/button';
const UserDashboard = ({user}) => {
    // let value = {
    //     "id":"",
    //     "name":"",
    //     "email":"",
    //     "password":"",
    //     "lastname":"",
    //     "cart":[],
    //     "history":[],
    //     "role":false,
    //     "isAuth":true
    // };
    // value= {...user.userData}
    return (
        <UserLayout>
            <div>
                <div className="user_nfo_panel">
                    <h1>user Information</h1>   
                    <div>
                        <span>Name :{user.userData.name}</span>
                        <span>Lastname : {user.userData.lastname}</span>
                        <span>Email : {user.userData.email}</span>
                    </div>
                    <MyButton
                    type="default"
                    title="Edit account Info"
                    linkTo="/user/user_profile" />
                </div>
                <div className="user_nfo_panel">
                    <h1>History of Purchse</h1>
                    <div className="user_product_block_wrapper">
                        {user.userData.history}
                    </div>
                </div>
            </div>
        </UserLayout>
        
    );
    
};

export default UserDashboard; 