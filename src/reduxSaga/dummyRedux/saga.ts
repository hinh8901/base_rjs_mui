import { takeLatest, all, call, put } from 'redux-saga/effects';
import { PayloadAction } from '@reduxjs/toolkit';
import {
  DummyReq,
  DummyResp,
} from '@/services/api/implementation/DummyApi/types';
import { DummyApi } from '@/services/api/implementation/DummyApi/DummyApi';
import { DummyActions } from './slice';

export function* watchDummySaga() {
  yield all([takeLatest(DummyActions.getDummyRequest.type, handleGetDummy)]);
}

function* handleGetDummy(action: PayloadAction<DummyReq>) {
  const getDummyReq = () =>
    DummyApi.getDummyData(action.payload)
      .run();
  const product: DummyResp | undefined = yield call(getDummyReq);
  console.log({product})
  if (product) {
    yield put(DummyActions.setDummyResponse(product));
  }
}
