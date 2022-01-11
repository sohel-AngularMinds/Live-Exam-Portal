import React, { useState, useEffect, useRef } from 'react'
import Option from '../Option/Option'
import { subjectAPI, postQuestions } from '../Service/Service'

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const AddQuestion = (props) => {
    //for fullscreen mode
    const [fullScreen, setFullScreen] = useState(false);
    const [iconChange, setIconChange] = useState(false);
    //------------for setting error object
    const [error, setError] = useState({});
    //-------- for option Error message
    const [optionError, setOptionError] = useState(() => []);
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

    //////////////////////////////////////////////////////////

    //validation part
    function finalValidation(obj) {

        let newError = {}

        if (obj.subject == null || obj.subject === 'ttss')
            newError = { ...newError, subject: 'Please Select the subject it is necessary' }


        if (obj.topic == null || obj.topic === 'ttst')
            newError = { ...newError, topic: 'Please Select the topic it is necessary' }

        if (obj.questionText === "" || obj.questionText == null)
            newError = { ...newError, questionText: "Don't let it empty it is mandatory" }

        if (obj.type === "" || obj.type == null)
            newError = { ...newError, type: "type is required" }

        if (obj.diffLevel === "" || obj.diffLevel == null)
            newError = { ...newError, type: "Difficulty Level is required" }


        if (obj.rightMarks === '' || obj.rightMarks === 0 || obj.rightMarks < 1)
            newError = { ...newError, rightMark: "please provide proper Mark" }

        if (obj.wrongMarks === '' || obj.wrongMarks < 0)
            newError = { ...newError, wrongMark: "please provide proper Mark" }


        if (obj.options.length >= 2) {
            let optionErrorArray = [];
            let trueValue = 0;

            function checkOptionText(value, index) {
                if (value.option === '' || value.option == null)
                    optionErrorArray[index] = "option is required"
                else
                    optionErrorArray[index] = ""

                // eslint-disable-next-line eqeqeq
                if (value.isCorrect == true)
                    ++trueValue;
            }
            obj.options.forEach(checkOptionText)
            
            newError = { ...newError, optionErrorArray: optionErrorArray }
            setOptionError(optionErrorArray);

            if (trueValue === 0) {
                newError = { ...newError, zeroOption: "Please Select At-Least One Option" }
            }
        }
        else {
            newError = { ...newError, zeroOption: "Please Add At-Least Two Option " }
        }

        return newError;
    }

    //////////////////////////////////////////////////////////

    console.log(error);

    // for option Data
    const [optionData, setOptionData] = useState(() => callTwice())
    /////////////////////////////////////////////////////////
    // functions passed as props to other component

    ////--------- Manages Option Data of Data List
    const changeOptionData = (key, type) => {
         if (type === 'MULTIPLE RESPONSE') {
            setOptionData(optionData.map((one) => {
                if (one._id === key) {
                    one.isCorrect = !one.isCorrect;
                }
                return one
            }))
        }
        else {
            setOptionData(optionData.map((one) => {
                if (one._id === key) {
                    one.isCorrect = true;
                }
                else {
                    one.isCorrect = false;
                }
                return one;
            }))
        }
    }

    const changeOptionText = (e, id, index) => {
        let temp = optionData.slice();
        temp[index] = { ...temp[index], option: e.target.value }
        setOptionData(temp);
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



    //------- end 
    //////////////////////////////////////////////////////////
    //add new Option
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
    ////-------------- Inintial Value
    function callTwice() {
        let i = 0;
        let temp = [];
        while (i < 2) {
            let key = `key${new Date().getTime() + (temp.length * 10)}`
            temp.push(
                {
                    _id:key,
                    isCorrect: false,
                    option: '',
                    richTextEditor:false
                }
            )
            i++;
        }
        return temp
    }

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

    //--- gets option Data
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

        let newError = finalValidation(obj);
        // console.log(newError);
        if (Object.keys(newError).length > 0) {
            setError(newError)
            return;
        }

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
                questionText.current.value = '';
                setOptionList(() => callTwice());
            }
        }
        postRequest();
    }

    //for error
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



    //render option data
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
        //http://admin.liveexamcenter.in/api/topics/subject
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
                                        setSubjectId(e.target.value)
                                    }}
                                    ref={subjectRef}
                                    required
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
                                    {error.subject}
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
                                    }
                                    }
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
                                    {error.topic}
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
                                    {error.type}
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
                                    {error.diffLevel}
                                </div>
                            </div>
                            <div className="form-group col-3 mb-3">
                                <label className="form-label">Right Mark</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    value={rightMarks}
                                    onChange={(e) => {
                                        setRightMarks(Number(e.target.value))
                                    }}
                                    ref={rightMarkRef}
                                />
                                <div className="form-text text-danger">
                                    {error.rightMark}
                                </div>
                            </div>
                            <div className="form-group col-3 mb-3">
                                <label className="form-label">Wrong Mark</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    value={wrongMarks}
                                    onChange={(e) => {
                                        setWrongMarks(Number(e.target.value))
                                    }}
                                    ref={wrongMarkRef}
                                />
                                <div className="form-text text-danger">
                                    {error.wrongMark}
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
                                        style={{ height: "100px" }}
                                        ref={questionText}
                                        required></textarea>
                                    <label className="form-label text-dark">Question</label>

                                    {error.questionText ?
                                        <div className="form-text text-danger">
                                            {error.questionText}
                                        </div>
                                        : <div className="form-text point">
                                            Enable Rich Text Editor
                                        </div>
                                    }
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
                        {error.zeroOption}
                    </div>
                </div>

                <div className="card-header gap-2">
                    <div className="my-2">
                        <button type="submit" className="btn btn-primary mx-2" onClick={onSubmit}>Save Question</button>
                        <button type="button" className="btn mx-2"> Cancel </button>
                    </div>
                </div>




            </div>
            <ToastContainer />
        </div>
    )
}
export default AddQuestion