import { fork } from 'redux-saga/effects';
import { metaMaskSaga } from './metamask.watcher';
import { themeSaga } from './theme.watcher';

export default function* rootSaga() {
	yield fork(themeSaga);
	yield fork(metaMaskSaga);
}
