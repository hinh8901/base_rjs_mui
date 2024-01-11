import { useState, useEffect } from "react"
import { useAppDispatch, useAppSelector } from "@/hooks/useAppSelector"
import { DummyActions } from "@/reduxSaga/dummyRedux/slice"
import { RootState } from "@/store"

const useDummy = () => {

  const { title, description } = useAppSelector(
    (state: RootState) => state.dummy.dummyResponse
  )

  const dispatch = useAppDispatch()

  const handleClickTestAPI = () => {
    dispatch(DummyActions.getDummyRequest({ getData: "data" }))
  }

  return {
    title,
    handleClickTestAPI,
    description,
  }
}

export default useDummy
