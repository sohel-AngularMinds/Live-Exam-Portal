import React from 'react'

const Option = (props) => {
    let {id,optionNumber,remove }=props
    
    const removeOption = (key) => {
        remove(key)
}

    
    return (
        <div className="col-12 mb-3" >
            <div className="input-group ">
                <span className="input-group-text align-baseline gap-2">
                    <span className="">
                        <input className="form-check-input" type="checkbox" />
                    </span>
                    <span className="mt-2">
                        <h6>Option {optionNumber+1 } </h6>
                    </span>
                </span>
                <textarea className="form-control" aria-label="With textarea"></textarea>
            </div>

            <div className="point">
                <span
                    className="form-text"
                    onClick={()=>removeOption(id) }
                >
                    Remove Option {id}
                </span>
                <span className="form-text"> | </span>
                <span
                    className="form-text"
                >
                    Enable Rich Text Editor
                </span>
            </div>
        </div>
    )
}

export default Option
