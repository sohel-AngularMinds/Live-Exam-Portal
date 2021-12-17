import React from 'react'

const Navbar = () => {
    return (
        <div className="container-fluid navbar-dark bg-dark">
            <nav className="navbar navbar-expand-lg text-uppercase">
                <div className="container">
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarNavDropdown">
                        <ul className="navbar-nav">
                            <li className="nav-item">
                                <span className="nav-link active">Questions</span>
                            </li>
                            <li className="nav-item">
                                <span className="nav-link">Subjects</span>
                            </li>
                            <li className="nav-item">
                                <span className="nav-link">Topics</span>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
        </div>
    )
}

export default Navbar
