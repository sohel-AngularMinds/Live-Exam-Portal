import React, { useState } from 'react'

const Option = (props) => {
    let { id, optionNumber, remove, type, addOptionData,optionData } = props
    const [data, setData] = useState({
        isCorrect: optionData[optionNumber].isCorrect,
        option: optionData[optionNumber].option,
        richTextEditor:optionData[optionNumber].richTextEditor
    })

    const changeBoolean = (e) => {
        setData({...data,isCorrect:!data.isCorrect})
        console.log(optionData);
    }
    const changeOption = (e) => {
        setData({...data,[e.target.name]:e.target.value})
    }

    const removeOption = (key) => {
        remove(key)
    }

    console.log(data);
    return (
        <div className="col-12 mb-3" >
            <div className="input-group ">
                <span className="input-group-text align-baseline gap-2">
                    <span className="">
                        <input
                            className="form-check-input"
                            type={type === 'MULTIPLE OPTIONS' ? 'checkbox' : 'radio'}
                            name={type === 'MULTIPLE OPTIONS' ? `check${optionNumber + 1}` : 'isCorrect'}
                            id={optionNumber}
                            value={data.isCorrect}
                            onChange={changeBoolean}
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
                    onChange={changeOption}
                ></textarea>
            </div>

            <div className="point">
                <span
                    className="form-text"
                    onClick={() => removeOption(id)}
                >
                    Remove Option {id}
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