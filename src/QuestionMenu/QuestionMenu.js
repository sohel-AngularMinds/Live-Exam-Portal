import React, { useState, useEffect, useRef } from 'react'
import { subjectAPI } from '../Service/Service'


const QuestionMenu = (props) => {

    const { getTopicForQuestionLoad, getKeywordForSearchQuestion } = props

    let topicRef = useRef();
    /////////////////////////////////////////////////////////////////////////
    // for topic useState
    const [topics, setTopics] = useState(null);
    const [topicsOption, setTopicsOption] = useState(null);


    //for search questions
    const [searchQuestion, setSearchQuestion] = useState('');


    //for topic selected value
    const [value, setValue] = useState();
    const [itemPerPage, setItemPerPage] = useState(20);
    /////////////////////////////////////////////////////////////////////////

    const getSubjectTopicOption = () => {
        if (topics) {
            let temp = topics.result.map(oneResult =>
                <option
                    key={oneResult._id}
                    id={oneResult._id}
                    value={oneResult._id}>
                    {oneResult.name}
                </option>)
            setValue(temp[0].props.name)
            setTopicsOption(temp)
            getTopicForQuestionLoad(temp[0].props.id, itemPerPage)
        }
    }

    const getSearchText = (e) => {    
        setSearchQuestion(e.target.value);
        getKeywordForSearchQuestion(e.target.value)
    }

    const getOption = (e) => {
        getTopicForQuestionLoad(e.target.value, itemPerPage)
        setValue(e.target.value);
    }


    /////////////////////////////////////////////////////////////////////////
    //for getting topics
    useEffect(() => {
        let url = '/topics?page=1&limit=9007199254740991&term='
        try {
            async function get() {
                //function statement
                const resp = await subjectAPI(url);
                setTopics(resp);
            }
            get();
        }
        catch (err) {
            console.log(err);
        }
    }, [])

    useEffect(() => {
        if (topics) {
            getSubjectTopicOption();
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [topics])

    //render 6 times per refresh thats why not used
    // useEffect(() => {
    //     getKeywordForSearchQuestion(searchQuestion);
    // })
    /////////////////////////////////////////////////////////////////////////////
    return (
        <>
            <div className="container">
                <ul className="nav justify-content-between">
                    <li className="nav-item text-center">
                        <span className="nav-link text-secondary">
                            <span>
                                <input type="checkbox" className="form-check-input" />
                            </span>
                            <span className="fs-6 mx-2">Show</span>
                            <span>
                                <select
                                    className="form-select-sm"
                                    onChange={(e) => {
                                        getTopicForQuestionLoad(topicRef.current.value, e.target.value)
                                        setItemPerPage(Number(e.target.value))
                                    }}
                                    defaultValue={itemPerPage}>
                                    <option value="05">05</option>
                                    <option value="10">10</option>
                                    <option value="20">20</option>
                                    <option value="30">30</option>
                                    <option value="100">50</option>
                                </select>
                            </span>
                            <span className="fs-6 mx-2">record per page</span>
                        </span>
                    </li>
                    <li className="nav-item text-center">
                        <form className="d-inline-flex nav-link text-secondary">
                            <div className="me-2">
                                <input
                                    className="form-control me-2"
                                    type="search"
                                    placeholder="Search Question"
                                    onChange={getSearchText}
                                    value={searchQuestion}
                                />
                            </div>

                            <div>
                                <select className="form-select"
                                    onChange={getOption}
                                    value={value && value}
                                    placeholder="choose Option"
                                    ref={topicRef}
                                >
                                    {topicsOption}
                                </select>
                            </div>
                        </form>
                    </li>
                </ul>
            </div>
            {/* <hr></hr> */}
        </>
    )
}

export default QuestionMenu
