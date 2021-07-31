import { takeLatest } from 'redux-saga/effects';
import { METAMASK_BALANCE_REQUESTED, METAMASK_CONNECT } from '../actions/metamask.action';
import { connectMetaMask, getMetaMaskBalance } from '../sagas/metamask.saga';

export function* metaMaskSaga() {
	yield takeLatest(METAMASK_CONNECT, connectMetaMask);
	yield takeLatest(METAMASK_BALANCE_REQUESTED, getMetaMaskBalance);
}
