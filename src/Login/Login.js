import React, { useState } from 'react'
import { useGoogleReCaptcha } from 'react-google-recaptcha-v3';
import axios from 'axios'
import logo from './images/undraw_remotely_2j6y.svg'
import './css/bootstrap.min.css'
import './css/style.css'

import { GoogleLogin } from 'react-google-login';
import { useNavigate, Navigate } from 'react-router';
import Cookies from 'js-cookie'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';




function Login() {
    let navigate = useNavigate();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const { executeRecaptcha } = useGoogleReCaptcha();


    const handleRecaptchaRequest = async (e) => {
        e.preventDefault();
        let response;
        try {
            
            if (!executeRecaptcha) {
                console.log('execute recaptcha is not available');
                return;
            }
            let captchaResponse = await executeRecaptcha('Action_Name');//it is token
            
            console.log("try dsfsdgs");
            response = await axios.post(" https://admin.liveexamcenter.in/api/auth/login", { email, password, reCaptchaToken: captchaResponse })

            // localStorage.setItem('auth_token', response.data.token);        
            if (response.status === 200) {
                setEmail('');
                setPassword('');
                Cookies.set('_token', response.data.token, { expires: 1 });
                // navigate('/questions/default');
                window.open('/questions/default', '_self');
            }
            
            

        } catch (e) {
            setEmail('');
            setPassword('');
            console.log("dsfsdf");
            toast.error(`Enter Valid Email ID And Password!`, {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
        }

    }


    const responseGoogle = async (response) => {

        if (!executeRecaptcha) {
            console.log('Execute recaptcha not yet available');
            return;
        }

        let captchaResponse = await executeRecaptcha('Action_name');

        if (captchaResponse) {

            let result = await axios.post("http://admin.liveexamcenter.in/api/auth/google", { idToken: response.tokenId, reCaptchaToken: captchaResponse })

            if (result.status === 200) {
                Cookies.set('_token', result.data.token, { expires: 1 });
                window.open('/questions/default', '_self');
            }


        }

    }

    if (Cookies.get('_token') === undefined) {
        return (
            <div className="content">
                <div className="container">
                    <div className="row">
                        <div className="col-md-6">
                            <img src={logo} alt="logo" className="img-fluid" />
                        </div>
                        <div className="col-md-6 contents">
                            <div className="row justify-content-center">
                                <div className="col-md-8">
                                    <div className="mb-4">
                                        <h3>Login to your account</h3>
                                    </div>

                                    <form onSubmit={(e) => handleRecaptchaRequest(e)}>
                                        <div className="form-group first">
                                            <input
                                                type="text"
                                                className="form-control"
                                                id="username"
                                                placeholder="Email address"
                                                value={email}
                                                onChange={(e) => setEmail(e.target.value)}

                                            />
                                        </div>
                                        <div className="form-group last mb-4">
                                            <input
                                                type={showPassword ? "text" : "password"}
                                                className="form-control"
                                                id="password"
                                                placeholder="Password"
                                                value={password}
                                                onChange={(e) => setPassword(e.target.value)}
                                            />
                                        </div>

                                        <div className="d-flex mb-5 align-items-center">
                                            <label className="control control--checkbox mb-0"><span className="caption">Show Password</span>
                                                <input
                                                    type="checkbox"
                                                    defaultValue={showPassword}
                                                    checked={showPassword && "checked"}
                                                    onChange={() => { setShowPassword(prev => prev = !prev) }}
                                                />
                                                <div className="control__indicator"></div>
                                            </label>
                                        </div>

                                        <input type="submit" value="Log In" className="btn btn-block btn-primary" />

                                        <div>
                                            <div className="d-flex justify-content-center my-4">
                                                <p className="text-center fw-bold mx-3 mb-0 text-muted">-OR-</p>
                                            </div>

                                            <div className="d-flex justify-content-center my-2">
                                                <GoogleLogin
                                                    clientId="971623344603-0qquan9pcdb9iu7oq9genvpnel77i7oa.apps.googleusercontent.com"
                                                    buttonText="Login With Google"
                                                    onSuccess={responseGoogle}
                                                    onFailure={responseGoogle}
                                                    cookiePolicy={'single_host_origin'}
                                                />
                                            </div>
                                        </div>
                                    </form>
                                </div>
                            </div>

                        </div>

                    </div>
                </div>
                <ToastContainer />
            </div>

        )
    }
    else {
        // navigate('/questions/default')
        <Navigate to={'/questions/default'}></Navigate>
    }
}

export default Login
