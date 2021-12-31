import React, { useState, useEffect, useRef } from 'react'
import Option from '../Option/Option'
import { subjectAPI } from '../Service/Service'

let backup = [];
let optionDataBackup = [];


const AddQuestion = (props) => {

    // for option Data
    const [optionData, setOptionData] = useState([{ option: "", isCorrect: false, richTextEditor: false }, { option: "", isCorrect: false, richTextEditor: false }])

    /////////////////////////////////////////////////////////
    // functions passed as props to other component
    const remove = (temp) => {

        let removed = backup.filter(one => one.key !== temp)
        backup = removed.slice();

        let edited = removed.map((option, index) => {
            return (
                <Option key={option.key}
                    id={option.key}
                    optionNumber={index}
                    remove={option.props.remove}
                    type={option.props.type}
                    addOptionData={option.props.addOptionData}
                />
            )
        })
        setOptionList(edited)
    }

    ////--------- Manages Option Data of Data List
    const getOptionData = (object) => {
        // let temp = optionData.slice();
        // temp[index] = object;
        // console.log(temp);
        console.log(object);
        setOptionData(object);
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
    const [questionType, setQuestionType] = useState('MULTIPLE CHOICE');

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

        // console.log(optionDataBackup);

        let a = <Option key={key}
            id={key}
            type={questionType}
            optionNumber={temp.length}
            remove={remove}
            addOptionData={getOptionData}
            optionData={optionDataBackup}
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
                    addOptionData={getOptionData}
                />)
            i++;
        }


        optionDataBackup = optionData.map((one, index) => {
            return ({
                ...one, id: temp[index].key
            })
        });


        temp = temp.map((oneObj) => {
            return (
                {
                    ...oneObj, props: { ...oneObj.props, optionData: optionDataBackup }
                }
            )
        })

        backup = temp.slice();
        setOptionData(optionDataBackup);
        return temp
    }

    //////////////////////////////////////////////////////////


    //--- sets option type when user change 
    //type of question to one to another
    const setOptionType = (e) => {
        setQuestionType(e.target.value);
        let temp = optionList.map(option => {
            return ({ ...option, props: { ...option.props, type: e.target.value } })
        })
        setOptionList(temp);
    }

    //--- gets option Data

    function onSubmit() {
        console.log(optionData);
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
                                    onChange={(e) => setSubjectId(e.target.value)}
                                >
                                    <option
                                        value="ttss"
                                        style={{ display: 'none' }}
                                    >
                                        type to search Subject
                                    </option>
                                    {subjectList}
                                </select>
                                <div className="form-text text-danger">*Subject is required</div>
                            </div>

                            <div className="col-6 mb-3">
                                <label className="form-label">Select Topic</label>
                                <select
                                    className="form-select"
                                    defaultValue={'ttst'}
                                    onChange={(e) => setTopicId(e.target.value)}
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

                                <div className="form-text text-danger">*Topic is required</div>
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
                                >
                                    <option value="MULTIPLE CHOICE">MULTIPLE CHOICE</option>
                                    <option value="MULTIPLE OPTIONS">MULTIPLE OPTIONS</option>
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
        </div>
    )
}
export default AddQuestion