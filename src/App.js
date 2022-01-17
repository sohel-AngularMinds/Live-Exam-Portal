import React, { useState } from 'react'
import Navbar from './Navbar/Navbar'
import AddQuestion from './AddQuestion/AddQuestion'
import Questions from './Questions/Questions'
import Login from './Login/Login.js'
import Footer from './Footer/Footer'
import EditQuestion from './EditQuestion/EditQuestion'
import { BrowserRouter as Router, Route, Routes,Navigate } from 'react-router-dom'


import { GoogleReCaptchaProvider } from 'react-google-recaptcha-v3'
import Cookies from 'js-cookie'



const App = () => {
    //hide navbar for fullscreen
    const [show, setShow] = useState(false);

    const [token,setToken]=useState(Cookies.get('_token'))



    const handleNavbar = (value) => {
        setShow(value);
    }


    if (token === undefined) {
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
                        <Route path="*" element={<Navigate to={'/login'}></Navigate>}/>
                        <Route exact path="/login" element={<Login />} />
                    </Routes>
                </Router>
            </GoogleReCaptchaProvider>
        )
    }
    else {
        return (
            <Router>
                <Navbar showStatus={show}/>
                <Routes>
                    <Route exact path="/questions/default" element={<Questions />} />
                    <Route path="/questions/add" element={<AddQuestion toggleNavbar={handleNavbar} />} />
                    <Route path="/questions/edit/:id" element={<EditQuestion toggleNavbar={handleNavbar} />} />
                </Routes>
                <Footer />
            </Router>
        )
    }
}



export default App
