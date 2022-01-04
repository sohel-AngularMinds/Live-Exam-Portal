import React, { useState, useEffect, useRef } from 'react'
import { useParams } from 'react-router-dom'
import { questionsAPI } from '../Service/Service'




const EditQuestion = (props) => {

    const { id } = useParams();

    const [loading, setLoading] = useState(true);

    const [optionData, setOptionData] = useState([])
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
    const [questionType, setQuestionType] = useState('');

    //------ for  Question Level
    const [diffLevel, setDiffLevel] = useState('Medium');

    //------ for right mark
    const [rightMarks, setRightMarks] = useState(1);

    //------ for wrong mark
    const [wrongMarks, setWrongMarks] = useState(0);

    //------ for question text
    const questionText = useRef();


    // for option Array of option
    const [optionList, setOptionList] = useState([]);
    const [showOptionList, setShowOptionList] = useState(null);

    const [defaultValues, setDefaultValues] = useState(null);

    //typeRef
    const subjectRef = useRef();
    const topicRef = useRef();
    const questionTypeRef = useRef();
    const difficultyRef = useRef();
    const rightMarkRef = useRef();
    const wrongMarkRef = useRef();


    const changeFullScreenMode = () => {
        let temp = !fullScreen;
        setFullScreen(temp);
        props.toggleNavbar(temp);
    }

    useEffect(() => {

        try {
            let url = `/questions/${id}`

            async function get() {
                const res = await questionsAPI(url);
                if (res) {
                    // console.log(res);
                    setDefaultValues(res);
                    setQuestionType(res.type);
                    setDiffLevel(res.diffLevel);
                    setRightMarks(res.rightMarks);
                    setWrongMarks(res.wrongMarks);
                }

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

                setLoading(false);
            }
            get();
        }
        catch (e) {

        }

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    if (loading) {
        return (
            <div class="d-flex justify-content-center align-items-center my-5 gap-2 " style={{height:"70vh"}}>
                <div class="spinner-grow text-primary" role="status">
                    <span class="visually-hidden">Loading...</span>
                </div>
                <div class="spinner-grow text-secondary" role="status">
                    <span class="visually-hidden">Loading...</span>
                </div>
                <div class="spinner-grow text-success" role="status">
                    <span class="visually-hidden">Loading...</span>
                </div>
                <div class="spinner-grow text-danger" role="status">
                    <span class="visually-hidden">Loading...</span>
                </div>
                <div class="spinner-grow text-warning" role="status">
                    <span class="visually-hidden">Loading...</span>
                </div>
                <div class="spinner-grow text-info" role="status">
                    <span class="visually-hidden">Loading...</span>
                </div>
                <div class="spinner-grow text-dark" role="status">
                    <span class="visually-hidden">Loading...</span>
                </div>
            </div>
        )
    }
    else {
        return (
            <div className="container mt-4">
                <div className="card">
                    <div className="card-header text-uppercase d-flex justify-content-between">
                        <h4 className="card-title mt-3">Update Question</h4>

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
                                >
                                    + Add Option
                                </button>
                            </div>
                        </form>
                    </div>
                    <div className="card-header gap-2">
                        <div className="my-2">
                            <button type="submit" className="btn btn-primary mx-2" >Update Question</button>
                            <button type="button" className="btn mx-2"> Cancel </button>
                        </div>
                    </div>
                </div>
            </div>
        )


    }

}

export default EditQuestion
