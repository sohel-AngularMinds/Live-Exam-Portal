import React from 'react'
import { useNavigate } from 'react-router-dom'

const Navbar = (props) => {
    const showStatus = props.showStatus;
    let navigate = useNavigate();
    return (
        <div className={`container-fluid navbar-dark bg-dark ${showStatus?'hide':'show'}`}>
            <nav className="navbar navbar-expand-lg text-uppercase">
                <div className="container">
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse text-center" id="navbarNavDropdown">
                        <ul className="navbar-nav">
                            <li className="nav-item">
                                <span className="nav-link active"
                                    onClick={() => {
                                        navigate('/questions/default');
                                }}
                                >Questions</span>
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
