import { takeLatest } from 'redux-saga/effects';
import { TOGGLE_DARK_MODE_REQUESTED } from '../actions/theme.action';
import { fetchThemeInfo } from '../sagas/theme.saga';

export function* themeSaga() {
	yield takeLatest(TOGGLE_DARK_MODE_REQUESTED, fetchThemeInfo);
}
