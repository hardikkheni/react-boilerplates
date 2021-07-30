import { useDispatch, useSelector } from 'react-redux';
import { TOGGLE_DARK_MODE_REQUESTED } from './store/actions/theme.action';

const App = () => {
	const darkMode = useSelector((state) => state.theme.darkMode);
	const dispatch = useDispatch();
	return (
		<div className="App">
			<p>
				Edit <code>src/App.js</code> and save to reload.
			</p>
			<p>Theme: {darkMode ? 'dark' : 'light'}</p>
			<button onClick={() => dispatch({ type: TOGGLE_DARK_MODE_REQUESTED })}>Toggle Theme</button>
		</div>
	);
};

export default App;
