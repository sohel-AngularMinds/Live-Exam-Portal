/* eslint-disable array-callback-return */
import React, { useState, useEffect } from 'react'
import { questionsAPI } from '../Service/Service'
import QuestionMenu from '../QuestionMenu/QuestionMenu'
import PerQuestion from '../PerQuestion/PerQuestion'
import { useNavigate } from 'react-router-dom'




const Questions = () => {
    let navigate = useNavigate();
    ///////////////////////////////////////////////////////////

    //use State
    const [topicID, setTopicID] = useState(null);
    const [questions, setQuestions] = useState([]);
    // for number of questions of perticular topic
    const [totalCount, setTotalCount] = useState(() => 0)
    //for limit ite, per page
    const [limit, setLimit] = useState(() => 20);
    //-- for loading 
    const [loading, setLoading] = useState(true)

    ///////////////////////////////////////////////////////////


    ///////////////////////////////////////////////////////////
    //-- pagination start

    const [currentPage, setCurrentPage] = useState(1);
    const [maxPageLimit, setMaxPageLimit] = useState(() => (Math.ceil((questions.length > 0 ? questions.length : 1) / limit)));
    const [minPageLimit, setMinPageLimit] = useState(0);


    const pages = [];
    for (let i = 1; i <= (Math.ceil((questions.length > 0 ? questions.length : 1) / limit)); i++)
        pages.push(i);

    const indexOfLastItem = currentPage * limit;
    const indexOfFirstItem = indexOfLastItem - limit;

    const currentItem = questions ? questions.slice(indexOfFirstItem, indexOfLastItem) : [];


    const renderPageNumber = pages.map((number) => {
        if (number < maxPageLimit + 1 && number > minPageLimit) {
            return (
                <li
                    key={number}
                    id={number}
                    // eslint-disable-next-line eqeqeq
                    className={`page-item ${currentPage == number ? 'active' : ''}`}
                    onClick={
                        (e) => handlePagination(e)
                    }
                >
                    <span className="page-link" key={number}
                        id={number}>
                        {number}
                    </span>
                </li>
            )
        }
    })

    const handlePagination = (e) => {
        setCurrentPage(Number(e.target.id))
    }



    const handlePrev = () => {
        setCurrentPage(currentPage - 1);

        if ((currentPage - 1) % limit === 0) {
            setMaxPageLimit(maxPageLimit - limit);
            setMinPageLimit(minPageLimit - limit);
        }
    }

    const handleNext = () => {
        setCurrentPage(currentPage + 1);
        if (currentPage + 1 > maxPageLimit) {
            setMaxPageLimit(maxPageLimit + limit);
            setMinPageLimit(minPageLimit + limit);
        }
    }

    //---/pagination End
    ///////////////////////////////////////////////////////////

    ///////////////////////////////////////////////////////////
    //service
    const getTopicForQuestionLoad = (topic, itemPerPage) => {
        setLimit(Number(itemPerPage));
        setTopicID(topic);
        setLoading(true);
    }

    const renderQuestion = (currentQuestion) => {
        return currentQuestion.map((data, index) => <PerQuestion key={index} data={data} />)
    }

    ///////////////////////////////////////////////////////////
    //use effect
    useEffect(() => {
        if (topicID) {
            // ${limit}
            let url = `questions?page=1&limit=20&term=&topic=${topicID}`
            async function getQuestions() {
                const response = await questionsAPI(url);
                // let temp = response.result.map((one, index) => <PerQuestion key={index} data={one} />)
                setTotalCount(response.totalCount)
                setQuestions(response.result);
                setLoading(false);
            }
            getQuestions();
        }
    }, [topicID, limit])

    useEffect(() => {
        setMaxPageLimit(Math.ceil((questions.length > 0 ? questions.length : 1) / limit))
        
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [limit])


    ///////////////////////////////////////////////////////////
    return (
        <div className="container">

            <div className="mt-5 mb-3 d-flex justify-content-between">
                <div><h3><strong>Questions</strong></h3></div>
                <div>
                    <button
                        type="button"
                        className="btn btn-primary"
                        onClick={() => {
                            navigate('../questions/add');
                        }}
                    >
                        + Add Question
                    </button>
                </div>
            </div>

            <div className="card">
                <div className="card-body">
                    <QuestionMenu getTopicForQuestionLoad={getTopicForQuestionLoad} />

                    {loading ?
                        <div className="text-center text-primary" >
                            <div className="spinner-border" role="status">
                                <span className="visually-hidden">Loading...</span>
                            </div>
                        </div >
                        :
                        <>
                            {/* {questions} */
                                renderQuestion(currentItem)
                            }
                            <div className="mt-5 d-flex justify-content-between align-middle">
                                <div className="align-middle mt-2">
                                    <h6 className="text-muted point">Showing {indexOfFirstItem+1} to {totalCount} of {totalCount} entries</h6>
                                </div>
                                <div>

                                    <nav aria-label="Page navigation example">
                                        <ul className="pagination justify-content-end">
                                            <li
                                                className={`page-item ${currentPage === pages[0] ? 'disabled' : ''}`}                      >
                                                <button className="page-link"
                                                    disabled={currentPage === pages[0] ? true : false}
                                                    onClick={handlePrev}
                                                >
                                                    Previous
                                                </button>
                                            </li >
                                            {
                                                renderPageNumber
                                            }
                                            <li className={`page-item ${currentPage === pages.length ? 'disabled' : ''}`}
                                            >
                                                <button className="page-link"
                                                    disabled={Number(currentPage - 1) === Number(pages[pages.length]) ? true : false}
                                                    onClick={handleNext}
                                                >
                                                    Next
                                                </button>
                                            </li>
                                        </ul>
                                    </nav >
                                </div>
                            </div>
                        </>

                    }

                </div>
            </div>
        </div >
    )
}
export default Questions

