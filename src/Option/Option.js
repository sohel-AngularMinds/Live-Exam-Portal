import React, { useState,useEffect } from 'react'


let optionDataBackup = [];
const Option = (props) => {
    let { id, optionNumber, remove, type, addOptionData,optionData } = props
    
    const [data, setData] = useState({
        option: "",
        isCorrect: false,
        richTextEditor: false,
        id
    })

    const changeBoolean = (e) => {
        // console.log(e.target.id);
        // console.log(e.target.checked);
        // let temp = data.map((oneObj,index) => {
        //     if (oneObj.id === e.target.id)
        //     {
        //         console.log(oneObj);
        //     }

        // })
        setData({ ...data, isCorrect: e.target.value })
        let x =e.target.id;
        console.log(x);
        // setData()
        // console.log((e.target.checked));
        //
    }
    const changeOption = (e) => {
        setData({ ...data, [e.target.name]: e.target.value })
    }

    const removeOption = (key, index) => {
        remove(key)
    }

    useEffect(() => {
        if (data.option !== '')
        {
            console.log(data);
            // addOptionData
            // addOptionData(data)  
        }
    }, [data])


    return (
        <div className="col-12 mb-3" >
            <div className="input-group ">
                <span className="input-group-text align-baseline gap-2">
                    <span className="">
                        <input
                            className="form-check-input"
                            type={type === 'MULTIPLE OPTIONS' ? 'checkbox' : 'radio'}
                            name={type === 'MULTIPLE OPTIONS' ? `check${optionNumber + 1}` : 'isCorrect'}
                            id={id}
                            value={Boolean(data.isCorrect) && true}
                            checked={Boolean(data.isCorrect) && true}
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
                    onClick={() => removeOption(id, optionNumber)}
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