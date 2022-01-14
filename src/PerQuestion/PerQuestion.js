import React from 'react'



//--- htmlFor option edit delete
const operation = (_id, deleteFun, editFun, topic) => {

    return (
        <div className="d-inline-flex gap-2 py-2 point">
            <div className="align-middle "
                onClick={() => {
                    editFun(_id)
                }}
            >
                <span><i className='bx bxs-edit-alt text-muted'></i></span>
                <span className='text-muted'>
                    Edit
                </span>
            </div>
            <div className="align-middle "
                onClick={() => {
                    let res = window.confirm("Are you sure you want to delete the question, this can not be rolled back?");
                    if (res)
                        deleteFun(_id);
                    else
                        return;
                }}>
                <span><i className='bx bxs-trash text-muted'></i></span>
                <span className='text-muted'>Delete</span>
            </div>
        </div>
    )
}

const PerQuestion = (props) => {
    const { type, options, questionText, _id, topic } = props.data;
    const { deleteFun, editFun } = props

    const setOptions = (type, options) => {
        let inputType = type === "MULTIPLE RESPONSE" ? 'checkbox' : 'radio'
        let t = options.map(({ option, isCorrect, _id }, index) => {

            return (
                <React.Fragment key={_id}>
                    <div className="form-check">
                        <input className="form-check-input"
                            type={inputType}
                            name={inputType === 'radio' ? 'rdo' : `check${index}`}
                            value={isCorrect}
                            checked={isCorrect}
                            disabled={true}
                        />
                        <label className="form-check-label text-muted">
                            <div dangerouslySetInnerHTML={{ __html: option }} />
                        </label>
                    </div>
                </React.Fragment>
            )
        })
        return t;
    }


    return (
        <div className="container p-0 m-0">
            <form >
                <div>
                    <div>
                        <input className="form-check-input" type="checkbox" id="flexCheckDefault1" />
                        <label className='text-dark ms-2' >
                            <div dangerouslySetInnerHTML={{ __html: questionText }} />
                        </label>
                    </div>
                    <br />
                    {setOptions(type, options)}
                    {operation(_id, deleteFun, editFun, topic)}
                </div>
            </form>
            <hr></hr>
        </div>
    )
}

export default PerQuestion
