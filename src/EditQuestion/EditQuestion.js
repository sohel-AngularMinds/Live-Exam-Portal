import React, { useState, useEffect, useRef } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify';
import Option from '../Option/Option';
import { GrowingSpinner } from '../Placeholder/Loading';
import { questionsAPI, subjectAPI, putQuestion } from '../Service/Service'


const EditQuestion = (props) => {
    let navigate = useNavigate();

    const { id } = useParams();

    const [loading, setLoading] = useState(() => true);
    const [loadingButton, setLoadingButton] = useState(() => false);

    const [optionData, setOptionData] = useState(() => [])
    //for fullscreen mode
    const [fullScreen, setFullScreen] = useState(() => false);
    const [iconChange, setIconChange] = useState(() => false);



    //--- for get SubjectId for gets respective topic from dataBase
    const [subjectId, setSubjectId] = useState(() => null);
    //---- for getting data of Subject
    const [subjectList, setSubjectList] = useState(() => null);



    //--- for get TopicId 
    const [topicId, setTopicId] = useState(() => null);
    //---- for getting data of selected subject
    const [topicList, setTopicList] = useState(() => null);

    //------- for  Question Type
    const [questionType, setQuestionType] = useState(() => '');

    //------ for  Question Level
    const [diffLevel, setDiffLevel] = useState(() => '');

    //------ for right mark
    const [rightMarks, setRightMarks] = useState(() => 1);

    //------ for wrong mark
    const [wrongMarks, setWrongMarks] = useState(() => 0);

    //------ for question text
    const questionText = useRef();


    // for option Array of option
    const [optionList, setOptionList] = useState(() => []);
    const [showOptionList, setShowOptionList] = useState(() => null);

    const [defaultValues, setDefaultValues] = useState(() => null);

    //typeRef
    const subjectRef = useRef();
    const topicRef = useRef();
    const questionTypeRef = useRef();
    const difficultyRef = useRef();
    const rightMarkRef = useRef();
    const wrongMarkRef = useRef();

    //--------- minimizig and maximazing screen size
    const changeFullScreenMode = () => {
        let temp = !fullScreen;
        setFullScreen(temp);
        props.toggleNavbar(temp);
    }


    const remove = (id) => {
        let temp = optionData.filter((one) => one._id !== id)
        setOptionData(temp);
    }

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
    const onUpdate = () => {
        setLoadingButton(true);

        

        let obj = {
            diffLevel: diffLevel,
            options: optionData.map(one => {
                return {
                    option: one.option,
                    isCorrect: one.isCorrect,
                    richTextEditor: one.hasOwnProperty('richTextEditor') ? one.richTextEditor : false
                }
            }),
            questionText: questionText.current.value,
            rightMarks,
            wrongMarks,
            type: questionType,
            subject: subjectId,
            topic: topicId,
        }
        
        // console.log(obj);

        const putQue = async () => {
            const res = await putQuestion(`/questions/${id}`, obj);
            
            if (res.status === 200 || res.status === 204) {
                toast.success('Question updated successfully ', {
                    position: "bottom-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                });
                
                navigate('/questions/default');
            }
            else {
                toast.error('Something happened please try again', {
                    position: "bottom-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                });
            }
        }
        let timeOut = window.setTimeout(putQue(), 2000);
        clearTimeout(timeOut);
    }



    //////////////////////////////////////////////////////////

    //----------------------------------------use Effects----------------------------//
    useEffect(() => {
        try {
            let url = `/questions/${id}`


            async function get() {

                const response = await questionsAPI('/subjects?term=');
                let temp = response.result.map((res) =>
                    <option
                        key={res._id}
                        value={res._id}
                    >
                        {res.name}
                    </option>
                )
                setSubjectList(temp)


                const res = await questionsAPI(url);
                if (res) {
                    setDefaultValues(res);
                    setQuestionType(res.type);
                    setDiffLevel(res.diffLevel);
                    setRightMarks(res.rightMarks);
                    setWrongMarks(res.wrongMarks);
                    setSubjectId(res.subject._id);
                    setOptionData(res.options);
                    setTopicId(res.topic._id);
                }
                setLoading(false);
            }
            get();
        }
        catch (e) {

        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
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

    //----------------------------------------end useEffect----------------------------//
    return (
        <div className="container mt-4">
            <div className="card">

                <div className="card-header text-uppercase d-flex justify-content-between">
                    <h4 className="card-title mt-3">Edit Question</h4>

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
                {
                    loading ? <GrowingSpinner /> :
                        <>
                            <div className="card-body">
                                <form>
                                    <div className="row">
                                        <div className="col-6 mb-3">
                                            <label className="form-label">Select Subject</label>
                                            <select
                                                className="form-select"
                                                defaultValue={defaultValues ? defaultValues.subject._id : 'ttss'}
                                                onChange={(e) => {
                                                    setSubjectId(e.target.value)
                                                }}
                                                ref={subjectRef}
                                            >
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
                                                defaultValue={defaultValues ? defaultValues.topic._id : 'ttst'}
                                                ref={topicRef}
                                                onChange={(e) => {
                                                    setTopicId(e.target.value)
                                                }
                                                }
                                            >
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
                                                ref={questionTypeRef}
                                                onChange={(e) => setQuestionType(e.target.value)}
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
                                                    defaultValue={defaultValues.questionText}
                                                    style={{ height: "170px" }}
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
                                            onClick={() => {
                                                addNewOption();
                                            }}
                                        >
                                            + Add Option
                                        </button>
                                    </div>
                                </form>
                            </div>
                            <div className="card-header gap-2">
                                <div className="my-2">
                                    <button
                                        type="submit"
                                        className="btn btn-primary mx-2"
                                        onClick={() => onUpdate()}
                                    >
                                        {
                                            loadingButton ?
                                                <div className="spinner-border spinner-border-sm" role="status">
                                                    <span className="visually-hidden">Loading...</span>
                                                </div>
                                                :
                                                <>&nbsp;&nbsp;</>
                                        }
                                        &nbsp;
                                        Update Question

                                    </button>
                                    <button type="button" className="btn mx-2"> Cancel </button>
                                </div>
                            </div>
                        </>
                }
            </div>{ /*end of card */}
        </div>
    )

}

export default EditQuestion
