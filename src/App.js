import { Button, Card, Elevation, Label } from '@blueprintjs/core';
import { useDispatch, useSelector } from 'react-redux';
import { METAMASK_CONNECT } from './store/actions/metamask.action';
import Header from './store/components/Navbar';
import {
	mmAccountSelector,
	mmBalanceSelector,
	mmConnectedSelector,
	mmConnectingSelector,
	mmErrorSelector,
	mmProvierSelector,
} from './store/selectors/metamask.selector';

const App = () => {
	const dispatch = useDispatch();
	const error = useSelector(mmErrorSelector);
	const account = useSelector(mmAccountSelector);
	const connected = useSelector(mmConnectedSelector);
	const balance = useSelector(mmBalanceSelector);
	const provider = useSelector(mmProvierSelector);
	const connecting = useSelector(mmConnectingSelector);
	return (
		<div className="app">
			<Header />
			<div className="wrapper">
				<Card elevation={Elevation.FOUR} className="card">
					<h2>MetaMask</h2>
					<Label>{error}</Label>
					<p>
						<b>Account:</b> {account || 'Not Connected!'}
					</p>
					<p>
						<b>Balance:</b> {balance} ETH
					</p>
					<div className="align-center">
						<Button
							disabled={!provider || connecting}
							text={connected ? 'Connected' : 'Connect Wallet'}
							intent={connected ? 'success' : 'warning'}
							icon={connected ? 'link' : 'feed'}
							onClick={() => dispatch({ type: METAMASK_CONNECT })}
						/>
					</div>
				</Card>
			</div>
		</div>
	);
};

export default App;
