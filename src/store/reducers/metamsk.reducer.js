import Web3 from 'web3';
import {
	METAMASK_BALANCE_CHANGE,
	METAMASK_BALANCE_REQUESTED,
	METAMASK_CONNECTED,
	METAMASK_CONNECTING,
	METAMASK_INIT,
	METAMASK_REQUIRED,
} from '../actions/metamask.action';

const initState = {
	web3: null,
	provider: null,
	account: null,
	networkId: null,
	chainId: null,
	error: null,
	connected: false,
	connecting: false,
	balance: 0,
};

const reducer = (state = initState, action) => {
	switch (action.type) {
		case METAMASK_REQUIRED:
			return {
				...state,
				error: action.message || 'MetaMask installation is required!',
				connecting: false,
			};
		case METAMASK_INIT:
			return {
				...state,
				provider: action.provider,
				web3: new Web3(action.provider),
			};
		case METAMASK_CONNECTED:
			return {
				...state,
				connecting: false,
				connected: !!action.account,
				account: action.account,
				networkId: action.networkId,
				chainId: action.chainId,
				error: null,
				balance: 0,
			};
		case METAMASK_CONNECTING:
			return { ...state, connecting: true };
		case METAMASK_BALANCE_CHANGE:
			return { ...state, balance: action.balance };
		default:
			return state;
	}
};

export default reducer;

export function intiMetaMask(dispatch) {
	// on app load if user already connected then sync with metamask
	window.addEventListener('load', async () => {
		const provider =
			window.ethereum ||
			// metamask lagacy version
			(window.web3 && window.web3.currentProvider);

		if (!provider) {
			dispatch({ type: METAMASK_REQUIRED });
			return;
		}
		dispatch({ type: METAMASK_INIT, provider });

		// metamask events
		provider.on('disconnect', (...args) => {
			console.log(...args, 'disconnect');
		});

		provider.on('message', (...args) => {
			console.log(...args, 'message');
		});

		provider.on('chainChanged', (chainId) => {
			const { selectedAddress: account } = provider;
			dispatch({
				type: METAMASK_CONNECTED,
				account,
				chainId,
				networkId: Number(chainId).toString(),
			});
		});

		provider.on('accountsChanged', (accounts) => {
			const { networkVersion: networkId, chainId } = provider;
			const account = accounts[0] || null;
			dispatch({ type: METAMASK_CONNECTED, account, chainId, networkId });
			if (account) {
				dispatch({ type: METAMASK_BALANCE_REQUESTED });
			}
		});

		// get account and balance on app load
		const { selectedAddress: account, networkVersion: networkId, chainId } = provider;
		dispatch({ type: METAMASK_CONNECTED, account, chainId, networkId });
		if (account) {
			dispatch({ type: METAMASK_BALANCE_REQUESTED });
		}
	});
}
