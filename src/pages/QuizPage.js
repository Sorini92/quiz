import { useEffect, useState, Fragment } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchQuestions, addScore, changeQuestionIndex, clear } from './questionsSlice';
import { useNavigate, Link } from "react-router-dom";
import { decode } from "html-entities";
import Spinner from "../components/spinner/Spinner";

import './quizPage.scss';

const QuizPage = () => {

    const [variants, setVariants] = useState([]);
    const [oneQuestion, setOneQuestion] = useState([]);

    const [answer, setAnswer] = useState('');
    const [index, setIndex] = useState('');

    const {questions, questionsLoadingStatus, score, questionIndex} = useSelector(state => state.questions);
    const {setting} = useSelector(state => state.categories);

    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        if (Object.keys(setting).length !== 0){
            dispatch(fetchQuestions(setting));
        } 
        // eslint-disable-next-line
    }, []);
    
    useEffect(() => {
        if (questions?.length) {
            const question = questions[questionIndex];
            setOneQuestion(question.question);

            let answers = [...question.incorrect_answers];

            answers.splice(getRandomInt(question.incorrect_answers.length), 0, question.correct_answer);
            setVariants(answers);
        }
    }, [questions, questionIndex]);

    const getRandomInt = (max) => {
        return Math.floor(Math.random() * Math.floor(max));
    };
    
    const handleClickNext = (e) => {
        const question = questions[questionIndex];

        if (answer.length > 0) {
            if (questionIndex + 1 < questions.length) {
                dispatch(changeQuestionIndex(1));
                setAnswer('');
            } else {
                navigate("/final")
            }
        }

        if (answer.slice(3) === question.correct_answer) {
            dispatch(addScore(1));
        }

        setIndex('');
    }

    const clearStorage = () => {
        dispatch(clear());
    }

    const renderQuestion = [questions[questionIndex]].map((item, i) => {
        return (
            <Fragment key={i}>
                <div className="quiz__question">{decode(oneQuestion)}</div>
                <ul>
                    {variants.map((item, i) => {
                        return (
                            <li 
                                onClick={(e) => {
                                    setIndex(i);
                                    setAnswer(e.target.textContent);
                                }} 
                                key={i} 
                                className={index === i ? "quiz__variant active" : "quiz__variant"}
                            >
                                {i + 1}) {decode(item)}
                            </li>
                        )
                    })}
                </ul>
            </Fragment>
        )
    })

    const renderQuiz = () => {
        return (
            <div className="quiz">
                <div className='quiz__amount'>{questionIndex + 1} question out of the {questions.length}</div>
                {renderQuestion}
                <div className='quiz__wrapper'>
                    <Link to={'/'} onClick={clearStorage} className='quiz__homebtn'>Home</Link>
                    <div className='quiz__score'>Score {score}/{questions.length}</div>
                    <button onClick={handleClickNext} className='quiz__btn'>Next</button>
                </div>
            </div>
        )
    }

    const emptyQuestionsElement = () => {
        return (
            <div className="quiz">
                <div className='quiz__error'>Something went wrong</div>
                <div className='quiz__wrapper'>
                    <Link to={'/'} className='quiz__errorBtn'>Try again</Link>
                </div>
            </div>
        )
    }

    const onEmptyQuestions = questions.length !== 0 ? renderQuiz() : emptyQuestionsElement();
    
    return (
        <>
            {questionsLoadingStatus === "loading" ? 
                <Spinner/> : 
                onEmptyQuestions
            }
        </>
    )
}

export default QuizPage;