import React, { useState, useEffect, useRef } from 'react'
import { useParams, useNavigate } from 'react-router-dom'

import { toast } from 'react-toastify';
import Option from '../Option/Option';
import { GrowingSpinner } from '../Placeholder/Loading';
import RichTextEditor from '../RichTextEditor/RichTextEditor';
import { questionsAPI, subjectAPI, putQuestion } from '../Service/Service'
import { finalValidation } from '../Validation/Validate';

let errorBackup = {};

const EditQuestion = (props) => {
    let navigate = useNavigate();

    const { id } = useParams();

    const [loading, setLoading] = useState(() => true);
    const [loadingButton, setLoadingButton] = useState(() => false);

    //------------for setting error object
    const [error, setError] = useState({});
    //-------- for option Error message
    const [optionError, setOptionError] = useState(() => []);

    const [optionData, setOptionData] = useState(() => [])
    //for fullscreen mode
    const [fullScreen, setFullScreen] = useState(() => false);
    const [iconChange, setIconChange] = useState(() => false);

    //------- rich text editor reference
    const [refernce, setRefernce] = useState(() => null);



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
    const [questionTexts, setQuestionTexts] = useState('');


    //------ for question text
    const questionText = useRef();


    // for option Array of option
    const [optionList, setOptionList] = useState(() => []);
    const [showOptionList, setShowOptionList] = useState(() => null);

    const [defaultValues, setDefaultValues] = useState(() => null);

    // for reach text editor of question text field
    const [richTextEditor, setRichTextEditor] = useState(false);

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

            //for checking errors
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

    const changerichTextEditor = (key, value) => {

        let temp = optionData.map((one) => {
            if (one._id === key) {
                one.richTextEditor = !value;
            }
            return one
        })
        setOptionData(temp);
    }

    const changeRichOptionText = (value, index) => {
        let temp = optionData.slice();
        if (value === '<p><br></p>')
            value = '';

        temp[index] = { ...temp[index], option: value };
        setOptionData(temp);


        let newError = {}

        //------- for error checking code
        let optionErr = temp.map((one) => {
            if (one.option === '' || one.option == null || one.option === '\n' || one.option === '<p><br/></p>') {
                return 'option is required'
            }
            return '';
        })

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
            newError = { ...errorBackup, sameElement: null };
        }
        errorBackup = newError;
        newError = { ...errorBackup, optionErrorArray: optionErr };
        setOptionError(optionErr);
        setError(newError);
        errorBackup = newError;
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


    const onUpdate = (e) => {
        e.preventDefault();

        let temp = richTextEditor ? refernce.makeUnprivilegedEditor(refernce.getEditor()) : '';
        let obj = {
            diffLevel: diffLevel,
            options: optionData.map(one => {
                return { option: one.option, isCorrect: one.isCorrect, richTextEditor: one.richTextEditor }
            }),
            questionText: richTextEditor ? (temp.getText() !== '\n' ? temp.getHTML() : '\n') : questionText.current.value,
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

        const putQue = async () => {
            const res = await putQuestion(`/questions/${id}`, obj);

            if (res.status === 200 || res.status === 204) {//res.ok==true or false

                toast.success('Question updated successfully ', {
                    position: "bottom-right",
                    autoClose: 2000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                });

                window.setTimeout(navigate('/questions/default'), 3000);
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
        let timeOut = window.setTimeout(putQue(), 1800);
        clearTimeout(timeOut);
    }



    //////////////////////////////////////////////////////////
    /*****************************************--Checking Error--********************************************/

    //questionText
    const checkError = (value) => {
        setQuestionTexts(value);
        let newError;
        if (value === "" || value == null || value === '\n') {
            newError = { ...error, questionText: "Don't let it empty it is mandatory", textError: true }
        }
        else {
            newError = { ...error, questionText: null, textError: false }
        }
        errorBackup = newError;
        setError(newError);
    }


    const checkQuestionRichTextEditor = (refernceOfRichText, text) => {
        setRefernce(refernceOfRichText);
        let newError;
        if (text === "" || text == null || text === "<p><br></p>" || text === '\n') {
            newError = { ...error, questionText: "Don't let it empty it is mandatory" }
        }
        else {
            newError = { ...error, questionText: null }
        }
        errorBackup = newError;
        setError(newError);
    }

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
                    setQuestionTexts(res.questionText);

                    if (res.questionText.includes('<h1>') || res.questionText.includes('<strong>')
                        || res.questionText.includes('<em>') || res.questionText.includes('<u>')
                        || res.questionText.includes('<blockquote>') || res.questionText.includes('<span')
                        || res.questionText.includes('<ol>') || res.questionText.includes('<ul>')
                        || res.questionText.includes('<pre')
                    ) {
                        setRichTextEditor(true)
                    }   

                    let temp = res.options.map((data) => {
                        if (data.option.includes('<h1>') || data.option.includes('<strong>')
                            || data.option.includes('<em>') || data.option.includes('<u>')
                            || data.option.includes('<blockquote>') || data.option.includes('<span')
                            || data.option.includes('<ol>') || data.option.includes('<ul>')
                            || data.option.includes('<pre')
                        ) {
                            return {
                                ...data, richTextEditor: true
                            }
                        }
                        else {
                            return {
                                ...data, richTextEditor: false
                            }
                        }
                    })

                    setOptionData(temp);
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


    //we set here perticular option error message
    useEffect(() => {
        if (optionError.length > 0) {
            let temp = optionList.map((one, index) => {
                return {
                    ...one, props: { ...one.props, errorText: optionError[index] }
                };
            })
            setOptionList(temp);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [optionError])


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
                        //for rich text editor
                        changerichTextEditor={changerichTextEditor}
                        changeRichOptionText={changeRichOptionText}
                        errorText={optionError[index]}
                    />
                )
            });
            setOptionList(temp);
            setShowOptionList(temp);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [optionData, questionType])

    //////////
    //for render list when it add one element or remove element from it
    useEffect(() => {
        if (optionList != null) {
            setShowOptionList(optionList);
        }
    }, [optionList])

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
                                                ref={subjectRef}
                                                onChange={(e) => {
                                                    setSubjectId(e.target.value)
                                                    //for changing error after the selecting some subject
                                                    let newError = { ...errorBackup, subject: null };
                                                    errorBackup = newError;
                                                    setError(newError);
                                                }}

                                            >
                                                {subjectList ?
                                                    subjectList :
                                                    <option disabled>no item Found</option>}
                                            </select>
                                            <div className="form-text text-danger">
                                                {error ? error.subject : <div>&nbsp;&nbsp;<br /></div>}
                                            </div>
                                        </div>

                                        <div className="col-6 mb-3">
                                            <label className="form-label">Select Topic</label>
                                            <select
                                                className="form-select"
                                                defaultValue={defaultValues ? defaultValues.topic._id : 'ttst'}
                                                ref={topicRef}
                                                onChange={(e) => {
                                                    setTopicId(e.target.value)
                                                    //for changing error after the selecting some subject
                                                    let newError = { ...errorBackup, topic: null }
                                                    errorBackup = newError;
                                                    setError(newError)
                                                }}
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
                                            <div className="form-text text-danger">
                                                {error ? error.topic : <div>&nbsp;&nbsp;<br /></div>}
                                            </div>
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

                                            <div className="form-text text-danger">
                                                {error ? error.type : <div>&nbsp;&nbsp;<br /></div>}
                                            </div>
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
                                            <div className="form-text text-danger">
                                                {error ? error.diffLevel : <div>&nbsp;&nbsp;<br /></div>}
                                            </div>
                                        </div>
                                        <div className="col-3 mb-3">
                                            <label className="form-label">Right Mark</label>
                                            <input
                                                type="text"
                                                className="form-control"
                                                value={rightMarks}
                                                ref={rightMarkRef}
                                                onChange={(e) => {
                                                    //for getting only number input from user
                                                    const re = /^[0-9\b]+$/;
                                                    if (e.target.value === '' || re.test(e.target.value)) {
                                                        setRightMarks(e.target.value)
                                                    }
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
                                        <div className="col-3 mb-3">
                                            <label className="form-label">Wrong Mark</label>
                                            <input
                                                type="text"
                                                className="form-control"
                                                value={wrongMarks}
                                                ref={wrongMarkRef}


                                                onChange={(e) => {
                                                    //for getting only number input from user
                                                    const re = /^[0-9\b]+$/;
                                                    if (e.target.value === '' || re.test(e.target.value)) {
                                                        setWrongMarks(e.target.value)
                                                    }
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
                                            <br />
                                            {richTextEditor ?
                                                <div
                                                    ref={questionText}
                                                >
                                                    <RichTextEditor
                                                        data={questionTexts}
                                                        onChange={checkQuestionRichTextEditor}
                                                    />

                                                    <div className="form-text text-danger">
                                                        {error ? error.questionText : <div>&nbsp;&nbsp;<br /></div>}
                                                    </div>

                                                </div>
                                                :
                                                <div className="form-floating">
                                                    <textarea
                                                        className="form-control"
                                                        placeholder="Question"
                                                        style={error ? (error.textError ? {
                                                            outline: "1px red solid",
                                                            height: "200px", border: "1px solid red"
                                                        } : { height: "200px" }) : { height: "200px" }}
                                                        name="questionText"
                                                        defaultValue={questionTexts}
                                                        onChange={(e) => checkError(e.target.value)}
                                                        onBlur={(e) => checkError(e.target.value)}
                                                        ref={questionText}
                                                    >
                                                    </textarea>

                                                    <label className="form-label text-dark">Question</label>
                                                </div>
                                            }
                                            <div
                                                className="form-text point d-inline-block"
                                                onClick={() => {
                                                    if (refernce != null) {
                                                        let text = refernce.makeUnprivilegedEditor(refernce.getEditor());
                                                        checkError(text.getText());
                                                        setQuestionTexts(text.getText());
                                                    }
                                                    setRefernce(null);
                                                    setRichTextEditor(prev => prev = !prev)
                                                }} >
                                                {richTextEditor ? "Disable" : "Enable "}  Rich Text Editor
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
                                <div className="form-text text-danger">
                                    {error ? error.zeroOption : <div>&nbsp;&nbsp;<br /></div>}
                                </div>
                                <div className="form-text text-danger">
                                    {error ? error.sameElement : <div>&nbsp;&nbsp;<br /></div>}
                                </div>
                            </div>

                            <div className="card-header gap-2">
                                <div className="my-2">
                                    <button
                                        type="submit"
                                        className="btn btn-primary mx-2"
                                        onClick={onUpdate}
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
                                    <button
                                        type="button"
                                        className="btn mx-2"
                                        onClick={() => navigate(-1)}
                                    > Cancel </button>
                                </div>
                            </div>
                        </>
                }
            </div>{ /*end of card */}
        </div>
    )

}

export default EditQuestion