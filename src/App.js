import React, { useState } from 'react'
import Navbar from './Navbar/Navbar'
import AddQuestion from './AddQuestion/AddQuestion'
import Questions from './Questions/Questions'
import Login from './Login/Login'
import Footer from './Footer/Footer'
import EditQuestion from './EditQuestion/EditQuestion'
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom'
import { GoogleReCaptchaProvider } from 'react-google-recaptcha-v3'


const App = () => {
    //hide navbar for fullscreen
    const [show, setShow] = useState(false);

    //this state is used for conditional rendering and also for changing router path
    const [loginAuthencation, setLoginAuthencation] = useState(localStorage.getItem('loginAuthencation')?JSON.parse(localStorage.getItem('loginAuthencation')):true);

    
    const handleNavbar = (value) => {
        setShow(value);
    }

    const handleLogin = (value) => {
        setLoginAuthencation(value);
    }


    if (loginAuthencation) {
        return (
            <GoogleReCaptchaProvider
                reCaptchaKey="6Ld3COIZAAAAAC3A_RbO1waRz6QhrhdObYOk7b_5"
                scriptProps={{
                    async: false, // optional, default to false,
                    defer: false, // optional, default to false
                    appendTo: 'head', // optional, default to "head", can be "head" or "body",
                    nonce: undefined // optional, default undefined
                }}
            >
                <Router>
                    <Routes>
                        <Route path="*" element={<Navigate to="/login" />}></Route>
                        <Route exact path="/login" element={<Login handleLogin={handleLogin} />}></Route>
                    </Routes>
                </Router>
            </GoogleReCaptchaProvider>
        )
    }
    else {
        return (
            <>
                <Router>
                    <Navbar showStatus={show} />
                    <Routes>
                        <Route path="*" element={<Navigate to="/questions/default" />}></Route>

                        <Route path="/questions/default" element={<Questions />}></Route>

                        <Route exact path="/questions/add" element={<AddQuestion toggleNavbar={handleNavbar} />}></Route>

                        <Route path="/questions/edit/:id" element={<EditQuestion toggleNavbar={handleNavbar} />}></Route>

                    </Routes>
                    <Footer />
                </Router>
            </>
        )
    }



}

export default App
