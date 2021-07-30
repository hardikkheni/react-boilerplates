import { fork } from 'redux-saga/effects';
import { themeSaga } from './theme.watcher';

export default function* rootSaga() {
	yield fork(themeSaga);
}
