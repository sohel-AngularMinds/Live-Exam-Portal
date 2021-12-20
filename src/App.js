import React, {useState } from 'react'
import Navbar from './Navbar/Navbar'
import AddQuestion from './AddQuestion/AddQuestion'
import Questions from './Questions/Questions'
import Footer from './Footer/Footer'
import EditQuestion from './EditQuestion/EditQuestion'

const App = () => {
    //hide navbar for fullscreen
    const [show, setShow] = useState(false);
    
    const handleNavbar = (value) => {
        setShow(value);
    }


    return (
        <>
            <Navbar showStatus={show}/>
            <AddQuestion toggleNavbar={handleNavbar}/>
            <EditQuestion />
            <Questions />
            <Footer />
        </>
    )
}

export default App
