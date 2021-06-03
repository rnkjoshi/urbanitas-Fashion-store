import React, { Component, useEffect , useState } from 'react';
import {connect} from 'react-redux';
import { update,generateData,isFormValid } from '../utils/forms/formActions';
import FormField from '../utils/forms/formField';
import {registerUser} from '../../actions/user_actions';
//import Dialog from '@material-ui/core/Dialog';
import axios from 'axios';

class Register extends Component {

    state = {
        hover:false,
        formError:false,
        formSuccess:false,
        formdata:{
            name:{
                element:'input',
                value:'',
                config:{
                    name:'name_input',
                    type:'text',
                    placeholder:'enter your First name'
                },
                validation:{
                    required:true,
                },
                valid:false,
                touched:false,
                validationMessage:''
            },
            lastname:{
                element:'input',
                value:'',
                config:{
                    name:'lastname_input',
                    type:'text',
                    placeholder:'enter your Last Name'
                },
                validation:{
                    required:true,
                },
                valid:false,
                touched:false,
                validationMessage:''
            },
            email:{
                element:'input',
                value:'',
                config:{
                    name:'email_input',
                    type:'email',
                    placeholder:'enter your email'
                },
                validation:{
                    required:true,
                    email:true
                },
                valid:false,
                touched:false,
                validationMessage:''
            },
            password:{
                element:'input',
                value:'',
                config:{
                    name:'password_input',
                    type:'password',
                    placeholder:'enter your password'
                },
                validation:{
                    required:true
                },
                valid:false,
                touched:false,
                validationMessage:''
            },
            confirmPassword:{
                element:'input',
                value:'',
                config:{
                    name:'confirm_password_input',
                    type:'password',
                    placeholder:'Confirm your password'
                },
                validation:{
                    required:true,
                    confirm:'password'
                },
                valid:false,
                touched:false,
                validationMessage:''
            }
        }
    }
    submitForm = (event) => {
        event.preventDefault();

        let dataToSubmit = generateData(this.state.formdata,'register');
        let formIsValid = isFormValid(this.state.formdata,'register');
        
        console.log(formIsValid);
        if(formIsValid){
            console.log("yes form is valid")
            // const responseData = async() => {await sendRequest(
            //     'http://localhost:27017/api/users/register',
            //     'POST',
            //     dataToSubmit
            //   ).then(response=>{
            //     if(response.payload.success){
            //         this.setState ({
            //             formError:false,
            //             formSuccess:true
            //         });
            //         setTimeout(()=>{
            //             this.props.history.push('register_login');
            //         },3000)
            //     }
            //    else{
            //        console.log("response.payload.success")
            //        this.setState({formError:true})
            //    }
            //   }); 
            // }
        //this.props.history.push('register_login');
        // fetch('/api/users/register',dataToSubmit).then(res =>{
        //     console.log(res.body);
        // }).then((result)=>{
        // })
        // console.log(JSON.stringify(dataToSubmit));
        // var proxyUrl = 'https://cors-anywhere.herokuapp.com/',
        // myurl = 'http://127.0.0.1:5000/api/users/register'
        // fetch(myurl,{
        //     mode:'no-cors',
        //     method:'POST',
        //     body:JSON.stringify(dataToSubmit),
        //     headers:{
        //         'Content-Type':'application/json'
        //     }
        // }).then(res=>{
        //     console.log("fetch error");
        //     console.log(res);

        // }).then((result)=>{
        //     console.log(result);
        // })


        async function postData(url = '', data) {
            // Default options are marked with *
            console.log("fetch function");
            console.log(data)
            const response = await fetch(url, {
              method: 'POST', // *GET, POST, PUT, DELETE, etc.
              mode: 'no-cors', // no-cors, *cors, same-origin
              cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
              credentials: 'same-origin', // include, *same-origin, omit
              headers: {
                'Content-Type': 'application/json'
                // 'Content-Type': 'application/x-www-form-urlencoded',
              },
              redirect: 'follow', // manual, *follow, error
              referrerPolicy: 'no-referrer', // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
              body: JSON.stringify(data) // body data type must match "Content-Type" header
            });
            return response; // parses JSON response into native JavaScript objects
          }
            
         
        // postData('http://127.0.0.1:5000/api/users/register', { dataToSubmit})
        //     .then(data => {
        //         console.log("fetched in 2nd");
        //         console.log(data); // JSON data parsed by `response.json()` call
        //     });


           this.props.dispatch(registerUser(dataToSubmit))
           .then(response =>{
               console.log("disptch called")
               if(response.payload.success){
                    this.setState ({
                        formError:false,
                        formSuccess:true
                    });
                    setTimeout(()=>{
                        this.props.history.push('register_login');
                    },3000)
               }
               else{
                   console.log("response.payload.success")
                   this.setState({formError:true})
               }
           }).catch(e=>{
               console.log(e)
               this.setState({formError:true})
           })



            // postData('http://127.0.0.1:5000/api/users/register', dataToSubmit)
            // .then(data => {
            //     console.log("fetched in 1st");
            //     console.log(data); // JSON data parsed by `response.json()` call
            // });
        }
        else{
            console.log("formIsNotValid")
            this.setState({
                formError:true
            })
        }
    }

    updateForm = (element) => {
        const newFormdata = update(element,this.state.formdata,'register');
        this.setState({
            formError:false,
            formdata:newFormdata
        })
    }

    toggleHover = () => {
        //console.log("hover "+this.state.hover)
        this.setState(()=>
            this.state.hover = !this.state.hover
            )
    }

    render() {
        let styling = {
            display:'block',
            margin:'10px 0 0 0',
            borderRadius:'5px',
            transition:'linear .2s',
        }
        if (this.state.hover) {
            styling = {...styling ,color:'white',cursor: 'pointer',transform:'scale(1.1)',
             background:'rgba(0,0,0,0.8)', border:'transparent'}
        } else {
            styling = {...styling}
        }
        return (
            <div className="page_wrapper">
                <div className="container">
                    <div className="register_login_container">
                        <div className="left">
                            <form action="/api/users/register" method="POST" onSubmit={(event)=> this.submitForm(event)}>
                                <h2>Personal Information</h2>
                                <div className="form_block_two">
                                    <div className="block">
                                        <FormField
                                        id={'name'}
                                        formdata={this.state.formdata.name}
                                        change={(element)=>this.updateForm(element)}
                                        />
                                    </div>
                                    <div className="block">
                                        <FormField
                                        id={'lastname'}
                                        formdata={this.state.formdata.lastname}
                                        change={(element)=>this.updateForm(element)}
                                        />
                                    </div>
                                </div>
                                {/* <div className="form_block_two">
                                    <div className="block">
                                        <FormField
                                        id={'role'}
                                        formdata={this.state.formdata.role}
                                        change={(element)=>this.updateForm(element)}
                                        />
                                    </div>
                                    <div className="block">
                                        <FormField
                                        id={'phone'}
                                        formdata={this.state.formdata.phone}
                                        change={(element)=>this.updateForm(element)}
                                        />
                                    </div>
                                </div> */}
                                <div>
                                    <FormField
                                    id={'email'}
                                    formdata={this.state.formdata.email}
                                    change={(element)=>this.updateForm(element)}
                                    />
                                </div>
                                <h2>Varify Password</h2>
                                <div className="form_block_two">
                                    <div className="block">
                                        <FormField
                                        id={'password'}
                                        formdata={this.state.formdata.password}
                                        change={(element)=>this.updateForm(element)}
                                        />
                                    </div>
                                    <div className="block">
                                        <FormField
                                        id={'confirmPassword'}
                                        formdata={this.state.formdata.confirmPassword}
                                        change={(element)=>this.updateForm(element)}
                                        />
                                    </div>
                                </div>
                                <div>
                                    {console.log(this.state.formError)}
                                    {this.state.formError ? 
                                    <div className="error_label">
                                        please check your data
                                    </div>:null}
                                    <button onClick={(event)=>this.submitForm(event)} style={styling}
                                            onMouseEnter={this.toggleHover} onMouseLeave={this.toggleHover}>
                                        Create an Account
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
                {/* <Dialog open={this.state.formSuccess}>
                    <div className="dialog_alert">
                        <div>
                            congratulations, Successfully Registered.
                        </div>
                    </div>
                </Dialog> */}
            </div>
        );
    }
}

export default connect()(Register);