import {Link} from "react-router-dom";
import { useSelector } from 'react-redux';
import finger from '../../resources/finish.png';

import './final.scss';

const Final = () => {

    const {questions, score} = useSelector(state => state.questions);

    return (
        <div className='final'>
            <div className='final__grac'>You finish the test!</div>
            <img src={finger} className='final__img' alt='finger'/>
            <div className='final__score'>You correctly answered {score} questions out of {questions.length}</div>
            <Link to={'/'} className='final__btn'>Again</Link>
        </div>
    )
}

export default Final;