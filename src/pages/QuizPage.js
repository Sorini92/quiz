import { useEffect, useState, Fragment } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchQuestions } from './questionsSlice';
import Spinner from "../components/spinner/Spinner";

import './quizPage.scss';

const QuizPage = () => {

    /* const [question, setQuestion] = useState();
    const [variants, setVariants] = useState();
    const [index, setIndex] = useState(0);
    const [correctAnswer, setCorrectAnswer] = useState(); */
    const [index, setIndex] = useState('');

    const {questions, questionsLoadingStatus} = useSelector(state => state.questions);

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchQuestions());
        // eslint-disable-next-line
    }, []);

    function makeRandomArray(array) {
        return array.sort(() => Math.random() - 0.5);
    }

    const nextQuestion = () => {
        dispatch(fetchQuestions())
        setIndex('');
    }

    console.log(questions)
    //console.log(question)

    const renderQuestion = questions.map((item, i) => {
        const newArr = makeRandomArray([item.correct_answer, ...item.incorrect_answers]);
        return (
            <Fragment key={i}>
                <div className="quiz__question">{item.question}</div>
                <ul>
                    {newArr.map((item, i) => {
                        return (
                            <li 
                                onClick={() => setIndex(i)} 
                                key={i} 
                                className={index === i ? "quiz__variant active" : "quiz__variant"}
                            >
                                {i + 1}) {item}
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
                        <div className='quiz__score'>Score 2/20</div>
                        <button onClick={nextQuestion} className='quiz__btn'>Next</button>
                    </div>
                </div>
            }
        </>
    )
}

export default QuizPage;