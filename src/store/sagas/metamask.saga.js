import { call, put, select } from 'redux-saga/effects';
import {
	METAMASK_BALANCE_CHANGE,
	METAMASK_BALANCE_REQUESTED,
	METAMASK_CONNECTING,
	METAMASK_REQUIRED,
} from '../actions/metamask.action';
import { mmAccountSelector, mmWeb3Seletor } from '../selectors/metamask.selector';

export function* connectMetaMask() {
	if (!window.ethereum) {
		yield put({ type: METAMASK_REQUIRED });
	} else {
		try {
			yield put({ type: METAMASK_CONNECTING });
			const web3 = yield select(mmWeb3Seletor);
			yield call(web3.eth.requestAccounts);
			yield put({ type: METAMASK_BALANCE_REQUESTED });
		} catch ({ message }) {
			yield put({ type: METAMASK_REQUIRED, message });
		}
	}
}

export function* getMetaMaskBalance() {
	try {
		const web3 = yield select(mmWeb3Seletor);
		const account = yield select(mmAccountSelector);
		const balance = yield call(web3.eth.getBalance, account);
		yield put({ type: METAMASK_BALANCE_CHANGE, balance: web3.utils.fromWei(balance) });
	} catch (err) {
		// console.log(err, 'getMetaMaskBalance');
	}
}
