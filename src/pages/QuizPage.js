import { useEffect, useState, Fragment } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchQuestions, addScore } from './questionsSlice';
import { decode } from "html-entities";
import Spinner from "../components/spinner/Spinner";

import './quizPage.scss';

const QuizPage = () => {

    const [variants, setVariants] = useState([]);
    const [oneQuestion, setOneQuestion] = useState([]);
    const [questionIndex, setQuestionIndex] = useState(0);
    const [answer, setAnswer] = useState('');
    const [index, setIndex] = useState('');

    const {questions, questionsLoadingStatus, score} = useSelector(state => state.questions);

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchQuestions());
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

        if (questionIndex + 1 < questions.length) {
            setQuestionIndex(questionIndex + 1);
        } /* else {
            history.push("/score");
        } */

        if (answer.slice(3) === question.correct_answer) {
            dispatch(addScore(1));
        }

        setIndex('');
    }

    console.log(questions[questionIndex])

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
    
    return (
        <>
            {questionsLoadingStatus === "loading" ? 
                <Spinner/> : 
                <div className="quiz">
                    {renderQuestion}
                    <div className='quiz__wrapper'>
                        <div className='quiz__score'>Score {score}/{questions.length}</div>
                        <button onClick={handleClickNext} className='quiz__btn'>Next</button>
                    </div>
                </div>
            }
        </>
    )
}

export default QuizPage;