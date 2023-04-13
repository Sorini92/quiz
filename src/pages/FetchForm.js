import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCategories } from './categoriesSlice';
import { useNavigate } from "react-router-dom";

import './fetchForm.scss';

const FetchForm = ({addSetting}) => {

    const {categories, categoriesLoadingStatus} = useSelector(state => state.categories);

    const [category, setCategory] = useState('');
    const [difficulty, setDifficulty] = useState('');
    const [type, setType] = useState('');
    const [number, setNumber] = useState('');

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const difficulties = [
        { id: "easy", name: "Easy" },
        { id: "medium", name: "Medium" },
        { id: "hard", name: "Hard" },
      ];
    
      const types = [
        { id: "multiple", name: "Multiple Choise" },
        { id: "boolean", name: "True/False" },
      ];

    

    useEffect(() => {
        dispatch(fetchCategories());
        // eslint-disable-next-line
    }, []);

    const handleChange = (event) => {
        if (event.target.value <= 10 && event.target.value > 0) {
            setNumber(event.target.value);
        }
    };

    const handleSubmit = (event) => {
        event.preventDefault();

        const setting = {
            category,
            difficulty,
            type,
            number
        }
        addSetting(setting);

        navigate('/quiz');
    }

    const renderCategories = categories.map((item) => {
        return (
            <option key={item.id} value={item.id}>{item.name}</option>
        )
    })
    const renderDifficulties = difficulties.map((item) => <option key={item.id} value={item.id}>{item.name}</option>)
    const renderTypes = types.map((item) => <option key={item.id} value={item.id}>{item.name}</option>)

    return (
        <form className='form' onSubmit={handleSubmit}>
            <h1 className='form__title'>Quiz</h1>
            <label htmlFor="category" className='form__label'>Choose category</label>
            <select onChange={(e) => setCategory(e.target.value)} required value={category} className='form__select' id='category' name='category'>
                <option value=""></option>
                {categoriesLoadingStatus !== "loading" ? renderCategories : <option value="">Loading...</option>}
            </select>

            <label htmlFor="difficulty" className='form__label'>Choose difficulty</label>
            <select onChange={(e) => setDifficulty(e.target.value)} required value={difficulty} className='form__select' id='difficulty' name='difficulty'>
                <option value=""></option>
                {renderDifficulties}
            </select>

            <label htmlFor="type" className='form__label'>Choose type</label>
            <select onChange={(e) => setType(e.target.value)} required value={type} className='form__select' id='type' name='type'>
                <option value=""></option>
                {renderTypes}
            </select>

            <label htmlFor="quantity" className='form__label'>How much questions do you want? (10 max)</label>
            <input 
                required 
                value={number} 
                onChange={handleChange}
                type='number' 
                id='quantity' 
                name="quantity" 
                className='form__input'/>

            
            <button type='submit' className='form__submit'>Start</button>
        </form>
    )
}

export default FetchForm;