import React, { useState } from 'react'
import { useGoogleReCaptcha } from 'react-google-recaptcha-v3';
import axios from 'axios'

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';



function Login(props) {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);

    let { handleLogin } = props;

    const { executeRecaptcha } = useGoogleReCaptcha();


    const handleRecaptchaRequest = async (e) => {
        e.preventDefault();
        
        if (!executeRecaptcha)
        {
            console.log('execute recaptcha is not available');
            return;
        }


        
        async function captchaRes() { 
            let captchaResponse = await executeRecaptcha('Action_Name');//it is token
            return captchaResponse;
        }
        
        let captchaResponse=await captchaRes();
        console.log(captchaResponse);

        
        async function respo() {
            let response = await axios.post(" https://admin.liveexamcenter.in/api/auth/login", { email, password, reCaptchaToken: captchaResponse })
            return response;
    }
        let response =await respo();
        
        localStorage.setItem('auth_token', response.data.token);
    
        

        if (response.status === 200)
        {   
            localStorage.setItem('_response', JSON.stringify(response))
            localStorage.setItem('loginAuthencation',false);
            handleLogin(false);
        }
        else
        {
            
            toast.error(`${response}!`, {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
            
            setEmail('');
            setPassword('');
            
            localStorage.setItem('auth_token', '');
            localStorage.setItem('loginAuthencation',true);
            handleLogin(false);
        }

    }


    return (
        <div className="content">
            <div className="container">
                <div className="row">
                    <div className="col-md-6">
                        <img src="images/undraw_remotely_2j6y.svg" alt="logo" className="img-fluid" />
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
                                            defaultValue={email}
                                            onChange={(e) => setEmail(e.target.value)}

                                        />
                                    </div>
                                    <div className="form-group last mb-4">
                                        <input
                                            type={showPassword ? "text" : "password"}
                                            className="form-control"
                                            id="password"
                                            placeholder="Password"
                                            defaultValue={password}
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

export default Login
