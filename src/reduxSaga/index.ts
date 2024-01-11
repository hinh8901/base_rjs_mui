import { all, fork } from 'redux-saga/effects'
import { watchTestSaga } from './testRedux'
import { watchDummySaga } from './dummyRedux/saga'

export default function* reduxSaga() {
    yield all([
      fork(watchTestSaga),
      fork(watchDummySaga),
    ])
  }