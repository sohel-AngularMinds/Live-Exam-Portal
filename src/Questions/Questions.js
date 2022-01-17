/* eslint-disable array-callback-return */
import React, { useState, useEffect } from 'react'
import { questionsAPI, deleteQuestion } from '../Service/Service'
import QuestionMenu from '../QuestionMenu/QuestionMenu'
import PerQuestion from '../PerQuestion/PerQuestion'
import { useNavigate } from 'react-router-dom'
import noItemFound from './img/no_item_found.jpg'

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { WavePlaceholder } from '../Placeholder/Loading'

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
        setLoading(true);

        async function deleteQue() {
            try {
                //arrow function
                const get = async () => {
                    const response = await getQuestions(topicID);
                    setQuestions(response.result);
                    setTotalCount(response.totalCount)
                    setCurrentPage(1)
                    setLoading(false);

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

                let res = await deleteQuestion(`questions/${id}`);
                if (res.status === 200 || res.status === 204) {
                    get();
                }
                else {
                    setLoading(false);
                    toast.error('Question Not Deleted', {
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
            catch (err) { }
        }

        deleteQue();
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

    let currentItem = questions.slice(indexOfFirstItem, indexOfLastItem);

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
    //---/pagination End
    ///////////////////////////////////////////////////////////

    ///////////////////////////////////////////////////////////
    //service

    const getKeywordForSearchQuestion = (keyword) => {
        setFindQuestion(keyword);
        setLoading(true);
    }

    const getTopicForQuestionLoad = (topic, IPP) => {
        setTopicID(topic);
        setLimit(Number(IPP));
        setItemPerPage(Number(IPP))
        setCurrentPage(1);
        setLoading(true);
    }
    ///////////////////////////////////////////////////////////


    //use effect
    useEffect(() => {
        try {
            if (topicID !== null && findQuestion !== '') {
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
                getQText()
            }
            else {
                const get = async () => {
                    const response = await getQuestions(topicID);
                    setQuestions(response.result);
                    setTotalCount(response.totalCount)
                    setLoading(false);
                    setCurrentPage(1)
                }
                if (topicID !== null) {
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
        try {
            if (topicID !== null) {
                const get = async () => {
                    const response = await getQuestions(topicID);
                    setMaxPageLimit(Math.ceil(response.result.length / limit));
                    setLoading(false);
                }
                get();
                setItemPerPage(limit)
                setCurrentPage(1)
            }
        }
        catch (e) {

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
                <div className="card-header bg-white">
                    <QuestionMenu getTopicForQuestionLoad={getTopicForQuestionLoad} getKeywordForSearchQuestion={getKeywordForSearchQuestion} />
                </div>
                <div className="card-body">
                    {loading ?
                        <WavePlaceholder />
                        :
                        <div >
                            {/* {questions} */
                                currentItem.length > 0 ? renderQuestion(currentItem)
                                    :
                                    <div className="text-center">
                                        <img src={noItemFound} alt="no_item_found" />
                                        <h4 className="text-black-50 mb-5">No Item Found</h4>
                                    </div>
                            }
                            {/* <div dangerouslySetInnerHTML={{ __html: }}></div> */}
                            <div className="d-flex justify-content-between align-middle card-footer p-2">
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

                        </div>
                    }
                    <ToastContainer />
                </div>
            </div>
        </div >
    )
}
export default Questions