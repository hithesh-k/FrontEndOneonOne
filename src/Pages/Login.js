import React from 'react'
import './Manager.css'
import axios from 'axios';
import Header from '../Components/Header'
import { Redirect } from "react-router-dom";
import apiconstants from '../Config';
// import { Input, Form, Icon } from 'semantic-ui-react'
import Footer from "../Components/Footer"
import { GoogleLogin } from 'react-google-login';
import '../welcompg/welMainbody.css'

class Login extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            email:'',
            name:''
        }           
    }

    changeHandler = e => {
        this.setState({
            [e.target.name]: e.target.value
        });
    }

    some_fun=async (res)=>{
        let email=res.profileObj.email;
        let name=res.profileObj.name;
        console.log(res.profileObj.name)
        console.log("in some fun "+  res.profileObj.email)
        const response = await axios({
            method: 'post',
            url: apiconstants.URL + 'login',
            data: {
                email:email,
                name:name,
            }
            
        })
        console.log(response);

        if (response.data.designation === "manager") {
            this.props.history.push('/manager/' + response.data.id)
        }
        else if (response.data.designation === "employee") {
            this.props.history.push('/e/' + response.data.id)
        }
        else {
            this.props.history.push('/hr/' + response.data.id)
        }
        return (
            console.log(JSON.stringify(response.data)),
            localStorage.setItem("designation", response.data.designation)
        );

    }
    submitHandler = async (e) => {
        e.preventDefault();
        console.log("in the submit handler"+this.state);
        const response = await axios({
            method: 'post',
            url: apiconstants.URL + 'login',
            data: this.state
            
        })
        .then(res => {
            console.log(res);
            console.log(res.data);
          })
        console.log(this.state)
         console.log(response)

        
            
        }

       
    

    componentDidMount(){
        
        console.log(this.state)
        
    }

    render() {
        const { email, password } = this.state;
        const responseGoogle = (response) => {
            console.log(response);
            console.log(response.profileObj.email)
            // this.setState({email: response.profileObj.email})
            // this.setState({name: response.profileObj.name})
            console.log(this.state)
        }

        if (this.state.redirect) {
            return <Redirect to="/manager" />;
        }
        return (
            <div className="firstbg">
                <div className="form-signin">
                    <Header />
                    <form style={{paddingLeft:"50px"}}>
                       
                        <h1 className='head'>ONE-ON-ONE</h1>
                        <div className="container">
                            <div className="card card-container">
                                <h1 className="log">LOGIN</h1>
                                <input
                                    type="email"
                                    id="email"
                                    name="email"
                                    className="form-control"
                                    placeholder="Email ID"
                                    value={email} onChange={this.changeHandler} />

                                <input
                                    type="password"
                                    id="password"
                                    name="password"
                                    className="form-control"
                                    placeholder="Password"
                                    value={password} onChange={this.changeHandler} />

                                {/* <Form.Input
                                    icon ='user'
                                    style={{color: 'gray'}}
                                    iconPosition='left'
                                    placeholder='Email'
                                    type="email"
                                    //id="email"
                                    name="email"
                                    //className="form-control"
                                    value={email} onChange={this.changeHandler}
                                />
                                <Form.Input
                                    icon='lock'
                                    iconPosition='left'
                                    type='password'
                                    //id="password"
                                    name="password"
                                    //className="form-control"
                                    placeholder="Password"
                                    value={password} onChange={this.changeHandler}
                                /> */}


                                <button
                                    className="btn btn-lg btn-primary btn-block btn-signin" 
                                >Sign in </button>
                                 <GoogleLogin 
                            clientId="956241439404-4eq02hua19uucer4buloimdiq34bsrov.apps.googleusercontent.com"
                            buttonText="Sign in with Google "
                            // render={renderProps => (
                            //     <button onClick={renderProps.onClick} disabled={renderProps.disabled}>This is my custom Google button</button>
                            //   )}
                            onSuccess={(responseGoogle)=>this.some_fun(responseGoogle)}
                            onFailure={responseGoogle}
                            cookiePolicy={'single_host_origin'}
                            //onClick={(responseGoogle)=>this.some_fun(responseGoogle)}
                        />

                            </div>{/* /card-container */}

                        </div>
                    </form>
                </div>
                <br />

                <Footer />
            </div>

        );
    }

}
export default Login
