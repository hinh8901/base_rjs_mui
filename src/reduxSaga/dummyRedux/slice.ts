import {
  DummyReq,
  DummyResp,
} from "@/services/api/implementation/DummyApi/types"
import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { DummyState } from "./types"

const initialState: DummyState = {
  dummyResponse: {
    id: 1,
    title: "Hello",
    description: "hello",
  },
}

const DummyRedux = createSlice({
  name: "DummyRedux",
  initialState,
  reducers: {
    setDummyResponse: (state, action: PayloadAction<DummyResp>) => {
      console.log(action.payload)
      state.dummyResponse = action.payload
    },
    getDummyRequest: (_state, _action: PayloadAction<DummyReq>) => {},
    reset: () => initialState,
  },
})

export const DummyActions = DummyRedux.actions

export default DummyRedux.reducer
