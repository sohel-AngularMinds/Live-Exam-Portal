import React from 'react'
import QuestionMenu from '../QuestionMenu/QuestionMenu'
import PerQuestion from '../PerQuestion/PerQuestion'
import { useNavigate } from 'react-router-dom'

const Questions = () => {
    let navigate = useNavigate();
    return (
        <div className="container">

            <div className="mt-5 mb-3 d-flex justify-content-between">
                <div><h3><strong>Questions</strong></h3></div>
                <div>
                    <button
                        type="button"
                        className="btn btn-primary"
                        onClick={() => {
                            navigate('../questions/add');            
                        }}
                    >
                        + Add Question
                    </button>
                </div>
            </div>

            <div className="card">
                <div className="card-body">
                    <QuestionMenu />

                    <hr className="dropdown-divider" />
                    <PerQuestion />
                    <hr className="dropdown-divider" />
                    <PerQuestion />
                    <hr className="dropdown-divider" />
                    <PerQuestion />
                    <hr className="dropdown-divider" />
                    <PerQuestion />
                    <hr className="dropdown-divider" />
                    <PerQuestion />
                </div>
            </div>
        </div>
    )
}

export default Questions
