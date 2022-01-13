import React, { useState, useEffect, useRef } from 'react'
import Option from '../Option/Option'
import { subjectAPI, postQuestions } from '../Service/Service'
import { useNavigate } from 'react-router-dom';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { finalValidation } from '../Validation/Validate';

let errorBackup = {};
const AddQuestion = (props) => {
    let navigate = useNavigate();
    //for fullscreen mode
    const [fullScreen, setFullScreen] = useState(false);
    const [iconChange, setIconChange] = useState(false);
    //------------for setting error object
    const [error, setError] = useState({});
    //-------- for option Error message
    const [optionError, setOptionError] = useState(() => []);
    //------- for loading button nimation
    const [loadingButton, setLoadingButton] = useState(() => false);


    //////////////////////////////////////////////////////////
    //-- start
    //on click toggle full screen
    const changeFullScreenMode = () => {
        let temp = !fullScreen;
        setFullScreen(temp);
        props.toggleNavbar(temp);
    }
    //-- end
    //////////////////////////////////////////////////////////
    ////-------------- Inintial Value
    function callTwice() {
        let i = 0;
        let temp = [];
        while (i < 2) {
            let key = `key${new Date().getTime() + (i * 10)}`
            temp.push(
                {
                    _id: key,
                    isCorrect: false,
                    option: '',
                    richTextEditor: false
                }
            )
            i++;
        }
        return temp
    }
    //////////////////////////////////////////////////////////
    //------------Checking Error validation part

    //////////////////////////////////////////////////////////

    // for option Data
    const [optionData, setOptionData] = useState(() => callTwice())
    /////////////////////////////////////////////////////////
    // functions passed as props to other component

    ////--------- Manages Option Data of Data List
    const changeOptionData = (key, type) => {

        function checkTrue(acc, current) {
            if (current.isCorrect === true)
                ++acc;
            return acc;
        }

        if (type === 'MULTIPLE RESPONSE') {
            let trueCounter = 0;

            let temp = optionData.map((one) => {
                if (one._id === key) {
                    one.isCorrect = !one.isCorrect;
                }
                return one
            })

            //----checks error 
            trueCounter = temp.reduce(checkTrue, trueCounter);
            let newError;
            if (trueCounter === 0) {
                newError = { ...errorBackup, zeroOption: "Please select at least 1 option" }
            }
            else {
                newError = { ...errorBackup, zeroOption: null }
            }
            errorBackup = newError;
            setError(newError);
            setOptionData(temp);
        }
        else {
            let temp = optionData.map((one) => {
                if (one._id === key) {
                    one.isCorrect = true;
                }
                else {
                    one.isCorrect = false;
                }
                return one;
            })

            let trueCounter = 0;

            trueCounter = temp.reduce(checkTrue, trueCounter);
            let newError;
            if (trueCounter === 0) {
                newError = { ...errorBackup, zeroOption: "Please select at least 1 option" }
            }
            else {
                newError = { ...errorBackup, zeroOption: null }
            }
            errorBackup = newError;
            setError(newError);
            setOptionData(temp)
        }
    }

    const changeOptionText = (e, id, index) => {
        let temp = optionData.slice();
        temp[index] = { ...temp[index], option: e.target.value }
        setOptionData(temp);

        //------- for error checking code
        let optionErr = temp.map((one) => {
            if (one.option === '' || one.option == null) {
                return 'option is required'
            }
            return '';
        })
        let newError = {}
        let found = false;
        // check same or not
        for (let i = 0; i < temp.length - 1; i++) {
            for (let j = i + 1; j < temp.length; j++) {
                if (temp[i].option === temp[j].option) {
                    found = true;
                }
            }
        }

        if (found) {
            newError = { ...errorBackup, sameElement: 'Duplicate options are not allowed.' };
            found = false;
        }
        else {
            newError = { ...errorBackup, sameElement: '' };
        }
        
        errorBackup = newError;
        newError = { ...errorBackup, optionErrorArray: optionErr };
        setOptionError(optionErr);
        setError(newError);
        errorBackup = newError;
    }

    const remove = (id) => {
        let temp = optionData.filter((one) => one._id !== id)
        setOptionData(temp);
    }

    /////////////////////////////////////////////////////////

    ////////////////////////////////////////////////////////
    //---- use states
    //--- for get SubjectId for gets respective topic from dataBase
    const [subjectId, setSubjectId] = useState(null);
    //---- for getting data of Subject
    const [subjectList, setSubjectList] = useState();

    //--- for get TopicId 
    const [topicId, setTopicId] = useState(null);
    //---- for getting data of selected subject
    const [topicList, setTopicList] = useState(null);

    //------- for  Question Type
    const [questionType, setQuestionType] = useState(() => 'MULTIPLE CHOICE');

    //------ for  Question Level
    const [diffLevel, setDiffLevel] = useState('Medium');

    //------ for right mark
    const [rightMarks, setRightMarks] = useState(1);

    //------ for wrong mark
    const [wrongMarks, setWrongMarks] = useState(0);

    //------ for question text
    const questionText = useRef();

    // for option Array of option
    const [optionList, setOptionList] = useState();
    const [showOptionList, setShowOptionList] = useState(null);

    //typeRef
    const subjectRef = useRef();
    const topicRef = useRef();
    const questionTypeRef = useRef();
    const difficultyRef = useRef();
    const rightMarkRef = useRef();
    const wrongMarkRef = useRef();


    //////////////////////////////////////////////////////////
    //------------add new Option
    const addNewOption = () => {
        let temp = optionList.slice();
        let tempData = optionData.slice();
        let key = `key${new Date().getTime() + (temp.length * 10)}`
        let newObj = {
            option: "",
            isCorrect: false,
            richTextEditor: false,
            _id: key
        }
        tempData.push(newObj);
        setOptionData(prev => tempData);
    }
    //////////////////////////////////////////////////////////


    //////////////////////////////////////////////////////////
    //--- sets option type when user change 
    //change type of question one to another
    const setOptionType = (e) => {
        setQuestionType(e.target.value);
        let temp = optionList.map(option => {
            return ({ ...option, props: { ...option.props, type: e.target.value } })
        })
        setOptionList(temp);
    }

    /***************************************-- Submitting question --**********************************************/
    function onSubmit(e) {
        e.preventDefault();
        let obj = {
            diffLevel: diffLevel,
            options: optionData.map(one => {
                return { option: one.option, isCorrect: one.isCorrect, richTextEditor: one.richTextEditor }
            }),
            questionText: questionText.current.value,
            rightMarks,
            wrongMarks,
            type: questionType,
            subject: subjectId,
            topic: topicId,
        }

        //-----calls function and get error object if any have in file
        let newError = finalValidation(obj, setOptionError);
        errorBackup = newError;


        //if error object contain optionErrorArray with no error message
        //if no any error message then we delete the property
        if (newError.hasOwnProperty('optionErrorArray')) {
            let count = 0;
            count = newError.optionErrorArray.reduce((count, current) => {
                if (current !== '')
                    ++count;
                return count;
            }, count)
            if (count === 0)
                delete newError.optionErrorArray
        }

        if (Object.keys(newError).length > 0) {
            setError(newError)
            //for focus
            let allRef = [subjectRef, topicRef, questionTypeRef, difficultyRef, rightMarkRef, wrongMarkRef, questionText];
            let properties = ['subject', 'topic', 'type', 'diffLevel', 'rightMark', 'wrongMark', 'questionText'];

            for (let i = 0; i < properties.length; i++) {
                if (newError.hasOwnProperty(properties[i])) {
                    allRef[i].current.focus()
                    return;
                }
            }
            return
        }

        setLoadingButton(true);
        const postRequest = async () => {
            let res = await postQuestions('/questions', obj);
            if (res.status === 200 && res.statusText === 'OK') {
                toast.success('Question Added Succesfully', {
                    position: "bottom-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                });
                setLoadingButton(false);
                questionText.current.value = '';
                setOptionData(() => callTwice());
            }
        }
        let timeOut = window.setTimeout(postRequest(), 1800);
        clearTimeout(timeOut);
    }
    /*****************************************--Checking Error--********************************************/

    //questionText
    const checkError = (e) => {
        let newError;
        if (e.target.value === "" || e.target.value == null) {
            newError = { ...error, questionText: "Don't let it empty it is mandatory" }
        }
        else {
            newError = { ...error, questionText: null }
        }
        errorBackup = newError;
        setError(newError);
    }
    /*************************************---Use Effects---*****************************************/

    //we set here perticular option error message
    useEffect(() => {
        if (optionError.length > 0) {
            let temp = optionList.map((one, index) => {
                return {
                    ...one, props: { ...one.props, errorText: optionError[index] }
                };
            })
            setOptionList(temp)
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [optionError])



    //render option block
    useEffect(() => {
        if (optionData) {
            let temp = optionData.map((one, index) => {
                return (
                    <Option
                        key={one._id}
                        id={one._id}
                        data={one}
                        type={questionType}
                        optionNumber={index}
                        remove={remove}
                        changeOptionData={changeOptionData}
                        changeOptionText={changeOptionText}
                        errorText={optionError[index]}
                    />
                )
            });
            setOptionList(temp);
            setShowOptionList(temp);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [optionData, questionType])


    //for render list when it add one element or remove element from it
    useEffect(() => {
        if (optionList != null) {
            setShowOptionList(optionList);
        }
    }, [optionList])



    //--- use effect for load data from api
    useEffect(() => {
        try {
            let url = '/subjects?term='
            const get = async () => {
                const response = await subjectAPI(url);
                let temp = response.result.map((res) =>
                    <option
                        key={res._id}
                        value={res._id}
                    >
                        {res.name}
                    </option>
                )
                setSubjectList(temp)
            }
            get();
        }
        catch (e) {

        }
    }, [])

    //after changing the subjectd
    useEffect(() => {
        if (subjectId) {
            let url = "/topics/subject/" + subjectId
            const get = async () => {
                const response = await subjectAPI(url);
                setTopicList(
                    response.map(res => {
                        return (
                            <option key={res._id} value={res._id}>
                                {res.name}
                            </option>
                        )
                    })
                )
            }
            get();
        }
    }, [subjectId])
    //------- end useEffect

    /////////////////////////////////////////////////////////
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
                    <form className="needs-validation" noValidate>
                        <div className="row">
                            <div className="form-group col-6 mb-3">
                                <label className="form-label">Select Subject</label>
                                <select
                                    className="form-select"
                                    defaultValue={'ttss'}
                                    onChange={(e) => {
                                        setSubjectId(e.target.value);
                                        //for changing error after the selecting some subject
                                        let newError = { ...errorBackup, subject: null };
                                        errorBackup = newError;
                                        setError(newError);
                                    }}
                                    ref={subjectRef}
                                >
                                    <option
                                        value="ttss"
                                        style={{ display: 'none' }}
                                    >
                                        type to search Subject
                                    </option>
                                    {subjectList ?
                                        subjectList :
                                        <option disabled>no item Found</option>}
                                </select>

                                <div className="form-text text-danger">
                                    {error ? error.subject : <div>&nbsp;&nbsp;<br /></div>}
                                </div>
                            </div>

                            <div className="form-group col-6 mb-3">
                                <label className="form-label">Select Topic</label>
                                <select
                                    className="form-select"
                                    defaultValue={'ttst'}
                                    ref={topicRef}
                                    onChange={(e) => {
                                        setTopicId(e.target.value)
                                        //for changing error after the selecting some subject
                                        let newError = { ...errorBackup, topic: null }
                                        errorBackup = newError;
                                        setError(newError)
                                    }}
                                >
                                    <option value="ttst" style={{ display: 'none' }}>type to search Topic</option>
                                    {
                                        topicList ?
                                            <>
                                                {topicList}
                                            </>
                                            :
                                            <option disabled>select subject first</option>
                                    }
                                </select>

                                <div className="form-text text-danger">
                                    {error ? error.topic : <div>&nbsp;&nbsp;<br /></div>}
                                </div>
                            </div>
                        </div>

                        <div className="row">
                            <div className="form-group col-3 mb-3">
                                <label className="form-label">Question Type</label>
                                <select
                                    className="form-select"
                                    defaultValue={questionType}
                                    name="questionType"
                                    onChange={setOptionType}
                                    ref={questionTypeRef}
                                >
                                    <option value="MULTIPLE CHOICE">MULTIPLE CHOICE</option>
                                    <option value="MULTIPLE RESPONSE">MULTIPLE RESPONSE</option>
                                    <option value="FILL IN BLANKS">FILL IN BLANKS</option>
                                </select>
                                <div className="form-text text-danger">
                                    {error ? error.type : <div>&nbsp;&nbsp;<br /></div>}
                                </div>
                            </div>


                            <div className="form-group col-3 mb-3">
                                <label className="form-label">Difficulty Level</label>
                                <select className="form-select"
                                    name="diffLevel"
                                    defaultValue={diffLevel}
                                    onChange={(e) => {
                                        setDiffLevel(e.target.value);
                                    }}
                                    ref={difficultyRef}
                                >
                                    <option value="Easy">Easy</option>
                                    <option value="Medium">Medium</option>
                                    <option value="Hard">Hard</option>
                                </select>
                                <div className="form-text text-danger">
                                    {error ? error.diffLevel : <div>&nbsp;&nbsp;<br /></div>}
                                </div>
                            </div>
                            <div className="form-group col-3 mb-3">
                                <label className="form-label">Right Mark</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    value={rightMarks}
                                    ref={rightMarkRef}
                                    onChange={(e) => {
                                        setRightMarks(Number(e.target.value))

                                        //error checking code
                                        let newError = {}
                                        if ((Number(e.target.value) !== '' || Number(e.target.value) !== 0) && Number(e.target.value) > 0) {
                                            if (e.target.value < wrongMarkRef.current.value) {
                                                newError = { ...errorBackup, rightMark: "right mark always greater than wrong mark" }
                                            }
                                            else {
                                                newError = { ...errorBackup, rightMark: null }
                                            }
                                            errorBackup = newError;
                                        }
                                        else {
                                            newError = { ...errorBackup, rightMark: "please provide proper Mark" }
                                            errorBackup = newError;
                                        }
                                        setError(errorBackup);
                                    }}

                                />
                                <div className="form-text text-danger">
                                    {error ? error.rightMark : <div>&nbsp;&nbsp;<br /></div>}
                                </div>
                            </div>
                            <div className="form-group col-3 mb-3">
                                <label className="form-label">Wrong Mark</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    value={wrongMarks}
                                    ref={wrongMarkRef}
                                    onChange={(e) => {
                                        setWrongMarks(Number(e.target.value))
                                        let newError = {}
                                        //error code
                                        if (Number(e.target.value) === '' || Number(e.target.value) < 0) {
                                            newError = { ...errorBackup, wrongMark: "please provide proper Mark" }
                                            errorBackup = newError;
                                        }
                                        else {
                                            newError = { ...errorBackup, wrongMark: null }
                                            errorBackup = newError;
                                            // errorBackup = newError;

                                            if (Number(e.target.value) >= rightMarkRef.current.value) {
                                                newError = { ...errorBackup, rightMark: "right mark always greater than wrong mark" }
                                            }
                                            else {
                                                newError = { ...errorBackup, rightMark: null }

                                            }
                                            errorBackup = newError;
                                            setError(errorBackup);
                                        }

                                    }}
                                />
                                <div className="form-text text-danger">
                                    {error ? error.wrongMark : <div>&nbsp;&nbsp;<br /></div>}
                                </div>
                            </div>
                        </div>

                        <div className="row">
                            <div className="form-group col-12 mb-3">
                                <label className="form-label">Question</label>
                                <div className="form-floating">
                                    <textarea
                                        className="form-control"
                                        placeholder="Question"

                                        style={error ? (error.questionText ? {
                                            outline: "1px red solid",
                                            height: "150px", border: "1px solid red"
                                        } : { height: "150px" }) : { height: "150px" }}
                                        name="questionText"
                                        onChange={checkError}
                                        ref={questionText}
                                    ></textarea>
                                    <label className="form-label text-dark">Question</label>
                                    <div className="form-text point">
                                        Enable Rich Text Editor
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Options Parts */}
                        <div className="row form-group">
                            <label className="form-label">Options</label>
                            {showOptionList}
                        </div>
                        <div className="form-group">
                            <button
                                type="button"
                                className="btn text-primary"
                                onClick={addNewOption}
                            >
                                + Add Option
                            </button>
                        </div>
                    </form>
                    <div className="form-text text-danger">
                        {error ? error.zeroOption : <div>&nbsp;&nbsp;<br /></div>}
                    </div>
                    <div className="form-text text-danger">
                        {error ? error.sameElement : <div>&nbsp;&nbsp;<br /></div>}
                    </div>
                </div>

                <div className="card-header gap-2">
                    <div className="my-2">
                        <button type="submit" className="btn btn-primary mx-2" onClick={onSubmit}>

                            {
                                loadingButton ?
                                    <div className="spinner-border spinner-border-sm" role="status">
                                        <span className="visually-hidden">Loading...</span>
                                    </div>
                                    :
                                    <>&nbsp;&nbsp;</>
                            }
                            &nbsp;
                            Save Question
                        </button>
                        <button 
                        type="button"
                         className="btn mx-2"
                         onClick={()=>navigate(-1)}
                        > Cancel </button>
                    </div>
                </div>
            </div>
            <ToastContainer />
        </div>
    )
}
export default AddQuestion