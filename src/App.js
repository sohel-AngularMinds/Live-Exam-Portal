import React from 'react'
import Navbar from './Navbar/Navbar'
// import AddQuestion from './AddQuestion/AddQuestion'
import Questions from './Questions/Questions'
import Footer from './Footer/Footer'

const App = () => {
    return (
        <>
            <Navbar />
            {/* <AddQuestion /> */}
            <Questions />
            <Footer />
        </>
    )
}

export default App
