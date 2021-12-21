import React, { useState, useEffect } from 'react'
import Option from '../Option/Option'

let backup = [];


const AddQuestion = (props) => {

    const remove = (temp) => {
        let removed = backup.filter(one => one.key !== temp)
        backup = removed.slice();

        let edited = removed.map((option, index) => {
            return (
                <Option key={option.key}
                    id={option.key}
                    optionNumber={index}
                    remove={remove}
                />
            )
        })

        setOptionList(edited)
}

////////////////////////////////////////////////////////
// use states
//for fullscreen mode
const [fullScreen, setFullScreen] = useState(false);
const [iconChange, setIconChange] = useState(false);
// for option Array

const [optionList, setOptionList] = useState(() => callTwice());
const [showOptionList, setShowOptionList] = useState(null);

// const [backup,dispatch]=useReducer(reducer,callTwice());



//////////////////////////////////////////////////////////
//on click toggle full screen
const changeFullScreenMode = () => {
    let temp = !fullScreen;
    setFullScreen(temp);
    props.toggleNavbar(temp);
}
//////////////////////////////////////////////////////////








//////////////////////////////////////////////////////////////////
//---- ADD OPTION IN LIST

// const option = (key, optionNumber) => {
//     //acceptiong type also binding with some value

//     return (
//         <div className="col-12 mb-3" key={key} id={optionNumber}>
//             <div className="input-group ">
//                 <span className="input-group-text align-baseline gap-2">
//                     <span className="">
//                         <input className="form-check-input" type="checkbox" />
//                     </span>
//                     <span className="mt-2">
//                         <h6>Option {Number(optionNumber) + 1} </h6>
//                     </span>
//                 </span>
//                 <textarea className="form-control" aria-label="With textarea"></textarea>
//             </div>

//             <div className="point">
//                 <span
//                     className="form-text"
//                     onClick={() => { removeOption(key) }}
//                 >
//                     Remove Option{key}
//                 </span>
//                 <span className="form-text"> | </span>
//                 <span
//                     className="form-text"
//                 >
//                     Enable Rich Text Editor
//                 </span>
//             </div>console.log("CSCS");
//         </div>
//     )
// }






/////////////////////////////////////////////////////////////////


//add new Option
const addNewOption = () => {
    let temp = optionList.slice();
    let a = <Option key={`key${new Date().getTime() + (temp.length * 10)}`}
        id={`key${new Date().getTime() + (temp.length * 10)}`}
        optionNumber={temp.length}
        remove={remove}
    />
    temp.push(a);
    backup.push(a)
    setOptionList(prev => prev = temp);

}


//Inintial Value
function callTwice() {
    let i = 0;
    let temp = [];
    while (i < 2) {
        temp.push(<Option
            key={`key${new Date().getTime() + (i * 10)}`}
            id={`key${new Date().getTime() + (i * 10)}`}
            optionNumber={i}
            remove={remove}
        />)
        i++;
    }
    backup = temp.slice();
    return temp
}


//for render list when it add one element or remove element from it
useEffect(() => {
    if (optionList != null) {
        setShowOptionList(prev => prev = optionList);
    }
}, [optionList])

/////////////////////////////////////////////////////////

// currentState();
return (
    <div className="container mt-4">
        <div className="card">
            <div className="card-header text-uppercase d-flex justify-content-between">
                <h4 className="card-title mt-3">Add Question</h4>

                <h4 className="mt-3"
                    data-bs-toggle="tooltip"
                    data-bs-placement="top"
                    title="Full Screen"
                    onMouseEnter={() => { setIconChange(!iconChange) }}
                    onMouseLeave={() => { setIconChange(!iconChange) }}
                    onClick={changeFullScreenMode}
                >
                    <i className={`bx bx-fullscreen ${iconChange ? "bx-burst" : ''}`} />
                    {/* <i className='bx bx-fullscreen'></i> */}
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
                                <option className="disable text-muted" disabled>type to search Topic</option>
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
                                <option value="radio">Multiple Choice</option>
                                <option value="checkbox">Multiple Options</option>
                                <option value="radio">Fill In The Blank</option>
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
                            <div className="form-floating">
                                <textarea className="form-control" placeholder="Question" style={{ height: "100px" }}></textarea>
                                <label className="form-label text-dark">Question</label>
                                <div className="form-text point">Enable Rich Text Editor</div>
                            </div>
                        </div>
                    </div>


                    {/* Options Parts */}
                    <div className="row">
                        <label className="form-label">Options</label>
                        {showOptionList}
                    </div>
                    <div>
                        <button
                            type="button"
                            className="btn text-primary"
                            onClick={addNewOption}
                        >
                            + Add Option
                        </button>
                    </div>
                </form>
            </div>
            <div className="card-header gap-2">
                <div className="my-2">
                    <button type="submit" className="btn btn-primary mx-2">Save Question</button>
                    <button type="button" className="btn mx-2"> Cancel </button>
                </div>
            </div>
        </div>
    </div>
)
}

export default AddQuestion
