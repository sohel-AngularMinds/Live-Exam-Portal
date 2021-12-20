import React from 'react'

const EditQuestion = () => {
    return (
        <div className="container mt-4">
            <div className="card">
                <div className="card-header text-uppercase d-flex justify-content-between">
                    <h4 className="card-title mt-3">Edit Question</h4>
                    <h4 className="mt-3" data-bs-toggle="tooltip" data-bs-placement="top" title="Full Screen">
                        <i className='bx bx-fullscreen bx-burst' ></i>
                        <i className='bx bx-fullscreen'></i>
                    </h4>
                </div>
                <div className="card-body">
                    <form>
                        <div className="row">
                            <div className="col-6 mb-3">
                                <label className="form-label">Select Subject</label>
                                <select className="form-select disable">
                                    {/* <option selected>Open this select menu</option> */}
                                    <option className=" text-muted" disabled>type to search Subject</option>
                                    <option value="1">One</option>
                                    <option value="2">Two</option>
                                    <option value="3">Three</option>
                                </select>
                            </div>

                            <div className="col-6 mb-3">
                                <label className="form-label">Select Topic</label>
                                <select className="form-select">
                                    <option className="disable text-muted" disabled >type to search Topic</option>
                                    <option value="1">One</option>
                                    <option value="2">Two</option>
                                    <option value="3">Three</option>
                                </select>
                            </div>
                        </div>



                        <div className="row">
                            <div className="col-3 mb-3">
                                <label className="form-label">Question Type</label>
                                <select className="form-select">
                                    {/* <option selected>Open this select menu</option> */}
                                    <option value="1">Multiple Choice</option>
                                    <option value="2">Multiple Options</option>
                                    <option value="3">Fill In The Blank</option>
                                </select>
                            </div>
                            <div className="col-3 mb-3">
                                <label className="form-label">Difficulty Level</label>
                                <select className="form-select" >
                                    {/* <option selected>Open this select menu</option> */}
                                    <option value="1">Easy</option>
                                    <option value="2">Medium</option>
                                    <option value="3">Hard</option>
                                </select>
                            </div>
                            <div className="col-3 mb-3">
                                <label className="form-label">Right Mark</label>
                                <input type="text" className="form-control" ></input>
                            </div>
                            <div className="col-3 mb-3">
                                <label className="form-label">Wrong Mark</label>
                                <input type="text" className="form-control" ></input>
                            </div>
                        </div>

                        <div className="row">
                            <div className="col-12 mb-3">
                                <label className="form-label">Question</label>
                                <div className="form-floating point">
                                    <textarea className="form-control" placeholder="Question" style={{ height: "100px" }}></textarea>
                                    <label className="form-label text-dark" >Question</label>
                                    <div className="form-text">Enable Rich Text Editor</div>
                                </div>
                            </div>
                        </div>

                        {/* Options Parts */}
                        <div className="row">
                            <label className="form-label">Options</label>
                            <div className="col-12 mb-3">
                                <div className="input-group ">
                                    <span className="input-group-text align-baseline gap-2">
                                        <span className="">
                                            <input className="form-check-input" type="checkbox" />
                                        </span>
                                        <span className="mt-2">
                                            <h6>Option 1</h6>
                                        </span>
                                    </span>
                                    <textarea className="form-control" aria-label="With textarea"></textarea>
                                </div>

                                <div  className="point">
                                    <span className="form-text">Remove Option</span>
                                    <span className="form-text"> | </span>
                                    <span className="form-text">Enable Rich Text Editor</span>
                                </div>
                            </div>

                            <div className="col-12 mb-3">
                                <div className="input-group ">
                                    <span className="input-group-text align-baseline gap-2">
                                        <span className="">
                                            <input className="form-check-input" type="checkbox" />
                                        </span>
                                        <span className="mt-2">
                                            <h6>Option 2</h6>
                                        </span>
                                    </span>
                                    <textarea className="form-control" aria-label="With textarea"></textarea>
                                </div>

                                <div  className="point">
                                    <span className="form-text">Remove Option</span>
                                    <span className="form-text"> | </span>
                                    <span className="form-text">Enable Rich Text Editor</span>
                                </div>
                            </div>

                            <div className="col-12 mb-3">
                                <div className="input-group ">
                                    <span className="input-group-text align-baseline gap-2">
                                        <span className="">
                                            <input className="form-check-input" type="checkbox" />
                                        </span>
                                        <span className="mt-2">
                                            <h6>Option 3</h6>
                                        </span>
                                    </span>
                                    <textarea className="form-control" aria-label="With textarea"></textarea>
                                </div>

                                <div className="point">
                                    <span className="form-text">Remove Option</span>
                                    <span className="form-text"> | </span>
                                    <span className="form-text">Enable Rich Text Editor</span>
                                </div>
                            </div>

                            <div className="col-12 mb-3">
                                <div className="input-group ">
                                    <span className="input-group-text align-baseline gap-2">
                                        <span className="">
                                            <input className="form-check-input" type="checkbox" />
                                        </span>
                                        <span className="mt-2">
                                            <h6>Option 4</h6>
                                        </span>
                                    </span>
                                    <textarea className="form-control" aria-label="With textarea"></textarea>
                                </div>

                                <div className="point">
                                    <span className="form-text"> Remove Option</span>
                                    <span className="form-text"> | </span>
                                    <span className="form-text"> Enable Rich Text Editor</span>
                                </div>
                            </div>
                        </div>

                        <div>
                            <button type="button" className="btn text-primary"> + Add Option </button>
                        </div>
                    </form>
                </div>
                <div className="card-header gap-2">
                    <div className="my-2">
                        <button type="submit" className="btn btn-primary mx-2">Update Question</button>
                        <button type="button" className="btn mx-2"> Cancel </button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default EditQuestion
