/* eslint-disable array-callback-return */
import React, { useState, useEffect } from 'react'
import { questionsAPI, deleteQuestion } from '../Service/Service'
import QuestionMenu from '../QuestionMenu/QuestionMenu'
import PerQuestion from '../PerQuestion/PerQuestion'
import { useNavigate } from 'react-router-dom'


import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


async function getQuestions(topicID) {
    let url = `questions?page=1&limit=&term=&topic=${topicID}`
    return await questionsAPI(url);
}




//main function
const Questions = () => {

    let navigate = useNavigate();
    ///////////////////////////////////////////////////////////

    //use State
    const [topicID, setTopicID] = useState(null);
    const [questions, setQuestions] = useState([]);
    // for number of questions of perticular topic
    const [totalCount, setTotalCount] = useState(() => 0)

    //for limit ite, per page
    const [limit, setLimit] = useState(20);
    //-- for loading 
    const [loading, setLoading] = useState(true)

    //--- for searching questions
    const [findQuestion, setFindQuestion] = useState(() => '');
    ///////////////////////////////////////////////////////////
    //----------- Edit Fun
    const editFun = (id) => {
        navigate(`/questions/edit/${id}`)
    }



    //----------- Delete Fun
    const deleteFun = (id) => {
        deleteQuestion(`questions/${id}`);
        setLoading(true);

        const get = async () => {
            const response = await getQuestions(topicID);
            setQuestions(response.result);
            setTotalCount(response.totalCount)
            setLoading(false);
            setCurrentPage(1)

            toast.success('Question Deleted Successfully.', {
                position: "bottom-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
        }
        get()

    }

    const renderQuestion = (currentQuestion) => {
        return currentQuestion.map((data, index) => <PerQuestion
            key={index}
            data={data}
            deleteFun={deleteFun}
            editFun={editFun}
        />)
    }
    ///////////////////////////////////////////////////////////
    //-- pagination start
    const [currentPage, setCurrentPage] = useState(1);
    const [itemPerPage, setItemPerPage] = useState(20)

    // eslint-disable-next-line no-unused-vars
    const [pageNumberLimit, setPageNumberLimit] = useState(questions.length % itemPerPage);

    const [maxPageLimit, setMaxPageLimit] = useState(10);
    const [minPageLimit, setMinPageLimit] = useState(0);

    const pages = [];

    for (let i = 1; i <= Math.ceil(questions.length / itemPerPage); i++) {
        pages.push(i);
    }

    const indexOfLastItem = currentPage * itemPerPage;
    const indexOfFirstItem = indexOfLastItem - itemPerPage;

    const currentItem = questions.slice(indexOfFirstItem, indexOfLastItem);

    const handlePagination = (e) => {
        setCurrentPage(Number(e.target.id))
    }

    const renderPageNumber = pages.map((number) => {
        if (number > minPageLimit && number < maxPageLimit + 1) {
            return (
                <li
                    key={number}
                    id={number}
                    className={`page-item ${currentPage === Number(number) ? 'active' : null}`}
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
        else {
            return null;
        }
    })

    const handlePrev = () => {
        setCurrentPage(currentPage - 1);

        if ((currentPage - 1) % pageNumberLimit === 0) {
            setMaxPageLimit(maxPageLimit - pageNumberLimit);
            setMinPageLimit(minPageLimit - pageNumberLimit);
        }
    }

    const handleNext = () => {
        setCurrentPage(currentPage + 1);
        if (currentPage + 1 > maxPageLimit) {
            setMaxPageLimit(maxPageLimit + pageNumberLimit);
            setMinPageLimit(minPageLimit + pageNumberLimit);
        }
    }
    //---/pagination EndK9Z-FBC
    ///////////////////////////////////////////////////////////

    ///////////////////////////////////////////////////////////
    //service

    const getKeywordForSearchQuestion = (keyword) => {
        let temp = keyword
        setFindQuestion(temp);
        setLoading(true);
    }

    const getTopicForQuestionLoad = (topic, IPP) => {
        setLimit(Number(IPP));
        setItemPerPage(Number(IPP))
        setCurrentPage(1);
        setTopicID(topic);
        setLoading(true);
    }
    ///////////////////////////////////////////////////////////


    //use effect
    useEffect(() => {
        try {
            const get = async () => {
                const response = await getQuestions(topicID);
                setQuestions(response.result);
                setTotalCount(response.totalCount)
                setLoading(false);
                setCurrentPage(1)
            }

            if (findQuestion !== '') {
                const getQText = async () => {
                    const response = await getQuestions(topicID);
                    let temp = response.result.filter(one => {
                        if ((one.questionText).toLowerCase().includes(findQuestion.toLowerCase()))
                            return one;
                    })
                    setQuestions(temp);
                    setTotalCount(temp.length);
                    setLoading(false);
                }
                if (topicID) {
                    getQText()
                }
            }
            else {
                if (topicID) {
                    get();
                }
            }
        }
        catch (e) {
            console.log(e);
        }

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [topicID, findQuestion])


    useEffect(() => {
        if (topicID) {
            try {
                const get = async () => {
                    const response = await getQuestions(topicID);
                    setMaxPageLimit(Math.ceil(response.result.length / limit));
                    setLoading(false);
                }
                get();
                setItemPerPage(limit)
                setCurrentPage(1)
            }
            catch (e) {

            }
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [limit])

    // useEffect(() => {
    //     try {
    //         if (findQuestion !== '') {
    //             const getQText = async () => {
    //                 const response = await getQuestions(topicID);
    //                 let temp = response.result.filter(one => {
    //                     if ((one.questionText).toLowerCase().includes(findQuestion.toLowerCase()))
    //                         return one;
    //                 })
    //                 setQuestions(temp);
    //                 setTotalCount(temp.length);
    //                 setLoading(false);
    //             }
    //             getQText()
    //         }
    //         else {
    //             if (topicID) {
    //                 get();
    //             }
    //         }
    //     }
    //     catch (e) {
    //         console.log(e);
    //     }
    //     // eslint-disable-next-line react-hooks/exhaustive-deps
    // }, [findQuestion])


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
                    <QuestionMenu getTopicForQuestionLoad={getTopicForQuestionLoad} getKeywordForSearchQuestion={getKeywordForSearchQuestion} />

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
                                    <h6 className="text-muted point">Showing {indexOfFirstItem + 1} to {limit < totalCount ? limit : totalCount} of {totalCount} entries</h6>
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
                                                    disabled={Number(currentPage) === Number(pages[pages.length]) ? true : false}
                                                    onClick={handleNext}
                                                >
                                                    Next
                                                </button>
                                            </li>
                                        </ul>
                                    </nav >
                                </div>
                            </div>
                            <ToastContainer />
                        </>
                    }

                </div>
            </div>
        </div >
    )
}
export default Questions