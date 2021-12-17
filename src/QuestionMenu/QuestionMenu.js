import React from 'react'

const QuestionMenu = () => {
    return (
        <div className="container">
            <ul className="nav justify-content-between">
                <li className="nav-item text-center">
                    <span className="nav-link text-secondary">
                        <span>
                            <input type="checkbox" className="form-check-input" />
                        </span>
                        <span className="fs-6 mx-2">Show</span>
                        <span>
                            <select className="form-select-sm">
                                <option value="1">5</option>
                                <option value="2">20</option>
                                <option value="3">100</option>
                            </select>
                        </span>
                        <span className="fs-6 mx-2">record per page</span>
                    </span>
                </li>
                <li className="nav-item text-center">
                    <form className="d-flex nav-link text-secondary">
                        <input className="form-control me-2" type="search" placeholder="Search Question" aria-label="Search" />
                        <select className="form-select">
                            {/* <option selected>Open this select menu</option> */}
                            <option value="1">One</option>
                            <option value="2">Two</option>
                            <option value="3">Three</option>
                        </select>
                    </form>

                </li>
            </ul>
        </div>
    )
}

export default QuestionMenu
