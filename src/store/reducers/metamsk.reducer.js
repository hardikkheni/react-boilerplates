import Web3 from 'web3';
import {
	METAMASK_BALANCE_CHANGE,
	METAMASK_BALANCE_REQUESTED,
	METAMASK_CONNECTED,
	METAMASK_CONNECTING,
	METAMASK_REQUIRED,
} from '../actions/metamask.action';

const provider = window.ethereum || (window.web3 && window.web3.currentProvider);

const initState = {
	web3: provider && new Web3(provider),
	provider,
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
		case METAMASK_CONNECTED:
			return {
				...state,
				connecting: false,
				connected: !!action.account,
				account: action.account,
				networkId: action.networkId,
				chainId: action.chainId,
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
	if (!provider) {
		dispatch({ type: METAMASK_REQUIRED });
		return;
	}

	// on app load if user already connected then sync with metamask
	window.addEventListener('load', async () => {
		// on load need to wait for 5 miliseconds to get account from metamask
		await new Promise((res) => setTimeout(res, 5));
		const { selectedAddress: account, networkVersion: networkId, chainId } = provider;
		dispatch({ type: METAMASK_CONNECTED, account, chainId, networkId });
		if (account) {
			dispatch({ type: METAMASK_BALANCE_REQUESTED });
		}
	});

	// metamask events
	provider.on('disconnect', (...args) => {
		console.log(...args, 'disconnect');
	});

	provider.on('message', (...args) => {
		console.log(...args, 'message');
	});

	provider.on('chainChanged', (chainId) => {
		const { selectedAddress: account } = provider;
		dispatch({ type: METAMASK_CONNECTED, account, chainId, networkId: Number(chainId).toString() });
	});

	provider.on('accountsChanged', (accounts) => {
		const { networkVersion: networkId, chainId } = provider;
		const account = accounts[0] || null;
		dispatch({ type: METAMASK_CONNECTED, account, chainId, networkId });
		if (account) {
			dispatch({ type: METAMASK_BALANCE_REQUESTED });
		}
	});
}
