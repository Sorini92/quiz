import { BrowserRouter as Router, Route, Routes, Navigate} from "react-router-dom";
import { useDispatch } from 'react-redux';
import {addSetting} from '../../pages/categoriesSlice';
import FetchForm from '../../pages/FetchForm';
import QuizPage from '../../pages/QuizPage';
import Final from '../final/Final';
import Page404 from "../404/404";

import './app.scss';

function App() {

	const dispatch = useDispatch();

	const getSetting = (setting) => {
		dispatch(addSetting(setting))
	}

	return (
		<div className="app">
			<Router>
				<Routes>
					<Route path="/quiz" element={<Navigate replace to='/' />} />
					<Route path="/" element={<FetchForm addSetting={getSetting}/>} />
					<Route path="/questions" element={<QuizPage/>} />
					<Route path="/final" element={<Final/>} />
					<Route path='*' element={<Page404/>}/>
				</Routes>
			</Router>
		</div>
	);
}

export default App;
