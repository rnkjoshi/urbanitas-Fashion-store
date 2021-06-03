import React, { Component } from 'react';
import {connect} from 'react-redux';
import { update,generateData,isFormValid } from '../utils/forms/formActions';
import FormField from '../utils/forms/formField';
import { loginUser } from '../../actions/user_actions';
import {withRouter} from 'react-router-dom';
class Login extends Component {

    state = {
        hover:false,
        formError:false,
        formSuccess:'',
        formdata:{
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
                    required:true,
                },
                valid:false,
                touched:false,
                validationMessage:''
            }
        }
    }

    toggleHover = () => {
        //console.log("hover "+this.state.hover)
        this.setState(()=>
            this.state.hover = !this.state.hover
            )
    }

    submitForm = (event) => {
        event.preventDefault();

        let dataToSubmit = generateData(this.state.formdata,'login');
        let formIsValid = isFormValid(this.state.formdata,'login');
        if(formIsValid){
            console.log(dataToSubmit);
            //this.props.history.push('/user/dashboard')
            this.props.dispatch(loginUser(dataToSubmit)).then(response => {
                console.log("dispatching")
                if(response.payload.loginSuccess){
                    console.log(response.payload);
                        this.props.history.push('/user/dashboard')
                }
                else{
                    this.setState({
                        formError:true
                    })
                }
            });
        }
        else{
            this.setState({
                formError:true
            })
        }
        console.log(dataToSubmit);
    }

    updateForm = (element) => {
        const newFormdata = update(element,this.state.formdata,'login');
        this.setState({
            formError:false,
            formdata:newFormdata
        })
    }

    
    render() {
        let styling = {
            display:'block',
            margin:'10px 0 0 0',
            // borderRadius:'5px',
            transition:'linear .2s',
            width:'70px',
            background:'#e1ddc3'
        }
        if (this.state.hover) {
            styling = {...styling ,color:'white',cursor: 'pointer',transform:'scale(1.1)', background:'rgba(0,0,0,0.8)',
        border:'1px solid black'}
        } else {
            styling = {...styling}
        }
        return (
            <div className="signin_wrapper">
                <form onSubmit={(event)=>this.submitForm(event)}>
                        <FormField
                        id={'email'}
                        formdata={this.state.formdata.email}
                        change={(element)=>this.updateForm(element)}
                        />
                        <FormField
                        id={'password'}
                        formdata={this.state.formdata.password}
                        change={(element)=>this.updateForm(element)}
                        />
                        {this.state.formError ? 
                        <div className="error_label">
                            please check your data
                        </div>:null}
                        <button onClick={(event)=>this.submitForm(event)} style={styling}
                                onMouseEnter={this.toggleHover} onMouseLeave={this.toggleHover}>
                            Login
                        </button>
                </form>
            </div>
        );
    }
}

export default connect()(withRouter(Login));