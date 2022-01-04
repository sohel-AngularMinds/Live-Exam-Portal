import React, { useState } from 'react'
import Navbar from './Navbar/Navbar'
import AddQuestion from './AddQuestion/AddQuestion'
import Questions from './Questions/Questions'
import Footer from './Footer/Footer'
import EditQuestion from './EditQuestion/EditQuestion'
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom'


const App = () => {
    //hide navbar for fullscreen
    const [show, setShow] = useState(false);

    const handleNavbar = (value) => {
        setShow(value);
    }


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

export default App
