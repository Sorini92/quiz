import {Link} from "react-router-dom";
import { useSelector, useDispatch } from 'react-redux';
import finger from '../../resources/finish.png';

import { clear } from '../../pages/questionsSlice';

import './final.scss';

const Final = () => {

    const {questions, score} = useSelector(state => state.questions);

    const dispatch = useDispatch();

    const clearStorage = () => {
        dispatch(clear());
    }

    return (
        <div className='final'>
            <div className='final__grac'>You finish the test!</div>
            <img src={finger} className='final__img' alt='finger'/>
            <div className='final__score'>You correctly answered {score} questions out of {questions.length}</div>
            <Link to={'/'} onClick={clearStorage} className='final__btn'>Again</Link>
        </div>
    )
}

export default Final;