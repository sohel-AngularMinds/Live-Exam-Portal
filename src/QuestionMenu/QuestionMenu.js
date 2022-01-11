import React, { useState, useEffect, useRef } from 'react'
import { subjectAPI } from '../Service/Service'


const QuestionMenu = (props) => {

    const { getTopicForQuestionLoad, getKeywordForSearchQuestion } = props

    let topicRef = useRef();
    /////////////////////////////////////////////////////////////////////////
    // for topic useState
    const [topics, setTopics] = useState(null);
    //for search questions
    const [searchQuestion, setSearchQuestion] = useState('');
    //for topic selected value
    const [itemPerPage, setItemPerPage] = useState(20);
    /////////////////////////////////////////////////////////////////////////

    const getSubjectTopicOption = () => {
        if (topics) {
            let localStore = JSON.parse(localStorage.getItem('_topicId'));
            if (localStore) {
                let temp = topics.result.map(oneResult =>
                    <option
                        key={oneResult._id}
                        value={oneResult._id}
                    >
                        {oneResult.name}
                    </option>
                )
                // setTopicsOption(temp)
                localStorage.setItem("_itemperpage", itemPerPage);
                let topicId = localStore ? localStore.topic : temp[0].props.id
                getTopicForQuestionLoad(topicId, itemPerPage)    
            }
        }
    }

    const getSearchText = (e) => {
        setSearchQuestion(e.target.value);
        getKeywordForSearchQuestion(e.target.value)
    }

    const getOption = (e) => {
        localStorage.setItem('_topicId', JSON.stringify({ topic: e.target.value }))
        getTopicForQuestionLoad(e.target.value, itemPerPage)
    }


    /////////////////////////////////////////////////////////////////////////
    //for getting topics
    useEffect(() => {
        let url = '/topics?page=1&limit=9007199254740991&term='
        let localStore = JSON.parse(localStorage.getItem('_topicId'));
        try {
            async function get() {
                //function statement
                const resp = await subjectAPI(url);
                setTopics(resp);
                localStorage.setItem('_topicId', localStore ? JSON.stringify(localStore) : JSON.stringify({ topic: resp.result[0]._id }))
            }
            get();
            localStorage.setItem("_itemperpage", itemPerPage);
        }
        catch (err) {
            console.log(err);
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    useEffect(() => {
        if (topics) {
            getSubjectTopicOption();
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [topics])

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
                                        localStorage.setItem("_itemperpage", Number(e.target.value));
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
                                    placeholder="choose Option"
                                    ref={topicRef}
                                    value={localStorage.getItem('_topicId')?JSON.parse(localStorage.getItem('_topicId')).topic:''}
                                >
                                    {
                                        topics?topics.result.map(oneResult =>
                                            <option
                                                key={oneResult._id}
                                                value={oneResult._id}
                                            >
                                                {oneResult.name}
                                            </option>
                                        ):''
                                    }
                                </select>
                            </div>
                        </form>
                    </li>
                </ul>
            </div>
        </>
    )
}

export default QuestionMenu
