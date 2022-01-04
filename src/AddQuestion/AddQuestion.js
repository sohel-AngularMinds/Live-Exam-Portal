import React, { useState, useEffect, useRef } from 'react'
import Option from '../Option/Option'
import { subjectAPI, postQuestions } from '../Service/Service'

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

let backup = [];
let optionDataBackup = [];

const AddQuestion = (props) => {
    // for option Data
    const [optionData, setOptionData] = useState([])
    /////////////////////////////////////////////////////////
    // functions passed as props to other component

    ////--------- Manages Option Data of Data List
    const changeOptionData = (key, type) => {
        if (type !== 'MULTIPLE RESPONSE') {
            // setSelectedOption(key);
            optionDataBackup = optionDataBackup.map((oneObj, index) => {
                if (oneObj.id !== key) {
                    oneObj.isCorrect = false;
                }
                else {
                    oneObj.isCorrect = true;
                }
                return oneObj;
            })
            setOptionData(optionDataBackup);
        }
        else {
            optionDataBackup = optionDataBackup.map((oneObj, index) => {
                if (oneObj.id === key) {
                    oneObj.isCorrect = !Boolean(oneObj.isCorrect);
                }
                return oneObj;
            })
            setOptionData(optionDataBackup);
        }
    }

    const changeOptionText = (e, id, index) => {
        optionDataBackup[index] = { ...optionDataBackup[index], option: e.target.value }
        setOptionData(optionDataBackup);
    }

    const remove = (temp) => {
        let removed = backup.filter(one => one.key !== temp)
        let removedData = optionDataBackup.filter(one => one.id !== temp)

        backup = removed.slice();
        optionDataBackup = removedData.slice();

        let edited = removed.map((option, index) => {
            return (
                <Option key={option.key}
                    id={option.key}
                    {...option.props}
                    optionNumber={index}
                    type={option.props.type}

                />
            )
        })

        setOptionList(edited);
        setOptionData(optionDataBackup);
    }

    /////////////////////////////////////////////////////////

    ////////////////////////////////////////////////////////
    //---- use states

    //for fullscreen mode
    const [fullScreen, setFullScreen] = useState(false);
    const [iconChange, setIconChange] = useState(false);

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
    const [optionList, setOptionList] = useState(() => callTwice());
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
    //add new Option
    const addNewOption = () => {

        let temp = optionList.slice();
        let tempData = optionData.slice();

        let key = `key${new Date().getTime() + (temp.length * 10)}`

        let newObj = {
            option: "",
            isCorrect: false,
            richTextEditor: false,
            id: key
        }

        tempData.push(newObj);
        optionDataBackup.push(newObj);

        let a = <Option
            key={key}
            id={key}
            type={questionType}
            optionNumber={temp.length}
            remove={remove}
            changeOptionData={changeOptionData}
            changeOptionText={changeOptionText}
        />
        temp.push(a);
        backup.push(a);

        setOptionList(prev => prev = temp);
        setOptionData(prev => prev = tempData);
    }
    //////////////////////////////////////////////////////////
    ////-------------- Inintial Value
    function callTwice() {
        let i = 0;
        let temp = [];
        while (i < 2) {
            let key = `key${new Date().getTime() + (temp.length * 10)}`
            temp.push(
                <Option
                    key={key}
                    id={key}
                    type={questionType}
                    optionNumber={i}
                    remove={remove}
                    changeOptionData={changeOptionData}
                    changeOptionText={changeOptionText}
                />)
            i++;
        }

        let tempOption = [
            { option: "", isCorrect: false, richTextEditor: false },
            { option: "", isCorrect: false, richTextEditor: false }
        ]

        optionDataBackup = tempOption.map((one, index) => {
            return ({
                ...one, id: temp[index].key
            })
        });

        backup = temp.slice();
        setOptionData(optionDataBackup);
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
        backup = temp;
        setOptionList(temp);
    }

    //--- gets option Data
    function onSubmit() {
        // console.log(subjectRef.current.value!=='ttss');
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
        // console.log(obj);
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


    // console.log(optionData);


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
                    <form>
                        <div className="row">
                            <div className="col-6 mb-3">
                                <label className="form-label">Select Subject</label>
                                <select
                                    className="form-select"
                                    defaultValue={'ttss'}
                                    onChange={(e) => {
                                        setSubjectId(e.target.value)
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
                                <div className="form-text text-danger">{subjectRef.current ? (subjectRef.current.value === 'ttss' ? '*Subject is required' : <span>&nbsp;</span>) : ''}</div>

                            </div>

                            <div className="col-6 mb-3">
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
                                <div className="form-text text-danger">{topicRef.current ? (topicRef.current.value === 'ttst' ? '*topic is required' : <span>&nbsp;</span>) : ''}</div>
                            </div>
                        </div>

                        <div className="row">
                            <div className="col-3 mb-3">
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
                            </div>


                            <div className="col-3 mb-3">
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
                            </div>
                            <div className="col-3 mb-3">
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
                            </div>
                            <div className="col-3 mb-3">
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
                            </div>
                        </div>

                        <div className="row">
                            <div className="col-12 mb-3">
                                <label className="form-label">Question</label>
                                <div className="form-floating">
                                    <textarea
                                        className="form-control"
                                        placeholder="Question"
                                        style={{ height: "100px" }}
                                        ref={questionText}
                                    ></textarea>
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