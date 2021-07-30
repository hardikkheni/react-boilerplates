import { put } from 'redux-saga/effects';
import { TOGGLE_DARK_MODE } from '../actions/theme.action';

export function* fetchThemeInfo() {
	yield put({ type: TOGGLE_DARK_MODE });
}
