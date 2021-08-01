import { Card, Elevation } from '@blueprintjs/core';
import Header from './components/Navbar';

const App = () => {
	return (
		<div className="app">
			<Header />
			<div className="wrapper">
				<Card elevation={Elevation.FOUR}>
					<h3>MetaMask</h3>
				</Card>
			</div>
		</div>
	);
};

export default App;
