import { BrowserRouter as Router, Route, Routes} from "react-router-dom";
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
					<Route path="/" element={<FetchForm addSetting={getSetting}/>} />
					<Route path="/quiz" element={<QuizPage/>} />
					<Route path="/final" element={<Final/>} />
					<Route path='*' element={<Page404/>}/>
				</Routes>
			</Router>
		</div>
	);
}

export default App;
