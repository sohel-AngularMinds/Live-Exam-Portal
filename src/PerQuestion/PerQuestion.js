import React from 'react'


//--- htmlFor option edit delete
export const option = () => {
    return (
        <div className="d-inline-flex gap-2 py-2 point">
            <div className="align-middle ">
                <span><i className='bx bxs-edit-alt text-muted'></i></span>
                <span className='text-muted'>  Edit</span>
            </div>
            <div className="align-middle ">
                <span><i className='bx bxs-trash text-muted'></i></span>
                <span className='text-muted'>  Delete</span>
            </div>
        </div>
    )
}






const PerQuestion = () => {
    return (
        <div className="container">
            <form >
                <div>
                    <label className='text-dark'>Question Text</label>
                    <br />
                    <div className="form-check">
                        <input className="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault1" />
                        <label className="form-check-label text-muted" htmlFor="flexRadioDefault1">
                            html
                        </label>
                    </div>
                    <div className="form-check">
                        <input className="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault2" />
                        <label className="form-check-label text-muted" htmlFor="flexRadioDefault2">
                            html
                        </label>
                    </div>
                    <div className="form-check">
                        <input className="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault3" />
                        <label className="form-check-label text-muted" htmlFor="flexRadioDefault3">
                            html
                        </label>
                    </div>
                    <div className="form-check">
                        <input className="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault4" />
                        <label className="form-check-label text-muted" htmlFor="flexRadioDefault4">
                            html
                        </label>
                    </div>

                    {option()}
                </div>
                <hr />

                {/*Check Box Code */}
                <div>
                    <label className='text-dark'>Question Text</label>
                    <br />
                    <div className="form-check">
                        <input className="form-check-input" type="checkbox" value="" id="flexCheckDefault1" />
                        <label className="form-check-label text-muted" htmlFor="flexCheckDefault">
                            Default checkbox
                        </label>
                    </div>
                    <div className="form-check">
                        <input className="form-check-input" type="checkbox" value="" id="flexCheckDefault1" />
                        <label className="form-check-label text-muted" htmlFor="flexCheckDefault">
                            Default checkbox
                        </label>
                    </div>
                    <div className="form-check">
                        <input className="form-check-input" type="checkbox" value="" id="flexCheckDefault1" />
                        <label className="form-check-label text-muted" htmlFor="flexCheckDefault">
                            Default checkbox
                        </label>
                    </div>
                    <div className="form-check">
                        <input className="form-check-input" type="checkbox" value="" id="flexCheckDefault1" />
                        <label className="form-check-label text-muted" htmlFor="flexCheckDefault">
                            Default checkbox
                        </label>
                    </div>
                    <div className="form-check">
                        <input className="form-check-input" type="checkbox" value="" id="flexCheckDefault1" />
                        <label className="form-check-label text-muted" htmlFor="flexCheckDefault">
                            Default checkbox
                        </label>
                    </div>
                    {option()}
                </div>
            </form>
        </div>
    )
}

export default PerQuestion
