import React from 'react'

const Option = (props) => {
    let { id, optionNumber,type,remove,changeOptionData,changeOptionText } = props
    

    return (
        <div className="col-12 mb-3" >
            <div className="input-group">
                <span className={`input-group-text align-baseline gap-2 ${type === 'MULTIPLE RESPONSE' ? 'checkbox' : 'radio'}`}>
                    <span className="">
                        <input
                            className="form-check-input"
                            type={type === 'MULTIPLE RESPONSE' ? 'checkbox' : 'radio'}
                            name={type === 'MULTIPLE RESPONSE' ? `check${optionNumber + 1}` : 'isCorrect'}
                            id={id}
                            value={id}  
                            onChange={()=>changeOptionData(id,type)}
                        />
                    </span>
                    <span className="mt-2">
                        <h6>Option {optionNumber + 1} </h6>
                    </span>
                </span>
                <textarea
                    className="form-control"
                    aria-label="With textarea"
                    name="option"
                    onChange={(e)=>changeOptionText(e,id,optionNumber)}                
                ></textarea>
            </div>

            <div className="point">
                <span
                    className="form-text"
                    onClick={()=>remove(id)}
                >
                    Remove Option
                </span>
                <span className="form-text"> | </span>

                <span
                    className="form-text"
                    id={optionNumber}
                >
                    Enable Rich Text Editor
                </span>
            </div>
        </div>
    )
}

export default Option